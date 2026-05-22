"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import type { User } from "./data/user";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AnimatePresence mode="wait">
      {user ? (
        <Dashboard key="dashboard" user={user} onLogout={() => setUser(null)} />
      ) : (
        <LoginScreen key="login" onLogin={(u) => setUser(u)} />
      )}
    </AnimatePresence>
  );
}
