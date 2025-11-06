"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  id?: string;
}

export default function Portal({ children, id = "__portal-root" }: PortalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.style.position = "fixed"; // fixed so it ignores parent overflow
    elRef.current.style.inset = "0"; // allow absolute children to position anywhere via transform
    elRef.current.style.pointerEvents = "none"; // let children control events
    elRef.current.style.zIndex = "50"; // above regular content
  }

  useEffect(() => {
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
    return () => {
      try {
        container && elRef.current && container.removeChild(elRef.current);
        // Do not remove container to avoid churn across routes
      } catch {}
    };
  }, [id]);

  return createPortal(children, elRef.current);
}
