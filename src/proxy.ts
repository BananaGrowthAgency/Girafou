import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { DEFAULT_LOCALE, LOCALE_COOKIE, hasLocale, type Locale } from "@/lib/i18n/config";
import { toInternal, toPublic } from "@/lib/i18n/routes";

// Deux responsabilités, dans cet ordre :
//   1. protéger /admin derrière une session valide ;
//   2. router les langues — le français est servi à la racine (`/activites`) et
//      l'anglais est préfixé avec des slugs traduits (`/en/activities`).
//
// L'arborescence de `src/app/[lang]/(site)/` utilise les segments FRANÇAIS :
// ce sont les chemins « internes ». Ici on traduit le chemin public entrant
// vers l'interne, et on redirige l'interne vers le public pour qu'une page
// n'ait jamais deux URL indexables. Voir `lib/i18n/routes.ts`.
// (Next.js 16 a renommé la convention « middleware » en « proxy ».)

/** Locale préférée du navigateur, repli sur le français. */
function localeFromHeader(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  // « fr-FR,fr;q=0.9,en;q=0.8 » → langues triées par q décroissant.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((l) => l.tag && !Number.isNaN(l.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (hasLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

function isAdmin(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/** Gate historique du panneau de gestion de la carte. */
async function guardAdmin(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

/** Sert le chemin interne `/<locale><internal>` sans changer l'URL affichée. */
function rewriteTo(request: NextRequest, locale: Locale, internal: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${internal === "/" ? "" : internal}`;
  return NextResponse.rewrite(url);
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // /admin n'est jamais traduit : il vit hors de l'arborescence [lang].
  if (isAdmin(pathname)) return guardAdmin(request);

  const segment = pathname.split("/")[1] ?? "";

  // ── Anglais : /en/... ──
  if (hasLocale(segment) && segment !== DEFAULT_LOCALE) {
    let internal = toInternal(segment, pathname);

    if (!internal) {
      // Le slug anglais n'est pas reconnu. C'est peut-être le chemin INTERNE
      // (français) tapé sous /en — or ce chemin existe bel et bien dans
      // l'arborescence, donc sans redirection la page serait servie à deux URL.
      const bare = pathname.slice(segment.length + 1) || "/";
      internal = toInternal(DEFAULT_LOCALE, bare);
      if (!internal) return NextResponse.next(); // vraie 404, gérée par l'app
    }

    // La page n'existe pas en anglais (pages légales) → version française.
    const canonical = toPublic(segment, internal);
    if (!canonical) return redirectTo(request, toPublic(DEFAULT_LOCALE, internal) ?? "/");

    // URL interne ou variante non canonique → on renvoie vers le slug traduit.
    if (canonical !== pathname) return redirectTo(request, canonical);

    return rewriteTo(request, segment, internal);
  }

  // ── Français : à la racine ──
  // `/fr/...` n'est pas une URL publique, c'est l'arborescence interne.
  if (segment === DEFAULT_LOCALE) {
    return redirectTo(request, pathname.slice(DEFAULT_LOCALE.length + 1) || "/");
  }

  const internal = toInternal(DEFAULT_LOCALE, pathname);
  if (!internal) return NextResponse.next(); // 404 géré par l'app

  // Le choix explicite (cookie du sélecteur) prime sur l'en-tête du navigateur
  // — sans quoi un anglophone ne pourrait jamais rester sur le site français.
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = chosen && hasLocale(chosen) ? chosen : localeFromHeader(request);

  if (locale !== DEFAULT_LOCALE) {
    const target = toPublic(locale, internal);
    // Pas de version anglaise (pages légales) : on reste sur le français.
    if (target) return redirectTo(request, target);
  }

  // Réécriture interne : l'URL affichée reste `/activites`, le rendu vient de
  // `/fr/activites`. Attention : `revalidatePath` doit viser la *destination*
  // (`/[lang]/...`), pas l'URL publique — cf. lib/menu/store.ts.
  return rewriteTo(request, DEFAULT_LOCALE, internal);
}

export const config = {
  matcher: [
    // Tout sauf les routes internes, les fichiers de métadonnées et les assets
    // (public/ contient images, PNG décoratifs, logos…).
    "/((?!_next/static|_next/image|api|favicon.ico|icon.png|sitemap.xml|robots.txt|opengraph-image|twitter-image|images/|.*\\.[\\w]+$).*)",
  ],
};
