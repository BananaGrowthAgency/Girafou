const announcementText = "🍦 OFFRE ÉTÉ : Glace enfant offerte pour toute entrée entre 10h et 12h !";
const repeated = Array(10).fill(announcementText);

export default function AnnouncementBar() {
  return (
    <div
      className="w-full overflow-hidden py-2"
      style={{ background: "#C0392B" }}
    >
      <div
        className="flex gap-0 w-max"
        style={{ animation: "marquee 55s linear infinite" }}
      >
        {repeated.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-8 text-white font-bold text-sm whitespace-nowrap"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {text}
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
