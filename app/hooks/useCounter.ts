"use client";

import { useEffect, useRef, useState } from "react";

export function useCounter(
  target: number,
  decimals = 1,
  duration = 1200,
  active = false
) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;

    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 4);
      setValue(parseFloat((target * ease).toFixed(decimals)));
      if (prog < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, decimals, duration, active]);

  return value.toFixed(decimals);
}
