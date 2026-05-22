"use client";

import { useCallback, useRef, useState } from "react";

export function useSound() {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const beep = useCallback(
    (
      freq: number,
      type: OscillatorType = "sine",
      dur = 0.08,
      vol = 0.15
    ) => {
      if (!enabled) return;
      try {
        const ac = getCtx();
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.connect(g);
        g.connect(ac.destination);
        o.type = type;
        o.frequency.value = freq;
        g.gain.setValueAtTime(vol, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
        o.start();
        o.stop(ac.currentTime + dur);
      } catch (_) {}
    },
    [enabled, getCtx]
  );

  const successChime = useCallback(() => {
    beep(660, "sine", 0.1, 0.12);
    setTimeout(() => beep(880, "sine", 0.12, 0.1), 90);
    setTimeout(() => beep(1100, "sine", 0.14, 0.08), 180);
  }, [beep]);

  const errorBeep = useCallback(() => {
    beep(200, "sawtooth", 0.22, 0.15);
  }, [beep]);

  const clickBeep = useCallback(() => {
    beep(1200, "sine", 0.04, 0.06);
  }, [beep]);

  const toggleEnabled = useCallback(() => setEnabled((v) => !v), []);

  return { enabled, toggleEnabled, successChime, errorBeep, clickBeep };
}
