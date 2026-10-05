import { ArrowDown, Atom, CircuitBoard, Layers, Scan } from 'lucide-react';

interface FeatureMapProps {
  animate?: boolean;
  features?: number[];
}

export function FeatureMap({ animate = false, features }: FeatureMapProps) {
  const values: number[] = features ?? [0.82, 0.61, 0.74, 0.42, 0.68, 0.31, 0.55, 0.47];
  const steps = [
    { label: 'Image Features', icon: Scan },
    { label: 'Normalization', icon: Layers },
    { label: 'Angle Encoding', icon: Atom },
    { label: 'Quantum State', icon: CircuitBoard },
  ];

  return (
    <div className="glass-card p-4 sm:p-6">
      <h4 className="text-sm font-mono text-qm-text tracking-wide mb-4">Quantum Feature Encoding Pipeline</h4>

      {/* Feature vector bars */}
      <div className="space-y-2 mb-6">
        {values.slice(0, 8).map((val, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs font-mono text-qm-muted w-20 shrink-0">Feature {String(i + 1).padStart(2, '0')}</span>
            <div className="flex-1 h-6 bg-qm-surface rounded relative overflow-hidden border border-qm-border/40">
              <div
                className="h-full rounded bg-gradient-to-r from-qm-primary/60 to-qm-secondary/60 flex items-center justify-end pr-2"
                style={{
                  width: animate ? `${val * 100}%` : '0%',
                  transition: `width 0.8s ease ${i * 0.1}s`,
                }}
              >
                <span className="text-[10px] font-mono text-qm-text">{val.toFixed(2)}</span>
              </div>
            </div>
            <span className="text-xs font-mono text-qm-primary w-12 text-right shrink-0">
              θ={Math.round(val * 180)}°
            </span>
          </div>
        ))}
      </div>

      {/* Pipeline steps */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-thin pb-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1 shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center">
                <step.icon className="w-4 h-4 text-qm-primary" />
              </div>
              <span className="text-[10px] font-mono text-qm-muted whitespace-nowrap">{step.label}</span>
            </div>
            {i < steps.length - 1 && <ArrowDown className="w-3 h-3 text-qm-dim rotate-[-90deg] shrink-0" />}
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] font-mono text-qm-dim text-center">
        SIMULATED · Feature values mapped to Ry rotation angles for quantum encoding
      </p>
    </div>
  );
}
