import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Wraps the public marketing site (home, restauration) with the announcement bar.
// The /admin panel lives outside this group, so it stays free of site chrome.
export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <AnnouncementBar text={dict.home.announcement} />
      {children}
    </>
  );
}
