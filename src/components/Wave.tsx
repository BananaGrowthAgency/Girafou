export default function Wave({ fill, above, height = 70, deep }: { fill: string; above?: string; height?: number; deep?: boolean }) {
  // The curve's deepest dip sits at ~63% of the box height (see the path below),
  // so the bottom ~37% is solid fill at every x. `deep` overlaps well past that
  // point, burying any hairline seam inside the guaranteed-solid zone instead of
  // trying to color-match it pixel-perfectly.
  const overlap = deep ? -Math.round(height * 0.32) : -2;
  return (
    <div className="relative w-full overflow-hidden pointer-events-none" style={{ height, marginBottom: overlap, background: above }}>
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ display: "block" }}
      >
        <path d="M0,45 C240,90 480,10 720,45 C960,80 1200,15 1440,50 L1440,100 L0,100 Z" fill={fill} />
      </svg>
    </div>
  );
}
