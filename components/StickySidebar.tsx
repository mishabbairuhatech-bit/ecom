"use client";

import { useEffect, useRef, useState } from "react";

const HEADER_OFFSET = 80; // sticky gap below the fixed header
const BOTTOM_GAP = 24;

/**
 * Nike-style sticky sidebar: scrolls with the page like normal content, but
 * once its own end is in view it pins while the rest of the page continues.
 * When the sidebar is shorter than the viewport it simply pins below the
 * header. Achieved by setting the sticky `top` to a negative offset equal to
 * how much taller the sidebar is than the viewport.
 */
export default function StickySidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(HEADER_OFFSET);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      setTop(
        Math.min(HEADER_OFFSET, window.innerHeight - el.offsetHeight - BOTTOM_GAP)
      );
    };
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ top }}>
      {children}
    </div>
  );
}
