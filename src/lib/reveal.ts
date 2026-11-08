import type { CSSProperties } from 'react';

/*
  Scroll-in motion helpers. Add className "reveal" (plus "zoom" or "side" for other entrances)
  and, for items in a list, a small delay so they arrive one after another:
    <li className="reveal" style={stagger(i)}>
  The observer that starts the motion lives in index.html; styles are in globals.css.
*/
export const stagger = (i: number, step = 0.07, max = 8): CSSProperties => ({ ['--d' as string]: `${Math.min(i, max) * step}s` });
