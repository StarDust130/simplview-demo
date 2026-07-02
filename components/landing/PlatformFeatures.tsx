"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Timer, LayoutDashboard, Sparkles } from "lucide-react";

const features = [
  {
    title: "Seamless Team Alignment",
    desc: "Empower cross-functional teams with clear task ownership, shared project visibility.",
    icon: Users,
    hasVisual: true,
    visualType: "avatars",
  },
  {
    title: "Daily Schedules Optimized By AI",
    desc: "Let intelligent algorithms map out your day based on high-priority deadlines, historical output.",
    icon: Calendar,
    hasVisual: true,
    visualType: "timeline",
  },
  {
    title: "Deep Work Tracker",
    desc: "Track focused work sessions and maintain productivity streaks across your team.",
    icon: Timer,
    hasVisual: true,
    visualType: "timer",
  },
  {
    title: "At-A-Glance Daily Overview",
    desc: "Get an instant visual health check of your team's current velocity, immediate bottlenecks.",
    icon: LayoutDashboard,
    hasVisual: true,
    visualType: "stats",
  },
  {
    title: "Meet Simplview AI",
    desc: "An intelligent AI layer that supports prioritization, and daily execution.",
    icon: Sparkles,
    hasVisual: true,
    visualType: "ai",
    isNew: true,
  },
];

export default function PlatformFeatures() {
  return (
    <section className="relative z-10 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-blue-600">The Platform</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Centralized{" "}
            <span className="font-serif italic font-normal">Workspaces</span>
            <br />
            <span className="font-serif italic font-normal">Master Your</span>{" "}
            Workflow.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            Track your operational efficiency with detailed productivity analytics, sprint trends, and intelligent to make scaling effortless.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {feature.desc}
                    </p>
                  </div>
                  {feature.isNew && (
                    <span className="shrink-0 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      NEW
                    </span>
                  )}
                </div>

                {/* Mini Visual */}
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  {feature.visualType === "avatars" && (
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-blue-400 to-blue-600 text-[10px] font-bold text-white shadow-sm"
                        >
                          {String.fromCharCode(64 + n)}
                        </div>
                      ))}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-bold text-slate-500">
                        +
                      </div>
                    </div>
                  )}
                  {feature.visualType === "timeline" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Market Timeline</span>
                        <span>AI-Powered Market Summary</span>
                      </div>
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-medium text-slate-700">NYSE Opening Bell</span>
                          <span className="ml-auto text-[9px] text-slate-400">09:30 - 11:00</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="text-[10px] font-medium text-slate-700">Crypto Portfolio Rebalance</span>
                          <span className="ml-auto text-[9px] text-slate-400">14:00 - 14:30</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {feature.visualType === "timer" && (
                    <div className="rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 p-4 text-center text-white">
                      <div className="flex items-center justify-center gap-1.5">
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Deep Work</span>
                      </div>
                      <p className="mt-2 text-2xl font-bold tabular-nums">01:24:08</p>
                    </div>
                  )}
                  {feature.visualType === "stats" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-blue-50 p-2.5 text-center">
                        <p className="text-[9px] font-medium text-blue-600">ROI Score</p>
                        <p className="text-lg font-bold text-blue-700">24%</p>
                      </div>
                      <div className="rounded-lg bg-slate-100 p-2.5 text-center">
                        <p className="text-[9px] font-medium text-slate-600">Active</p>
                        <p className="text-lg font-bold text-slate-800">5</p>
                      </div>
                    </div>
                  )}
                  {feature.visualType === "ai" && (
                    <div className="flex items-center justify-center">
                      <button className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-blue-500">
                        <Sparkles className="h-3.5 w-3.5" />
                        Ask Simplview AI
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
