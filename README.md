# MASN3 ELFORMA Dashboard

A mobile-first gym performance dashboard built with Next.js 14 + TypeScript + Tailwind CSS + Framer Motion.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — page transitions, staggered reveals, spring animations
- **Recharts** — body composition area charts
- **next/font** — Barlow + Barlow Condensed (Google Fonts, self-hosted)

## Setup

```bash
# Install dependencies
npm install framer-motion recharts

# Run dev server
npm run dev
```

## Files Added / Modified

```
src/app/
├── page.tsx                    ← Main entry, AnimatePresence login/dashboard toggle
├── layout.tsx                  ← Barlow fonts, dark bg
├── globals.css                 ← Tailwind + scrollbar-none utility
├── data/
│   ├── user.ts                 ← User interface + getUserById() lookup
│   └── inbody.ts               ← 12 InBody measurement records
├── hooks/
│   ├── useSound.ts             ← Web Audio API beeps (success chime, error, click)
│   └── useCounter.ts           ← Animated number counting hook
└── components/
    ├── AnimatedNumber.tsx      ← Wraps useCounter for display
    ├── LoginScreen.tsx         ← Login with shake animation + sound
    ├── Dashboard.tsx           ← Full dashboard layout, mobile-first
    ├── StatCard.tsx            ← Reusable metric card
    ├── ProgressBar.tsx         ← Animated progress bar with delta tag
    ├── InBodyChart.tsx         ← Recharts area chart, 4 switchable metrics
    └── InBodyHistory.tsx       ← Full scan history table with deltas
```

## Member IDs (demo)

| ID    | Name          | Goal        |
|-------|---------------|-------------|
| 18020 | Ahmed Hassan  | Muscle Gain |
| 24301 | Sara Khaled   | Fat Loss    |

## UX Details

- **Mobile-first**: single-column layout up to sm (640px), max-w-2xl centered on desktop
- **Page transitions**: AnimatePresence with fade+slide between login and dashboard
- **Staggered reveals**: `staggerChildren` on dashboard mount (0.07s delay between sections)
- **Counter animations**: numbers count up from 0 on dashboard entry using rAF
- **Progress bars**: width animates in with spring easing
- **Chart switching**: AnimatePresence fade between chart datasets
- **Sound effects**: Web Audio API — success chime on login, error buzz on wrong ID, subtle click on interactions (toggle with 🔊/🔇 button)
- **Delta indicators**: History table shows color-coded +/- changes per measurement
