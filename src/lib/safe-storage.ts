/**
 * localStorage that never throws. Embedded viewers, private windows and some
 * browsers block storage and throw on access; the site must still render.
 */
export const safeStorage = {
  getItem(key: string): string | null {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  setItem(key: string, value: string): void {
    try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ }
  },
  removeItem(key: string): void {
    try { window.localStorage.removeItem(key); } catch { /* storage unavailable */ }
  },
};
