import AnnouncementBar from "@/components/AnnouncementBar";

// Wraps the public marketing site (home, restauration) with the announcement bar.
// The /admin panel lives outside this group, so it stays free of site chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      {children}
    </>
  );
}
