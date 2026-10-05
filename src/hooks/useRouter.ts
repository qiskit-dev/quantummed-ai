import { useState, useEffect, useCallback } from 'react';

export type PagePath = '/' | '/lab' | '/how-it-works' | '/architecture' | '/results' | '/research' | '/about';

const VALID_PATHS: PagePath[] = ['/', '/lab', '/how-it-works', '/architecture', '/results', '/research', '/about'];

function isValidPath(path: string): path is PagePath {
  return VALID_PATHS.includes(path as PagePath);
}

function getCurrentPath(): PagePath {
  const hash = window.location.hash.replace(/^#/, '');
  const path = hash || '/';
  return isValidPath(path) ? path : '/';
}

export function useRouter() {
  const [path, setPath] = useState<PagePath>(getCurrentPath);

  useEffect(() => {
    const onHashChange = () => {
      setPath(getCurrentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: PagePath) => {
    window.location.hash = to;
  }, []);

  return { path, navigate };
}
