"use client";

import { motion } from "framer-motion";
import { InbodyMeasurement } from "../data/inbody";

interface Props {
  data: InbodyMeasurement[];
}

function Delta({
  cur,
  prev,
  goodDir,
}: {
  cur: number;
  prev: number | null;
  goodDir: "up" | "down" | "neutral";
}) {
  if (prev === null) return null;
  const diff = parseFloat((cur - prev).toFixed(1));
  if (diff === 0) return null;
  const isPos = diff > 0;
  const isGood =
    goodDir === "up" ? isPos : goodDir === "down" ? !isPos : null;

  return (
    <span
      className={`text-[10px] font-bold ml-1 ${
        isGood === true
          ? "text-[#22c55e]"
          : isGood === false
          ? "text-[#fc2c19]"
          : "text-[#666]"
      }`}
    >
      {isPos ? "+" : ""}
      {diff}
    </span>
  );
}

export default function InBodyHistory({ data }: Props) {
  const reversed = [...data].reverse();

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-sm tracking-[0.1em] uppercase text-white">
          InBody History
        </h3>
        <span className="text-[10px] tracking-widest uppercase text-[#444] font-semibold">
          {data.length} scans
        </span>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-left text-xs min-w-[440px]">
          <thead>
            <tr>
              {["Date", "Weight", "Fat%", "SMM", "BMI", "Visceral"].map(
                (h) => (
                  <th
                    key={h}
                    className="pb-3 pr-3 text-[10px] tracking-[0.15em] uppercase text-[#444] font-semibold whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {reversed.map((entry, i) => {
              const isLatest = i === 0;
              const prev = i < reversed.length - 1 ? reversed[i + 1] : null;

              return (
                <motion.tr
                  key={entry.date}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className={`border-t border-[#1a1a1a] transition-colors hover:bg-white/[0.02] ${
                    isLatest ? "text-white" : "text-[#666]"
                  }`}
                >
                  <td className="py-3 pr-3 whitespace-nowrap">
                    {entry.date}
                    {isLatest && (
                      <span className="ml-1.5 text-[#fc2c19] text-[8px] font-black tracking-widest uppercase">
                        LATEST
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-3 tabular-nums">
                    {entry.weight}
                    <Delta cur={entry.weight} prev={prev?.weight ?? null} goodDir="neutral" />
                  </td>
                  <td className="py-3 pr-3 tabular-nums">
                    {entry.bodyFatPercentage.toFixed(1)}%
                    <Delta
                      cur={entry.bodyFatPercentage}
                      prev={prev?.bodyFatPercentage ?? null}
                      goodDir="down"
                    />
                  </td>
                  <td className="py-3 pr-3 tabular-nums">
                    {entry.skeletalMuscleMass.toFixed(1)}
                    <Delta
                      cur={entry.skeletalMuscleMass}
                      prev={prev?.skeletalMuscleMass ?? null}
                      goodDir="up"
                    />
                  </td>
                  <td className="py-3 pr-3 tabular-nums">
                    {entry.bmi.toFixed(1)}
                    <Delta cur={entry.bmi} prev={prev?.bmi ?? null} goodDir="neutral" />
                  </td>
                  <td className="py-3 tabular-nums">
                    {entry.visceralFatLevel}
                    <Delta
                      cur={entry.visceralFatLevel}
                      prev={prev?.visceralFatLevel ?? null}
                      goodDir="down"
                    />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
