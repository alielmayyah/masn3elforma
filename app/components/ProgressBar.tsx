"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  unit?: string;
  change: number;
  changeUnit?: string;
  color?: "red" | "green" | "amber";
  delay?: number;
}

const colorMap = {
  red: "bg-[#fc2c19]",
  green: "bg-[#22c55e]",
  amber: "bg-[#f59e0b]",
};

const textColorMap = {
  red: "text-[#fc2c19]",
  green: "text-[#22c55e]",
  amber: "text-[#f59e0b]",
};

export default function ProgressBar({
  label,
  value,
  maxValue,
  unit = "",
  change,
  changeUnit = "",
  color = "red",
  delay = 0,
}: ProgressBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);
  const isPositiveChange = change > 0;
  const isGood =
    color === "green"
      ? isPositiveChange
      : color === "amber"
      ? !isPositiveChange
      : isPositiveChange;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#666] font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-white tabular-nums">
            {value}
            {unit}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isGood
                ? "bg-[#22c55e]/10 text-[#22c55e]"
                : "bg-[#fc2c19]/10 text-[#fc2c19]"
            }`}
          >
            {isPositiveChange ? "+" : ""}
            {change.toFixed(1)}
            {changeUnit}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorMap[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{
            delay: delay + 0.2,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
