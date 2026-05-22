"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { InbodyMeasurement } from "../data/inbody";

interface Props {
  data: InbodyMeasurement[];
}

type ChartKey = "weight" | "bodyFatPercentage" | "skeletalMuscleMass" | "bmr";

const TABS: { key: ChartKey; label: string; unit: string; color: string }[] = [
  { key: "weight", label: "Weight", unit: "kg", color: "#fc2c19" },
  { key: "bodyFatPercentage", label: "Body Fat", unit: "%", color: "#f59e0b" },
  { key: "skeletalMuscleMass", label: "Muscle", unit: "kg", color: "#22c55e" },
  { key: "bmr", label: "BMR", unit: "kcal", color: "#818cf8" },
];

const CustomTooltip = ({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  unit: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-[10px] tracking-widest uppercase text-[#555] mb-1">
        {label}
      </p>
      <p className="text-white font-black text-lg tabular-nums">
        {payload[0].value}
        <span className="text-[#666] text-sm font-medium ml-1">{unit}</span>
      </p>
    </div>
  );
};

export default function InBodyChart({ data }: Props) {
  const [activeTab, setActiveTab] = useState<ChartKey>("weight");

  const current = TABS.find((t) => t.key === activeTab)!;
  const chartData = data.map((d) => ({
    date: d.date.slice(0, 7),
    value: d[activeTab],
  }));

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-sm tracking-[0.1em] uppercase text-white">
          Body Composition
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {TABS.map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold tracking-[0.08em] uppercase transition-all duration-200 ${
              activeTab === tab.key
                ? "text-white shadow-lg"
                : "bg-[#181818] text-[#555] border border-[#252525]"
            }`}
            style={
              activeTab === tab.key
                ? {
                    backgroundColor: tab.color + "22",
                    border: `1px solid ${tab.color}44`,
                    color: tab.color,
                    boxShadow: `0 4px 16px ${tab.color}25`,
                  }
                : {}
            }
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="h-[180px] sm:h-[220px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={current.color}
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor={current.color}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "#444", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#444", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip unit={current.unit} />}
                cursor={{ stroke: current.color + "33", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={current.color}
                strokeWidth={2}
                fill="url(#grad)"
                dot={{ r: 3, fill: current.color, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: current.color,
                  stroke: "#0a0a0a",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
