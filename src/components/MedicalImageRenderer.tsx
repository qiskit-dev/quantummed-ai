import type { DemoImage } from '@/data/content';

interface MedicalImageRendererProps {
  demo: DemoImage;
  scanning?: boolean;
}

export function MedicalImageRenderer({ demo, scanning = false }: MedicalImageRendererProps) {
  const size = 256;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`bg-${demo.id}`} cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#0A1428" />
          <stop offset="60%" stopColor="#050816" />
          <stop offset="100%" stopColor="#020410" />
        </radialGradient>
        <filter id={`blur-${demo.id}`}>
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <filter id={`glow-${demo.id}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width={size} height={size} fill={`url(#bg-${demo.id})`} />

      {demo.id === 'A' && <CellularTexture size={size} scanning={scanning} />}
      {demo.id === 'B' && <TissueStructure size={size} scanning={scanning} />}
      {demo.id === 'C' && <RetinalScan size={size} scanning={scanning} />}

      {/* Scan line overlay */}
      {scanning && (
        <rect
          x="0"
          y="0"
          width={size}
          height="3"
          fill="#00E5FF"
          opacity="0.6"
          filter={`url(#glow-${demo.id})`}
        >
          <animate attributeName="y" from="0" to={size} dur="2s" repeatCount="indefinite" />
        </rect>
      )}

      {/* Corner brackets — medical UI feel */}
      {[
        [4, 4, 1, 1],
        [size - 4, 4, -1, 1],
        [4, size - 4, 1, -1],
        [size - 4, size - 4, -1, -1],
      ].map(([cx, cy, dx, dy], i) => (
        <path
          key={i}
          d={`M ${cx} ${cy + 12 * dy} L ${cx} ${cy} L ${cx + 12 * dx} ${cy}`}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1.5"
          opacity="0.4"
        />
      ))}
    </svg>
  );
}

function CellularTexture({ size, scanning }: { size: number; scanning: boolean }) {
  const cells: { cx: number; cy: number; r: number; opacity: number }[] = [];
  // Generate pseudo-random cell positions
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 40; i++) {
    cells.push({
      cx: rand() * size,
      cy: rand() * size,
      r: 6 + rand() * 14,
      opacity: 0.15 + rand() * 0.35,
    });
  }

  return (
    <g filter={`url(#blur-${'A'})`}>
      {/* Circular cells */}
      {cells.map((cell, i) => (
        <g key={i}>
          <circle
            cx={cell.cx}
            cy={cell.cy}
            r={cell.r}
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1"
            opacity={cell.opacity}
          />
          <circle
            cx={cell.cx}
            cy={cell.cy}
            r={cell.r * 0.4}
            fill="#7C5CFF"
            opacity={cell.opacity * 0.3}
          />
          <circle
            cx={cell.cx + cell.r * 0.3}
            cy={cell.cy - cell.r * 0.2}
            r={cell.r * 0.15}
            fill="#00FFD0"
            opacity={cell.opacity * 0.4}
          />
        </g>
      ))}
      {/* Highlighted region — potential anomaly */}
      <circle
        cx={size * 0.65}
        cy={size * 0.4}
        r={28}
        fill="none"
        stroke="#FFB347"
        strokeWidth="2"
        strokeDasharray="4 3"
        opacity={scanning ? 0.8 : 0.5}
      >
        {scanning && <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite" />}
      </circle>
    </g>
  );
}

function TissueStructure({ size, scanning }: { size: number; scanning: boolean }) {
  // Organic curved structures — like tissue layers
  const layers = Array.from({ length: 6 }, (_, i) => {
    const y = 30 + i * 35;
    const path = `M 0 ${y} Q ${size * 0.25} ${y - 15 + i * 3} ${size * 0.5} ${y} T ${size} ${y}`;
    return { path, y, opacity: 0.2 + i * 0.08 };
  });

  return (
    <g>
      {layers.map((layer, i) => (
        <path
          key={i}
          d={layer.path}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2"
          opacity={layer.opacity}
        />
      ))}
      {/* Dense region */}
      <ellipse
        cx={size * 0.55}
        cy={size * 0.5}
        rx={50}
        ry={35}
        fill="#7C5CFF"
        opacity={0.15}
        filter="url(#blur-B)"
      />
      <ellipse
        cx={size * 0.55}
        cy={size * 0.5}
        rx={45}
        ry={30}
        fill="none"
        stroke="#7C5CFF"
        strokeWidth="1.5"
        opacity={0.4}
      />
      {/* Anomaly marker */}
      <circle
        cx={size * 0.55}
        cy={size * 0.5}
        r={20}
        fill="none"
        stroke="#00FFD0"
        strokeWidth="2"
        strokeDasharray="3 2"
        opacity={scanning ? 0.8 : 0.4}
      >
        {scanning && <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />}
      </circle>
      {/* Texture dots */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = ((i * 137) % size);
        const y = ((i * 97) % size);
        return <circle key={`dot-${i}`} cx={x} cy={y} r="1" fill="#00E5FF" opacity={0.2} />;
      })}
    </g>
  );
}

function RetinalScan({ size, scanning }: { size: number; scanning: boolean }) {
  const cx = size / 2;
  const cy = size / 2;

  return (
    <g>
      {/* Outer retinal boundary */}
      <circle cx={cx} cy={cy} r={size * 0.42} fill="none" stroke="#00E5FF" strokeWidth="2" opacity="0.3" />
      <circle cx={cx} cy={cy} r={size * 0.38} fill="#7C5CFF" opacity="0.05" />

      {/* Optic disc */}
      <circle cx={cx - 30} cy={cy + 20} r="14" fill="#7C5CFF" opacity="0.25" />
      <circle cx={cx - 30} cy={cy + 20} r="14" fill="none" stroke="#7C5CFF" strokeWidth="1.5" opacity="0.5" />

      {/* Blood vessels — branching lines */}
      {[
        `M ${cx - 30} ${cy + 20} Q ${cx - 60} ${cy - 10} ${cx - 90} ${cy - 40}`,
        `M ${cx - 30} ${cy + 20} Q ${cx - 50} ${cy + 40} ${cx - 70} ${cy + 70}`,
        `M ${cx - 30} ${cy + 20} Q ${cx + 10} ${cy + 10} ${cx + 50} ${cy - 20}`,
        `M ${cx - 30} ${cy + 20} Q ${cx} ${cy + 30} ${cx + 40} ${cy + 55}`,
        `M ${cx - 30} ${cy + 20} Q ${cx - 20} ${cy - 20} ${cx - 10} ${cy - 55}`,
        `M ${cx - 30} ${cy + 20} Q ${cx + 30} ${cy + 5} ${cx + 80} ${cy + 25}`,
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#00FFD0"
          strokeWidth={1.5 - i * 0.1}
          opacity={0.35 + i * 0.03}
        />
      ))}

      {/* Fovea */}
      <circle cx={cx + 15} cy={cy - 5} r="6" fill="#00E5FF" opacity="0.2" />
      <circle cx={cx + 15} cy={cy - 5} r="6" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />

      {/* Micro-aneurysm markers */}
      {[
        { x: cx + 40, y: cy - 30 },
        { x: cx - 20, y: cy - 45 },
        { x: cx + 55, y: cy + 35 },
      ].map((pt, i) => (
        <circle
          key={`ma-${i}`}
          cx={pt.x}
          cy={pt.y}
          r="3"
          fill="#FFB347"
          opacity={scanning ? 0.7 : 0.4}
        >
          {scanning && <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
        </circle>
      ))}
    </g>
  );
}
