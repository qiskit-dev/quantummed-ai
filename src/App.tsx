import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/Backgrounds';
import { useRouter } from '@/hooks/useRouter';
import { HomePage } from '@/pages/HomePage';
import { LabPage } from '@/pages/LabPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { ArchitecturePage } from '@/pages/ArchitecturePage';
import { ResultsPage } from '@/pages/ResultsPage';
import { ResearchPage } from '@/pages/ResearchPage';
import { AboutPage } from '@/pages/AboutPage';

function App() {
  const { path } = useRouter();

  const renderPage = () => {
    switch (path) {
      case '/':
        return <HomePage />;
      case '/lab':
        return <LabPage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/architecture':
        return <ArchitecturePage />;
      case '/results':
        return <ResultsPage />;
      case '/research':
        return <ResearchPage />;
      case '/about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navigation />
      <main className="relative">
        <div key={path} className="animate-fade-in">
          {renderPage()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
