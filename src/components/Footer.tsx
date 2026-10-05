import { Atom, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useRouter } from '@/hooks/useRouter';
import type { PagePath } from '@/hooks/useRouter';

const DISCLAIMER =
  'QuantumMed AI is an educational research prototype created to demonstrate concepts in quantum machine learning and biomedical image analysis. It is not a medical device and must not be used for diagnosis, treatment, or clinical decision-making.';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative border-t border-qm-border/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-qm-primary/20 to-qm-secondary/20 border border-qm-primary/30 flex items-center justify-center">
                <Atom className="w-5 h-5 text-qm-primary" />
              </div>
              <div>
                <span className="text-sm font-bold text-qm-text">QuantumMed AI</span>
                <span className="ml-1.5 text-[10px] font-mono text-qm-primary tracking-widest">AI</span>
              </div>
            </div>
            <p className="text-sm text-qm-muted max-w-md leading-relaxed mb-4">
              Exploring the intersection of quantum computing, artificial intelligence, and biomedical research.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-qm-muted hover:text-qm-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-qm-muted hover:text-qm-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@quantummed.ai"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-qm-muted hover:text-qm-primary transition-colors"
                aria-label="Contact email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://qiskit.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-qm-muted hover:text-qm-primary transition-colors"
                aria-label="Qiskit"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-qm-dim mb-3">Navigate</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path as PagePath)}
                    className="text-sm text-qm-muted hover:text-qm-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-qm-dim mb-3">Resources</h3>
            <ul className="space-y-2">
              {navLinks.slice(4).map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path as PagePath)}
                    className="text-sm text-qm-muted hover:text-qm-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://qiskit.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-qm-muted hover:text-qm-primary transition-colors inline-flex items-center gap-1"
                >
                  Qiskit <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-qm-border/40">
          <div className="glass-card p-4 mb-6">
            <p className="text-xs text-qm-muted leading-relaxed">
              <span className="text-qm-secondary font-semibold">Medical Disclaimer: </span>
              {DISCLAIMER}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-qm-dim">
              © 2026 QuantumMed AI — Qiskit Fall Fest 2026 · Research Prototype
            </p>
            <p className="text-xs text-qm-dim font-mono">
              Built with React · TypeScript · Qiskit Concepts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
