"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  id?: string;
}

export default function Portal({ children, id = "__portal-root" }: PortalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Create the element on mount (client-side only)
    if (!elRef.current) {
      elRef.current = document.createElement("div");
      elRef.current.style.position = "fixed";
      elRef.current.style.inset = "0";
      elRef.current.style.pointerEvents = "none";
      elRef.current.style.zIndex = "50";
    }

    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", id);
      container.style.position = "fixed";
      container.style.inset = "0";
      container.style.zIndex = "50";
      container.style.pointerEvents = "none";
      document.body.appendChild(container);
    }
    container.appendChild(elRef.current!);
    
    setMounted(true);

    return () => {
      try {
        container && elRef.current && container.removeChild(elRef.current);
        // Do not remove container to avoid churn across routes
      } catch {}
    };
  }, [id]);

  // Don't render on server or before mount
  if (!mounted || !elRef.current) return null;

  return createPortal(children, elRef.current);
}
