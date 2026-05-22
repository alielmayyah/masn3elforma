"use client";

import { motion, Variants } from "framer-motion";
import { User } from "../data/user";
import { inbodyData } from "../data/inbody";
import StatCard from "./StatCard";
import ProgressBar from "./ProgressBar";
import InBodyChart from "./InBodyChart";
import InBodyHistory from "./InBodyHistory";
import { useSound } from "../hooks/useSound";
import logo from "../assets/logo.jpg";
import Image from "next/image";

interface Props {
  user: User;
  onLogout: () => void;
}

const GOAL_LABELS: Record<User["goal"], string> = {
  muscle_gain: "Muscle Gain",
  fat_loss: "Fat Loss",
  maintenance: "Maintenance",
  recomposition: "Recomposition",
};

const LEVEL_LABELS: Record<User["activityLevel"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const MEMBERSHIP_LABELS: Record<User["membershipType"], string> = {
  monthly: "Monthly",
  "3_months": "3 Months",
  "6_months": "6 Months",
  yearly: "Yearly",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Dashboard({ user, onLogout }: Props) {
  const { enabled, toggleEnabled, clickBeep } = useSound();
  const latest = inbodyData[inbodyData.length - 1];
  const first = inbodyData[0];

  const goalLabels = [
    { key: "goal", val: GOAL_LABELS[user.goal] },
    { key: "level", val: LEVEL_LABELS[user.activityLevel] },
    { key: "plan", val: MEMBERSHIP_LABELS[user.membershipType] },
  ];

  const TAG_COLORS = [
    "bg-[#fc2c19]/10 text-[#fc2c19] border-[#fc2c19]/20",
    "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
    "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20",
  ];

  return (
    <motion.div
      className="min-h-screen bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#fc2c19]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-5 pb-16 sm:px-6">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <Image
              src={logo}
              alt="Logo"
              width={240}
              height={240}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => {
                clickBeep();
                toggleEnabled();
              }}
              whileTap={{ scale: 0.9 }}
              className="text-[11px] text-[#444] hover:text-[#777] transition-colors px-2 py-1.5 rounded-lg border border-[#222] hover:border-[#333]"
            >
              {enabled ? "🔊" : "🔇"}
            </motion.button>
            <motion.button
              onClick={onLogout}
              whileTap={{ scale: 0.96 }}
              className="text-[11px] font-semibold text-[#444] hover:text-[#999] transition-colors px-3 py-1.5 rounded-xl border border-[#222] hover:border-[#333] tracking-wider uppercase"
            >
              Sign Out
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {/* Hero */}
          <motion.div
            variants={item}
            className="bg-[#111] border border-[#1e1e1e] rounded-3xl p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#555] font-semibold mb-1">
                  Welcome back
                </p>
                <h1 className="font-black text-3xl sm:text-4xl tracking-tight leading-none uppercase text-white">
                  {user.fullName}
                </h1>
                <p className="text-[11px] text-[#444] mt-1.5 tracking-wider font-medium">
                  ID {user.id} · {user.membershipId}
                </p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#fc2c19] rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl text-white shadow-[0_8px_24px_rgba(252,44,25,0.35)]">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              {goalLabels.map((g, i) => (
                <span
                  key={g.key}
                  className={`text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border ${TAG_COLORS[i]}`}
                >
                  {g.val}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={item} className="grid grid-cols-2 gap-3">
            <StatCard
              label="Weight"
              value={user.currentWeight}
              unit="kg"
              decimals={1}
              active
            />
            <StatCard
              label="Height"
              value={user.height}
              unit="cm"
              decimals={0}
              active
            />
          </motion.div>

          {/* Latest Scan */}
          <motion.div
            variants={item}
            className="bg-[#111] border border-[#1e1e1e] rounded-3xl p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#555] font-semibold mb-0.5">
                  Last InBody Scan
                </p>
                <p className="font-black text-lg text-white">{latest.date}</p>
              </div>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-[10px] font-black tracking-[0.12em] uppercase bg-[#fc2c19]/10 text-[#fc2c19] border border-[#fc2c19]/20 px-3 py-1.5 rounded-full"
              >
                Updated
              </motion.span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <StatCard
                label="Body Fat"
                value={latest.bodyFatPercentage}
                unit="%"
                decimals={1}
                highlight
                active
              />
              <StatCard
                label="Skeletal Muscle"
                value={latest.skeletalMuscleMass}
                unit="kg"
                decimals={1}
                highlight
                active
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="BMI" value={latest.bmi} decimals={1} active />
              <StatCard
                label="Visceral Fat"
                value={latest.visceralFatLevel}
                decimals={0}
                active
              />
              <StatCard
                label="BMR"
                value={latest.bmr}
                unit="kcal"
                decimals={0}
                active
              />
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            variants={item}
            className="bg-[#111] border border-[#1e1e1e] rounded-3xl p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-sm tracking-[0.1em] uppercase text-white">
                Progress Since Day 1
              </h3>
              <span className="text-[10px] text-[#444] font-semibold tracking-wider uppercase">
                {first.date.slice(0, 7)} →
              </span>
            </div>
            <div className="space-y-4">
              <ProgressBar
                label="Skeletal Muscle Mass"
                value={latest.skeletalMuscleMass}
                maxValue={50}
                unit=" kg"
                change={latest.skeletalMuscleMass - first.skeletalMuscleMass}
                changeUnit=" kg"
                color="green"
                delay={0.05}
              />
              <ProgressBar
                label="Body Fat %"
                value={latest.bodyFatPercentage}
                maxValue={30}
                unit="%"
                change={latest.bodyFatPercentage - first.bodyFatPercentage}
                changeUnit="%"
                color="amber"
                delay={0.1}
              />
              <ProgressBar
                label="BMR"
                value={latest.bmr}
                maxValue={2500}
                unit=" kcal"
                change={latest.bmr - first.bmr}
                changeUnit=" kcal"
                color="red"
                delay={0.15}
              />
              <ProgressBar
                label="Visceral Fat Level"
                value={latest.visceralFatLevel}
                maxValue={15}
                unit=""
                change={latest.visceralFatLevel - first.visceralFatLevel}
                color="amber"
                delay={0.2}
              />
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div variants={item}>
            <InBodyChart data={inbodyData} />
          </motion.div>

          {/* History */}
          <motion.div variants={item}>
            <InBodyHistory data={inbodyData} />
          </motion.div>

          {/* Member Info */}
          <motion.div
            variants={item}
            className="bg-[#111] border border-[#1e1e1e] rounded-3xl p-5 sm:p-6"
          >
            <h3 className="font-black text-sm tracking-[0.1em] uppercase text-white mb-4">
              Member Summary
            </h3>
            <div className="space-y-0 divide-y divide-[#181818]">
              {[
                { label: "Coach", value: user.coach },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Member Since", value: user.startDate },
                {
                  label: "Membership",
                  value: MEMBERSHIP_LABELS[user.membershipType],
                },
                {
                  label: "Emergency Contact",
                  value: user.emergencyContact.name,
                  sub: `${user.emergencyContact.relation} · ${user.emergencyContact.phone}`,
                },
                { label: "Notes", value: user.notes },
              ].map(({ label, value, sub }) => (
                <div
                  key={label}
                  className="py-3.5 flex items-start justify-between gap-4"
                >
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#444] font-semibold flex-shrink-0 pt-0.5">
                    {label}
                  </span>
                  <div className="text-right">
                    <span className="text-sm text-[#ccc] font-medium">
                      {value}
                    </span>
                    {sub && (
                      <p className="text-[11px] text-[#555] mt-0.5">{sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
