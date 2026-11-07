import { useEffect, type RefObject } from 'react';

/*
  Scroll-driven highlighting for the blueprint sections.
  Every element with data-key inside `container` is watched; the one crossing the "reading line"
  becomes active. On phones the drawing is pinned at the top, so the line sits lower on the screen.
*/
export function useScrollSpy(container: RefObject<HTMLElement | null>, onActive: (key: string) => void, deps: unknown[] = []) {
  useEffect(() => {
    const root = container.current;
    if (!root || typeof IntersectionObserver === 'undefined' || typeof window.matchMedia !== 'function') return;
    const wide = window.matchMedia('(min-width: 1024px)');
    let io: IntersectionObserver | null = null;
    const setup = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) onActive((e.target as HTMLElement).dataset.key ?? '');
        },
        { rootMargin: wide.matches ? '-46% 0px -50% 0px' : '-60% 0px -34% 0px' }
      );
      root.querySelectorAll<HTMLElement>('[data-key]').forEach((el) => io!.observe(el));
    };
    setup();
    wide.addEventListener?.('change', setup);
    return () => {
      io?.disconnect();
      wide.removeEventListener?.('change', setup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
