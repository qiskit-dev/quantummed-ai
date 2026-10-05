import { SectionHeader } from '@/components/SectionHeader';
import { problemCards } from '@/data/content';

export function ProblemSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Challenge"
          title="Medical Imaging Is Becoming More Complex"
          subtitle="Modern medical imaging produces enormous amounts of information. AI-assisted analysis may help researchers identify patterns more efficiently — but the complexity grows with every advancement."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {problemCards.map((card, i) => (
            <div
              key={card.title}
              className="glass-card glass-card-hover p-6 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-qm-primary/10 border border-qm-primary/20 flex items-center justify-center mb-4 group-hover:bg-qm-primary/20 transition-colors">
                <card.icon className="w-6 h-6 text-qm-primary" />
              </div>
              <h3 className="text-lg font-semibold text-qm-text mb-2">{card.title}</h3>
              <p className="text-sm text-qm-muted leading-relaxed">{card.description}</p>

              {/* Decorative SVG */}
              <div className="mt-6 pt-6 border-t border-qm-border/30">
                <svg viewBox="0 0 200 60" className="w-full h-12">
                  {Array.from({ length: 20 }).map((_, j) => (
                    <circle
                      key={j}
                      cx={10 + j * 10}
                      cy={30 + Math.sin(j * 0.5 + i) * 15}
                      r={2}
                      fill={j % 3 === 0 ? '#00E5FF' : '#1A2350'}
                      opacity={j % 3 === 0 ? 0.6 : 0.3}
                    />
                  ))}
                  <polyline
                    points={Array.from({ length: 20 }, (_, j) => `${10 + j * 10},${30 + Math.sin(j * 0.5 + i) * 15}`).join(' ')}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
