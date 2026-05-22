"use client";

import { useCounter } from "../hooks/useCounter";

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  active?: boolean;
  suffix?: string;
  className?: string;
}

export default function AnimatedNumber({
  value,
  decimals = 1,
  duration = 1100,
  active = false,
  suffix = "",
  className = "",
}: Props) {
  const display = useCounter(value, decimals, duration, active);
  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}
