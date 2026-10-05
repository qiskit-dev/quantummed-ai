import { FlaskConical, ArrowRight } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

export function CTABanner() {
  const { navigate } = useRouter();

  return (
    <section className="relative py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-card p-8 sm:p-12 text-center overflow-hidden border-qm-primary/20">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08), transparent 70%)' }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-qm-text mb-3">
              Ready to explore the quantum pipeline?
            </h2>
            <p className="text-sm text-qm-muted mb-6 max-w-xl mx-auto">
              Launch the interactive diagnostic lab and watch a simulated hybrid quantum-classical analysis run step by step.
            </p>
            <button
              onClick={() => navigate('/lab')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-qm-primary to-qm-secondary text-qm-bg font-semibold hover:opacity-90 transition-opacity qm-glow"
            >
              <FlaskConical className="w-5 h-5" />
              Launch Diagnostic Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
