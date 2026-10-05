import { useState } from 'react';
import { ChevronDown, ArrowDown } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { pipelineStages } from '@/data/content';

export function SolutionSection() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 dotted-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Approach"
          title="Where Quantum Computing Enters the Pipeline"
          subtitle="A hybrid architecture combines classical neural networks with quantum circuits. Each stage plays a specific role — click any stage to learn more."
        />

        {/* Pipeline */}
        <div className="space-y-2">
          {pipelineStages.map((stage, i) => (
            <div key={stage.id}>
              <button
                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                className={`w-full glass-card glass-card-hover p-4 text-left transition-all ${
                  activeStage === stage.id ? 'border-qm-primary/40 qm-glow' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-qm-dim w-6">{stage.id}</span>
                    <div className="w-10 h-10 rounded-lg bg-qm-primary/10 border border-qm-primary/20 flex items-center justify-center">
                      <stage.icon className="w-5 h-5 text-qm-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-qm-text">{stage.title}</h3>
                    <p className="text-xs text-qm-muted truncate">{stage.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-qm-primary hidden sm:inline">{stage.short}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-qm-dim transition-transform ${
                        activeStage === stage.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded detail */}
                {activeStage === stage.id && (
                  <div className="mt-4 pt-4 border-t border-qm-border/30 animate-fade-in">
                    <p className="text-sm text-qm-muted leading-relaxed">{stage.detail}</p>
                  </div>
                )}
              </button>

              {/* Connector */}
              {i < pipelineStages.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-qm-dim" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hybrid note */}
        <div className="mt-8 glass-card p-4 border-qm-primary/20">
          <p className="text-sm text-qm-muted text-center">
            <span className="text-qm-primary font-semibold">HYBRID ARCHITECTURE: </span>
            This pipeline combines classical computation (feature extraction, optimization) with quantum computation
            (encoding, variational circuit). The two paradigms work together — neither replaces the other.
          </p>
        </div>
      </div>
    </section>
  );
}
