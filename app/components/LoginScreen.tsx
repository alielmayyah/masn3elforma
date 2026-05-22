"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useSound } from "../hooks/useSound";
import { getUserById } from "../data/user";
import type { User } from "../data/user";
import logo from "../assets/logo.jpg";
import Image from "next/image";
interface Props {
  onLogin: (user: User) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { successChime, errorBeep } = useSound();

  const handleSubmit = () => {
    const trimmed = id.trim();
    if (!trimmed) {
      setError("Please enter your member ID.");
      triggerShake();
      errorBeep();
      return;
    }
    const user = getUserById(trimmed);
    if (user) {
      setError("");
      successChime();
      onLogin(user);
    } else {
      setError("No member found. Try 18020 or 24301.");
      triggerShake();
      errorBeep();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <motion.div
      className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-5 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24, transition: { duration: 0.35 } }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#fc2c19]/8 blur-[120px]" />
      </div>

      {/* Logo */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={logo}
          alt="Logo"
          width={240}
          height={240}
          className="rounded-full"
        />
        <p className="mt-3 text-xs tracking-[0.3em] uppercase text-[#555] font-medium">
          Performance Dashboard
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="bg-[#111] border border-[#222] rounded-3xl p-7 shadow-2xl"
        >
          <label className="block text-[10px] tracking-[0.22em] uppercase text-[#555] font-semibold mb-3">
            Member ID
          </label>
          <input
            ref={inputRef}
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="e.g. 18020"
            className="w-full bg-[#181818] border border-[#2a2a2a] rounded-2xl px-4 py-4 text-white text-base placeholder:text-[#444] outline-none focus:border-[#fc2c19] focus:ring-2 focus:ring-[#fc2c19]/20 transition-all duration-200 font-medium tracking-wider"
          />

          <AnimatePresence>
            {error && (
              <motion.p
                key="err"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="text-[#ff6655] text-sm bg-[#fc2c19]/8 border border-[#fc2c19]/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleSubmit}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mt-5 w-full bg-[#fc2c19] rounded-2xl py-4 font-black text-sm tracking-[0.12em] uppercase text-white shadow-[0_8px_32px_rgba(252,44,25,0.35)] hover:bg-[#ff3f29] hover:shadow-[0_8px_40px_rgba(252,44,25,0.5)] transition-colors duration-150"
          >
            Access Dashboard
          </motion.button>

          <p className="mt-5 text-center text-[11px] text-[#444]">
            Try ID{" "}
            <button
              onClick={() => setId("18020")}
              className="text-[#666] underline underline-offset-2 hover:text-[#999] transition-colors"
            >
              18020
            </button>{" "}
            or{" "}
            <button
              onClick={() => setId("24301")}
              className="text-[#666] underline underline-offset-2 hover:text-[#999] transition-colors"
            >
              24301
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
