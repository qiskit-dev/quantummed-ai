import { useEffect, useState } from 'react';
import { Scan, Eye, Atom, Target, ChevronRight } from 'lucide-react';

const STAGES = [
  { label: 'Medical Image', icon: Scan, color: '#00E5FF' },
  { label: 'Classical Features', icon: Eye, color: '#7C5CFF' },
  { label: 'Quantum Circuit', icon: Atom, color: '#00FFD0' },
  { label: 'AI Prediction', icon: Target, color: '#00E5FF' },
];

export function HeroVisualization() {
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % (STAGES.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="relative glass-card p-6 sm:p-8 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 rounded-2xl" />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1), transparent 70%)' }}
      />

      <div className="relative">
        {/* Pipeline stages */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-2">
          {STAGES.map((stage, i) => (
            <div key={i} className="flex sm:flex-col items-center gap-2 sm:gap-3">
              <div
                className="relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{
                  background: activeStage === i ? `${stage.color}20` : `${stage.color}08`,
                  border: `1px solid ${activeStage === i ? stage.color : '#1A2350'}`,
                  boxShadow: activeStage === i ? `0 0 20px ${stage.color}40` : 'none',
                }}
              >
                <stage.icon
                  className="w-7 h-7 transition-all duration-500"
                  style={{ color: activeStage === i ? stage.color : '#5A6B9C' }}
                />
                {/* Pulse effect */}
                {activeStage === i && (
                  <div
                    className="absolute inset-0 rounded-xl animate-ping"
                    style={{ border: `1px solid ${stage.color}40` }}
                  />
                )}
              </div>
              <span
                className="text-xs font-mono transition-colors duration-500"
                style={{ color: activeStage === i ? stage.color : '#5A6B9C' }}
              >
                {stage.label}
              </span>
              {i < STAGES.length - 1 && (
                <ChevronRight
                  className="hidden sm:block absolute"
                  style={{
                    left: `${25 + i * 25}%`,
                    top: '32px',
                    color: activeStage > i ? '#00E5FF' : '#1A2350',
                    transition: 'color 0.5s ease',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mini quantum circuit preview */}
        <div className="mt-8 pt-6 border-t border-qm-border/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-qm-dim">Quantum Circuit Preview</span>
            <span className="text-xs font-mono text-qm-primary">4 qubits</span>
          </div>
          <svg viewBox="0 0 320 140" className="w-full">
            {/* Qubit lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="30"
                y1={20 + i * 30}
                x2="290"
                y2={20 + i * 30}
                stroke="#1A2350"
                strokeWidth="1.5"
              />
            ))}
            {/* Qubit labels */}
            {[0, 1, 2, 3].map((i) => (
              <text key={i} x="10" y={24 + i * 30} fill="#5A6B9C" fontSize="11" fontFamily="JetBrains Mono">
                q{i}
              </text>
            ))}
            {/* H gates */}
            {[0, 1, 2, 3].map((i) => (
              <g key={`h-${i}`}>
                <rect x="50" y={10 + i * 30} width="24" height="20" rx="4" fill="#00E5FF15" stroke="#00E5FF" strokeWidth="1" />
                <text x="62" y={24 + i * 30} textAnchor="middle" fill="#00E5FF" fontSize="11" fontFamily="JetBrains Mono">H</text>
              </g>
            ))}
            {/* Ry gates */}
            {[0, 1, 2, 3].map((i) => (
              <g key={`ry-${i}`}>
                <rect x="100" y={10 + i * 30} width="32" height="20" rx="4" fill="#7C5CFF15" stroke="#7C5CFF" strokeWidth="1" />
                <text x="116" y={24 + i * 30} textAnchor="middle" fill="#7C5CFF" fontSize="9" fontFamily="JetBrains Mono">Ry</text>
              </g>
            ))}
            {/* CNOT connections */}
            {[0, 1, 2].map((i) => (
              <g key={`cnot-${i}`}>
                <line x1="170" y1={20 + i * 30} x2="170" y2={50 + i * 30} stroke="#00FFD0" strokeWidth="1.5" opacity="0.5" />
                <circle cx="170" cy={20 + i * 30} r="4" fill="#00FFD0" opacity="0.6" />
                <circle cx="170" cy={50 + i * 30} r="8" fill="none" stroke="#00FFD0" strokeWidth="1.5" opacity="0.5" />
                <line x1="164" y1={50 + i * 30} x2="176" y2={50 + i * 30} stroke="#00FFD0" strokeWidth="1.5" opacity="0.5" />
                <line x1="170" y1={44 + i * 30} x2="170" y2={56 + i * 30} stroke="#00FFD0" strokeWidth="1.5" opacity="0.5" />
              </g>
            ))}
            {/* Measurement */}
            {[0, 1, 2, 3].map((i) => (
              <g key={`m-${i}`}>
                <rect x="240" y={10 + i * 30} width="24" height="20" rx="4" fill="#FFB34715" stroke="#FFB347" strokeWidth="1" />
                <text x="252" y={24 + i * 30} textAnchor="middle" fill="#FFB347" fontSize="10" fontFamily="JetBrains Mono">M</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
