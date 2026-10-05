import { Hero } from '@/sections/Hero';
import { ProblemSection } from '@/sections/ProblemSection';
import { SolutionSection } from '@/sections/SolutionSection';
import { ResearchTeaser } from '@/sections/ResearchTeaser';
import { HackathonSection } from '@/sections/HackathonSection';
import { CTABanner } from '@/sections/CTABanner';

export function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ResearchTeaser />
      <HackathonSection />
      <CTABanner />
    </>
  );
}
