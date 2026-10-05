import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { howItWorksSteps } from '@/data/content';
import { useRouter } from '@/hooks/useRouter';

export function HowItWorksPage() {
  const { navigate } = useRouter();
  const [openDetail, setOpenDetail] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workflow"
          title="How It Works"
          subtitle="The complete hybrid quantum-classical pipeline, explained step by step in simple language."
        />

        {/* Steps */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {howItWorksSteps.map((step, i) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {i < howItWorksSteps.length - 1 && (
                <div className="absolute left-8 top-full w-px h-4 bg-gradient-to-b from-qm-primary/40 to-transparent" />
              )}

              <div className="glass-card glass-card-hover p-5">
                <div className="flex items-start gap-4">
                  {/* Step number + icon */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-qm-primary/10 to-qm-secondary/10 border border-qm-primary/20 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-qm-primary" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-qm-primary text-qm-bg text-[10px] font-mono font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-qm-text mb-1">{step.title}</h3>
                    <p className="text-sm text-qm-muted leading-relaxed">{step.description}</p>

                    {/* Technical detail toggle */}
                    <button
                      onClick={() => setOpenDetail(openDetail === i ? null : i)}
                      className="mt-3 flex items-center gap-1.5 text-xs font-mono text-qm-primary hover:gap-2.5 transition-all"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${openDetail === i ? 'rotate-180' : ''}`}
                      />
                      Technical detail
                    </button>

                    {openDetail === i && (
                      <div className="mt-3 p-3 rounded-lg bg-qm-surface/50 border border-qm-border/30 animate-fade-in">
                        <p className="text-xs text-qm-muted leading-relaxed">{step.detail}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/lab')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-qm-primary to-qm-secondary text-qm-bg font-semibold hover:opacity-90 transition-opacity"
          >
            Try it in the Lab
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
