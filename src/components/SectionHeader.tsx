interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className={`mb-3 ${center ? '' : ''}`}>
          <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-qm-primary bg-qm-primary/10 rounded-full border border-qm-primary/20">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-qm-text tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg text-qm-muted leading-relaxed ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
