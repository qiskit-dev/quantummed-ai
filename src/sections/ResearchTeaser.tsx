import { Atom, Brain, CircuitBoard, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { researchTopics, researchQuestions } from '@/data/content';
import { useRouter } from '@/hooks/useRouter';

export function ResearchTeaser() {
  const { navigate } = useRouter();

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Research"
          title="Why Hybrid Quantum AI?"
          subtitle="Quantum machine learning is an active research field. These are the concepts driving the exploration."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {researchTopics.map((topic) => (
            <div key={topic.title} className="glass-card glass-card-hover p-5">
              <topic.icon className="w-6 h-6 text-qm-primary mb-3" />
              <h3 className="text-sm font-semibold text-qm-text mb-2">{topic.title}</h3>
              <p className="text-xs text-qm-muted leading-relaxed">{topic.description}</p>
            </div>
          ))}
        </div>

        {/* Research questions */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-qm-secondary" />
              <h3 className="text-base font-semibold text-qm-text">Research Questions</h3>
            </div>
            <ul className="space-y-3">
              {researchQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono text-qm-primary mt-0.5 shrink-0">Q{i + 1}</span>
                  <span className="text-sm text-qm-muted leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CircuitBoard className="w-5 h-5 text-qm-primary" />
                <h3 className="text-base font-semibold text-qm-text">No Quantum Advantage Claimed</h3>
              </div>
              <p className="text-sm text-qm-muted leading-relaxed mb-4">
                Quantum machine learning is an active research field. Practical quantum advantage for biomedical
                imaging remains an open research question. This prototype explores the concepts — it does not
                claim superiority over classical methods.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-qm-dim">
                <Atom className="w-4 h-4 text-qm-primary" />
                <span>NISQ-era exploration · Educational purpose</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/research')}
              className="mt-6 flex items-center gap-2 text-sm text-qm-primary hover:gap-3 transition-all self-start"
            >
              Explore research details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
