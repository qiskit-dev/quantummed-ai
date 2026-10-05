import { FlaskConical, Cpu, Activity } from 'lucide-react';
import { HeroVisualization } from '@/components/HeroVisualization';
import { QuantumParticles } from '@/components/QuantumParticles';
import { useRouter } from '@/hooks/useRouter';

export function Hero() {
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <QuantumParticles count={40} />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.06), transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-qm-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-qm-accent" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-qm-muted">
                Research Prototype
              </span>
              <span className="text-xs font-mono text-qm-primary">Hybrid Quantum-Classical AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-qm-text tracking-tight leading-[1.1] text-balance">
              Reimagining Medical Diagnosis with{' '}
              <span className="qm-gradient-text">Quantum AI</span>
            </h1>

            <p className="mt-6 text-lg text-qm-muted leading-relaxed max-w-xl">
              Hybrid quantum-classical vision models for intelligent biomedical image analysis and early disease detection.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/lab')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-qm-primary to-qm-secondary text-qm-bg font-semibold hover:opacity-90 transition-opacity qm-glow"
              >
                <FlaskConical className="w-5 h-5" />
                Launch Diagnostic Lab
              </button>
              <button
                onClick={() => navigate('/how-it-works')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-card text-qm-text font-semibold hover:border-qm-primary/40 transition-colors"
              >
                <Cpu className="w-5 h-5 text-qm-primary" />
                Explore the Technology
              </button>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: 'Qubits', value: '4–8', icon: Activity },
                { label: 'Pipeline', value: '7-Stage', icon: Cpu },
                { label: 'Model', value: 'Hybrid', icon: FlaskConical },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-3 text-center">
                  <stat.icon className="w-4 h-4 text-qm-primary mx-auto mb-1" />
                  <div className="text-lg font-bold text-qm-text">{stat.value}</div>
                  <div className="text-xs text-qm-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="relative">
            <HeroVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}
