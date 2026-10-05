import { Brain, AlertCircle } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { researchTopics, researchQuestions, comparisonMetrics } from '@/data/content';
import { useState } from 'react';

export function ResearchPage() {
  const [view, setView] = useState<'classical' | 'hybrid'>('hybrid');

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Research"
          title="Why Hybrid Quantum AI?"
          subtitle="Exploring whether quantum feature maps and variational circuits can enhance biomedical image analysis."
        />

        {/* Research topics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {researchTopics.map((topic) => {
            return (
              <div key={topic.title} className="glass-card glass-card-hover p-5">
                <topic.icon className="w-6 h-6 text-qm-primary mb-3" />
                <h3 className="text-sm font-semibold text-qm-text mb-2">{topic.title}</h3>
                <p className="text-xs text-qm-muted leading-relaxed">{topic.description}</p>
              </div>
            );
          })}
        </div>

        {/* Classical vs Hybrid comparison */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-qm-text">Classical vs Hybrid Quantum</h3>
            {/* Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl glass-card">
              <button
                onClick={() => setView('classical')}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  view === 'classical'
                    ? 'bg-qm-muted/20 text-qm-text'
                    : 'text-qm-dim hover:text-qm-muted'
                }`}
              >
                CLASSICAL
              </button>
              <button
                onClick={() => setView('hybrid')}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  view === 'hybrid'
                    ? 'bg-qm-primary/15 text-qm-primary border border-qm-primary/30'
                    : 'text-qm-dim hover:text-qm-muted'
                }`}
              >
                HYBRID QUANTUM
              </button>
            </div>
          </div>

          {/* Comparison table */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-3 border-b border-qm-border/40">
              <div className="p-4 text-xs font-mono uppercase tracking-widest text-qm-dim">Metric</div>
              <div className={`p-4 text-xs font-mono uppercase tracking-widest ${view === 'classical' ? 'text-qm-text' : 'text-qm-dim'}`}>
                Classical ML
              </div>
              <div className={`p-4 text-xs font-mono uppercase tracking-widest ${view === 'hybrid' ? 'text-qm-primary' : 'text-qm-dim'}`}>
                Hybrid Quantum
              </div>
            </div>
            {comparisonMetrics.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 border-b border-qm-border/20 last:border-0 ${
                  i % 2 === 0 ? 'bg-qm-surface/20' : ''
                }`}
              >
                <div className="p-4 text-sm text-qm-text font-medium">{row.metric}</div>
                <div className={`p-4 text-xs transition-all ${view === 'classical' ? 'text-qm-muted' : 'text-qm-dim/60'}`}>
                  {row.classical}
                </div>
                <div className={`p-4 text-xs transition-all ${view === 'hybrid' ? 'text-qm-muted' : 'text-qm-dim/60'}`}>
                  {row.hybrid}
                </div>
              </div>
            ))}
          </div>

          {/* No quantum advantage note */}
          <div className="mt-6 glass-card p-5 border-qm-secondary/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-qm-secondary shrink-0 mt-0.5" />
              <p className="text-sm text-qm-muted leading-relaxed">
                <span className="text-qm-secondary font-semibold">Important: </span>
                Quantum machine learning is an active research field. Practical quantum advantage for biomedical
                imaging remains an open research question. This comparison illustrates architectural differences —
                it does not claim quantum superiority.
              </p>
            </div>
          </div>
        </div>

        {/* Research questions */}
        <div className="glass-card p-6 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-qm-secondary" />
            <h3 className="text-base font-semibold text-qm-text">Research Questions</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {researchQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-qm-surface/30">
                <span className="text-xs font-mono text-qm-primary mt-0.5 shrink-0 w-6">Q{i + 1}</span>
                <span className="text-sm text-qm-muted leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-qm-text mb-4">Known Limitations</h3>
          <ul className="space-y-3">
            {[
              'Current quantum hardware (NISQ era) has limited qubit counts and high noise levels.',
              'Quantum simulation on classical hardware scales exponentially — limiting practical circuit sizes.',
              'Feature reduction from high-dimensional images to few qubits may lose information.',
              'Training variational circuits can suffer from barren plateaus in the optimization landscape.',
              'No real clinical validation has been performed — all results are simulated.',
            ].map((limitation, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-qm-secondary mt-2 shrink-0" />
                <span className="text-sm text-qm-muted leading-relaxed">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
