import { AlertTriangle } from 'lucide-react';

export function DisclaimerBanner({ variant = 'inline' }: { variant?: 'inline' | 'card' }) {
  const text =
    'SIMULATED RESEARCH DEMONSTRATION — This is not a medical device. All results are simulated for educational purposes and must not be used for clinical decisions.';

  if (variant === 'card') {
    return (
      <div className="glass-card p-4 border-qm-secondary/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-qm-secondary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-qm-secondary mb-1">
              Medical Disclaimer
            </p>
            <p className="text-sm text-qm-muted leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-qm-secondary/10 border border-qm-secondary/20">
      <AlertTriangle className="w-4 h-4 text-qm-secondary shrink-0" />
      <p className="text-xs text-qm-muted">{text}</p>
    </div>
  );
}
