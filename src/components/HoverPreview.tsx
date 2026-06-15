import { useRef, useState } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
  previewLabel?: string;
};

function domainOf(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

export function Favicon({ href, size = 16 }: { href: string; size?: number }) {
  const d = domainOf(href);
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`}
      alt=""
      width={size}
      height={size}
      className="inline-block align-[-3px] mr-1.5 rounded-[3px]"
      loading="lazy"
    />
  );
}

export function HoverPreview({ href, children, className, icon = true, previewLabel }: Props) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const isExternal = /^https?:\/\//.test(href);
  const shot = isExternal
    ? `https://image.thum.io/get/width/480/crop/300/noanimate/${href}`
    : null;

  return (
    <span
      className="relative inline"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        ref={ref}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={className}
      >
        {icon && isExternal && <Favicon href={href} />}
        {children}
      </a>
      {hover && shot && (
        <span
          className="pointer-events-none fixed z-[60] animate-fade-in"
          style={{ left: 0, top: 0, transform: `translate(${pos.x + (ref.current?.getBoundingClientRect().left ?? 0) + 16}px, ${pos.y + (ref.current?.getBoundingClientRect().top ?? 0) - 180}px)` }}
        >
          <span className="block w-[280px] overflow-hidden rounded-lg border border-white/15 bg-[#0a0a0a] shadow-[0_20px_60px_-10px_rgba(0,0,0,.9)]">
            <span className="block aspect-[16/10] w-full bg-white/5">
              <img src={shot} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
            </span>
            {previewLabel && (
              <span className="mono block px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
                {previewLabel}
              </span>
            )}
          </span>
        </span>
      )}
    </span>
  );
}
