import type { ReactNode } from 'react';

/*
  The dark "drawing sheet" used by the scroll-driven sections.
  Pinned under the header on phones (kept short so the list stays readable) and beside the list on desktop.
*/
export default function BlueprintPanel({
  children,
  caption,
  captionOnMobile = false,
  className = '',
}: {
  children: ReactNode;
  caption?: ReactNode;
  captionOnMobile?: boolean;
  className?: string;
}) {
  return (
    <div className={`sticky top-[76px] z-10 self-start lg:top-24 ${className}`}>
      <figure className="overflow-hidden rounded-md bg-[hsl(var(--night))] text-white shadow-xl ring-1 ring-black/5 dark:ring-white/10">
        <div
          className="relative px-3 pb-1 pt-4 sm:px-6 sm:pt-6"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className={`mx-auto w-full lg:max-w-none ${captionOnMobile ? 'max-w-[calc(26vh*1.3)]' : 'max-w-[calc(34vh*1.21)]'}`}>{children}</div>
        </div>
        {caption && (
          <figcaption
            aria-live="polite"
            className={`border-t border-white/15 ${
              captionOnMobile ? 'flex items-center justify-between gap-3 px-4 py-3' : 'hidden'
            } lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6 lg:p-7`}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
