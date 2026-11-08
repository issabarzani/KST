import { useEffect, useRef, useState } from 'react';

/*
  A number that counts up once when it first comes into view ("100+", "15+", "8").
  The page is rendered with the final value, so it is always correct without JavaScript or with reduced motion.
*/
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const m = /^(\D*)(\d+)(.*)$/.exec(value);
  const target = m ? Number(m[2]) : 0;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / duration);
          const eased = 1 - (1 - k) ** 3;
          setShown(`${m[1]}${Math.round(target * eased)}${m[3]}`);
          if (k < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {shown}
    </span>
  );
}
