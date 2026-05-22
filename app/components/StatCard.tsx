"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  highlight?: boolean;
  active?: boolean;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  unit = "",
  decimals = 1,
  highlight = false,
  active = false,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#181818] rounded-2xl p-4"
    >
      <p className="text-[10px] tracking-[0.18em] uppercase text-[#555] font-semibold mb-2">
        {label}
      </p>
      <p
        className={`font-black text-2xl leading-none tabular-nums ${
          highlight ? "text-[#fc2c19]" : "text-white"
        }`}
      >
        <AnimatedNumber
          value={value}
          decimals={decimals}
          active={active}
        />
        {unit && (
          <span className="text-sm font-medium text-[#555] ml-1">{unit}</span>
        )}
      </p>
    </motion.div>
  );
}
