export type PagePath = '/' | '/lab' | '/how-it-works' | '/architecture' | '/results' | '/research' | '/about';

export function normalizePath(path: string): PagePath {
  const valid: PagePath[] = ['/', '/lab', '/how-it-works', '/architecture', '/results', '/research', '/about'];
  return (valid.find(v => v === path) ?? '/') as PagePath;
}

export function getPageTitle(path: string): string {
  const map: Record<string, string> = {
    '/': 'Home',
    '/lab': 'Diagnostics Lab',
    '/how-it-works': 'How It Works',
    '/architecture': 'Architecture',
    '/results': 'Results Dashboard',
    '/research': 'Research',
    '/about': 'About',
  };
  return map[path] ?? 'QuantumMed AI';
}
