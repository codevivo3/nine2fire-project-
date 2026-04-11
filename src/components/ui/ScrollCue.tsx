"use client";

import { useEffect, useState } from "react";

export function ScrollCue() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`mx-auto mt-12 flex w-fit flex-col items-center gap-2 text-foreground/55 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="h-8 w-px bg-current opacity-70" />
      <span className="animate-float text-sm leading-none">↓</span>
    </div>
  );
}
