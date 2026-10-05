import { Users, Github, Linkedin, Building2, GraduationCap, ExternalLink, Mail, Atom } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="About the Project"
          subtitle="QuantumMed AI is a research prototype built for Qiskit Fall Fest 2026, exploring hybrid quantum-classical machine learning for biomedical image analysis."
        />

        {/* Project overview */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-base font-semibold text-qm-text mb-3">Project Overview</h3>
          <div className="space-y-3 text-sm text-qm-muted leading-relaxed">
            <p>
              QuantumMed AI demonstrates how hybrid quantum-classical machine learning could potentially assist
              medical-image analysis and early disease detection. The project combines classical convolutional
              neural networks for feature extraction with variational quantum circuits for quantum-enhanced processing.
            </p>
            <p>
              The interactive lab allows users to upload images or select demo images and watch a simulated analysis
              pipeline execute step by step — from classical preprocessing through quantum encoding and variational
              inference to a final prediction.
            </p>
            <p>
              All results are simulated for educational purposes. The project does not claim quantum advantage and
              is not a medical device.
            </p>
          </div>
        </div>

        {/* Team / placeholders */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-qm-primary" />
            <h3 className="text-base font-semibold text-qm-text">Team</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-card p-4">
              <Building2 className="w-4 h-4 text-qm-dim mb-2" />
              <span className="text-xs font-mono text-qm-dim block">Team Name</span>
              <span className="text-sm text-qm-muted">[Your Team Name]</span>
            </div>
            <div className="glass-card p-4">
              <Users className="w-4 h-4 text-qm-dim mb-2" />
              <span className="text-xs font-mono text-qm-dim block">Team Members</span>
              <span className="text-sm text-qm-muted">[Member Names]</span>
            </div>
            <div className="glass-card p-4">
              <GraduationCap className="w-4 h-4 text-qm-dim mb-2" />
              <span className="text-xs font-mono text-qm-dim block">University</span>
              <span className="text-sm text-qm-muted">[Your University]</span>
            </div>
            <div className="glass-card p-4">
              <Building2 className="w-4 h-4 text-qm-dim mb-2" />
              <span className="text-xs font-mono text-qm-dim block">Department</span>
              <span className="text-sm text-qm-muted">[Your Department]</span>
            </div>
            <div className="glass-card p-4">
              <Github className="w-4 h-4 text-qm-dim mb-2" />
              <span className="text-xs font-mono text-qm-dim block">GitHub</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-qm-primary hover:underline inline-flex items-center gap-1">
                [Repository] <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="glass-card p-4">
              <Linkedin className="w-4 h-4 text-qm-dim mb-2" />
              <span className="text-xs font-mono text-qm-dim block">LinkedIn</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-qm-primary hover:underline inline-flex items-center gap-1">
                [Profile] <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-base font-semibold text-qm-text mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Framer Motion', 'Lucide Icons', 'Qiskit Concepts'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-qm-surface/30 border border-qm-border/30">
                <Atom className="w-3.5 h-3.5 text-qm-primary shrink-0" />
                <span className="text-xs font-mono text-qm-muted">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-base font-semibold text-qm-text mb-4">Project Repository</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass-card text-qm-text text-sm hover:border-qm-primary/40 transition-colors"
            >
              <Github className="w-4 h-4 text-qm-primary" />
              View on GitHub
              <ExternalLink className="w-3 h-3 text-qm-dim" />
            </a>
            <a
              href="mailto:contact@quantummed.ai"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass-card text-qm-text text-sm hover:border-qm-primary/40 transition-colors"
            >
              <Mail className="w-4 h-4 text-qm-primary" />
              Contact Team
            </a>
            <a
              href="https://qiskit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass-card text-qm-text text-sm hover:border-qm-primary/40 transition-colors"
            >
              <Atom className="w-4 h-4 text-qm-primary" />
              Qiskit.org
              <ExternalLink className="w-3 h-3 text-qm-dim" />
            </a>
          </div>
        </div>

        <DisclaimerBanner variant="card" />
      </div>
    </div>
  );
}
