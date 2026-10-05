import { useState } from 'react';
import {
  Scan,
  Layers,
  Eye,
  Network,
  Atom,
  CircuitBoard,
  Cpu,
  Target,
  ArrowDown,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';

const archStages = [
  { title: 'Biomedical Image', subtitle: 'Input', icon: Scan, detail: 'Research dataset image — no real patient data used.' },
  { title: 'Preprocessing', subtitle: 'Resize / Normalize', icon: Layers, detail: 'Resize to 224×224, normalize pixels to [0,1], noise reduction.' },
  { title: 'Classical CNN', subtitle: 'Feature Extractor', icon: Eye, detail: 'Pre-trained convolutional network extracts spatial feature vectors.' },
  { title: 'Feature Reduction', subtitle: 'PCA / Learned', icon: Network, detail: 'Reduce high-dimensional features to match available qubits (4–8).' },
  { title: 'Quantum Encoding', subtitle: 'Angle Encoding', icon: Atom, detail: 'Feature values mapped to Ry gate rotation angles, creating quantum states.' },
  { title: 'Variational Quantum Circuit', subtitle: 'Parameterized Gates', icon: CircuitBoard, detail: 'Entangling gates + single-qubit rotations with trainable parameters.' },
  { title: 'Classical Optimizer', subtitle: 'Gradient Update', icon: Cpu, detail: 'Parameter-shift rule computes gradients; classical optimizer updates circuit weights.' },
  { title: 'Research Output', subtitle: 'Prediction', icon: Target, detail: 'Classification probability — simulated for this demonstration.' },
];

export function ArchitecturePage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Architecture"
          title="System Architecture"
          subtitle="A detailed view of the hybrid quantum-classical pipeline. Hover any stage to see technical details."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Architecture diagram */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <h3 className="text-sm font-mono text-qm-text tracking-wide mb-4">Pipeline Diagram</h3>
              <div className="space-y-2">
                {archStages.map((stage, i) => (
                  <div key={i}>
                    <div
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className={`glass-card p-4 transition-all cursor-pointer ${
                        hovered === i ? 'border-qm-primary/40 qm-glow' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-qm-primary/10 border border-qm-primary/20 flex items-center justify-center shrink-0">
                          <stage.icon className="w-5 h-5 text-qm-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-qm-text">{stage.title}</h4>
                          <p className="text-xs font-mono text-qm-dim">{stage.subtitle}</p>
                        </div>
                        {hovered === i && (
                          <span className="text-xs text-qm-primary animate-fade-in hidden sm:block">
                            {stage.detail}
                          </span>
                        )}
                      </div>
                    </div>
                    {i < archStages.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="w-4 h-4 text-qm-primary/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-20">
              <h3 className="text-sm font-mono text-qm-text tracking-wide mb-4">Stage Details</h3>
              {hovered !== null ? (
                <div className="animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-qm-primary/10 border border-qm-primary/20 flex items-center justify-center mb-3">
                    {(() => {
                      const Icon = archStages[hovered].icon;
                      return <Icon className="w-6 h-6 text-qm-primary" />;
                    })()}
                  </div>
                  <h4 className="text-base font-semibold text-qm-text mb-1">
                    {archStages[hovered].title}
                  </h4>
                  <p className="text-xs font-mono text-qm-primary mb-3">
                    {archStages[hovered].subtitle}
                  </p>
                  <p className="text-sm text-qm-muted leading-relaxed">
                    {archStages[hovered].detail}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-qm-dim">
                  Hover or tap a pipeline stage to see its technical details here.
                </p>
              )}

              {/* Architecture notes */}
              <div className="mt-6 pt-6 border-t border-qm-border/30 space-y-3">
                <div>
                  <span className="text-xs font-mono text-qm-dim block mb-1">Paradigm</span>
                  <span className="text-xs text-qm-text">Hybrid Quantum-Classical</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-qm-dim block mb-1">Quantum Backend</span>
                  <span className="text-xs text-qm-text">Qiskit Simulator (NISQ-era)</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-qm-dim block mb-1">Classical Backend</span>
                  <span className="text-xs text-qm-text">CNN (ResNet-based)</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-qm-dim block mb-1">Training</span>
                  <span className="text-xs text-qm-text">Parameter-shift + Adam optimizer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  );
}
