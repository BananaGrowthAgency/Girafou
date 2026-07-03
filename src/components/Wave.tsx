export default function Wave({ fill, above, height = 70 }: { fill: string; above?: string; height?: number }) {
  return (
    <div className="relative w-full pointer-events-none" style={{ height, marginBottom: -1, background: above }}>
      <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,45 C240,90 480,10 720,45 C960,80 1200,15 1440,50 L1440,100 L0,100 Z" fill={fill} />
      </svg>
    </div>
  );
}
