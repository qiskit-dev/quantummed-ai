import { SectionHeader } from '@/components/SectionHeader';
import { hackathonTimeline } from '@/data/content';

export function HackathonSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Hackathon"
          title="Built for Qiskit Fall Fest 2026"
          subtitle="A research prototype exploring quantum AI for biomedical diagnostics."
        />

        {/* Banner */}
        <div className="glass-card p-6 mb-12 border-qm-primary/20">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-qm-dim mb-1">Event</p>
              <p className="text-lg font-bold text-qm-text">Qiskit Fall Fest 2026</p>
              <p className="text-sm text-qm-muted">Global Healthcare Track</p>
            </div>
            <div className="sm:border-x border-qm-border/40">
              <p className="text-xs font-mono uppercase tracking-widest text-qm-dim mb-1">Project</p>
              <p className="text-lg font-bold qm-gradient-text">QuantumMed AI</p>
              <p className="text-sm text-qm-muted">Hybrid Vision Model</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-qm-dim mb-1">Theme</p>
              <p className="text-lg font-bold text-qm-text">Quantum AI</p>
              <p className="text-sm text-qm-muted">Biomedical Diagnostics</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-qm-primary/40 via-qm-border to-transparent hidden md:block" />

          <div className="space-y-8">
            {hackathonTimeline.map((item, i) => (
              <div
                key={item.step}
                className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="flex-1 glass-card glass-card-hover p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-qm-primary">{item.step}</span>
                    <item.icon className="w-4 h-4 text-qm-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-qm-text mb-1">{item.title}</h3>
                  <p className="text-xs text-qm-muted leading-relaxed">{item.description}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-3 h-3 rounded-full bg-qm-primary border-2 border-qm-bg qm-glow shrink-0" />

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
