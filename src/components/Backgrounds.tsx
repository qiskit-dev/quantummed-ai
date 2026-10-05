export function GridBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 grid-bg pointer-events-none ${className}`} aria-hidden="true" />
  );
}

export function DottedBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 dotted-bg pointer-events-none ${className}`} aria-hidden="true" />
  );
}

export function RadialGlow({
  className = '',
  color = 'cyan',
  size = 600,
}: {
  className?: string;
  color?: 'cyan' | 'violet' | 'teal';
  size?: number;
}) {
  const colorMap = {
    cyan: 'rgba(0, 229, 255, 0.08)',
    violet: 'rgba(124, 92, 255, 0.08)',
    teal: 'rgba(0, 255, 208, 0.06)',
  };
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]}, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-qm-bg" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <RadialGlow className="-top-40 -left-40" color="cyan" size={500} />
      <RadialGlow className="top-1/3 -right-40" color="violet" size={500} />
      <RadialGlow className="-bottom-40 left-1/3" color="teal" size={400} />
    </div>
  );
}
