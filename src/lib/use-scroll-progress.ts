import { useEffect, type RefObject } from 'react';

/*
  Writes how far the page has scrolled past an element into its CSS variable --p
  (0 at the top, 1 once the element has scrolled away). Drawings and images use it to move with the scroll.
  Updates once per frame and never re-renders React.
*/
export function useScrollProgress(ref: RefObject<HTMLElement | null>, span = 0.8) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = el.offsetHeight || 1;
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, window.scrollY / (h * span)))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, span]);
}
