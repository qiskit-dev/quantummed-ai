import { useState } from 'react';
import { Menu, X, Atom, FlaskConical } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useRouter } from '@/hooks/useRouter';
import type { PagePath } from '@/hooks/useRouter';

export function Navigation() {
  const { path, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (to: PagePath) => {
    navigate(to);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-qm-border/40 bg-qm-bg/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavigate('/')}
              className="flex items-center gap-2 group"
              aria-label="QuantumMed AI home"
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-qm-primary/20 to-qm-secondary/20 border border-qm-primary/30 flex items-center justify-center group-hover:border-qm-primary/60 transition-colors">
                <Atom className="w-5 h-5 text-qm-primary animate-spin-slow" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-bold text-qm-text tracking-wide">
                  QuantumMed
                </span>
                <span className="text-[10px] font-mono text-qm-primary tracking-widest">AI</span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigate(link.path as PagePath)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    path === link.path
                      ? 'text-qm-primary bg-qm-primary/10'
                      : 'text-qm-muted hover:text-qm-text hover:bg-qm-surface/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('/lab')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-qm-primary to-qm-secondary text-qm-bg hover:opacity-90 transition-opacity"
              >
                <FlaskConical className="w-4 h-4" />
                Launch Lab
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-qm-text hover:text-qm-primary transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-qm-border/40 bg-qm-bg/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigate(link.path as PagePath)}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    path === link.path
                      ? 'text-qm-primary bg-qm-primary/10'
                      : 'text-qm-muted hover:text-qm-text hover:bg-qm-surface/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('/lab')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-qm-primary to-qm-secondary text-qm-bg"
              >
                <FlaskConical className="w-4 h-4" />
                Launch Diagnostic Lab
              </button>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
