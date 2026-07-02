"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Upload,
  ArrowRight,
  MessageSquare,
  Sparkles,
  FileText,
  BarChart3,
  TrendingUp,
  Zap,
  Users,
  ArrowUpRight,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 18, stiffness: 100 },
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-full relative">
      {/* 🌿 Nature Background — Real Hill Texture Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top sky area */}
        <div className="absolute top-0 left-0 right-0 h-[45%] bg-white/80  to-transparent" />

        

        {/* Warm bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#e8e4d9]/60 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:py-16"
      >
        {/* 🚀 Header */}
        <motion.div variants={item} className="text-center mb-10 lg:mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight text-stone-900">
            Simplview{" "}
            <span className="font-serif italic text-[#0f8eea]]">Launchpad</span>
          </h1>
          <p className="text-base lg:text-lg text-stone-500 font-medium">
            Jump back in from where you left off
          </p>
        </motion.div>

        {/* 🔍 Search Bar — Glass over nature */}
        <motion.div variants={item} className="max-w-3xl mx-auto mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-[#0f8eea]]/10 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative flex items-center gap-3 px-5 lg:px-6 py-3.5 lg:py-4 bg-white/85 backdrop-blur-2xl rounded-full border border-white/80 shadow-2xl shadow-stone-200/40 hover:shadow-stone-300/50 transition-all duration-300">
              <Mic className="w-5 h-5 text-stone-400 flex-shrink-0 hover:text-[#0f8eea] transition-colors cursor-pointer" />
              <input
                type="text"
                placeholder="Ask Simplview to analyze trends"
                className="flex-1 bg-transparent outline-none text-stone-800 placeholder:text-stone-400 text-sm lg:text-base min-w-0"
              />
              <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
                <button className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-full text-stone-500 hover:text-[#0f8eea]] hover:bg-stone-100/80 transition-all text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload</span>
                </button>
                <div className="w-px h-5 bg-stone-200" />
                <button className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-full bg-[#f0f5ee] text-[#0f8eea]] hover:bg-[#e4efe0] transition-all text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-whie animate-pulse" />
                  <span>Sheets</span>
                </button>
                <motion.button
                  whileHover={{ scale: 1.08, x: 2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#0f8eea]] text-white flex items-center justify-center shadow-lg hover:bg-[#234820] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 🔗 Quick Links */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 lg:gap-4 text-sm text-stone-500 mb-12 lg:mb-16"
        >
          <button className="hover:text-[#0f8eea]] transition-colors font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50">
            <Sparkles className="w-4 h-4" />
            Start Analysis From Scratch
          </button>
          <span className="text-stone-300">•</span>
          <button className="hover:text-[#0f8eea]] transition-colors font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50">
            <FileText className="w-4 h-4" />
            Try a Template
          </button>
        </motion.div>

        {/* 📊 Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {/* 📗 Recent Smartbooks */}
          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded-full bg-[#4a8f3c]" />
              <h2 className="text-base lg:text-lg font-bold text-stone-800">
                Recent Smartbooks
              </h2>
            </div>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-[#4a8f3c]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
              <div className="relative p-5 lg:p-6 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/70 shadow-xl shadow-stone-200/20 hover:shadow-2xl hover:shadow-stone-300/30 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f0f5ee] flex items-center justify-center shadow-sm">
                      <MessageSquare className="w-6 h-6 text-[#0f8eea]]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-stone-800 group-hover:text-[#0f8eea]] transition-colors truncate">
                        show some cool trends
                      </h3>
                      <p className="text-sm text-stone-500 mt-0.5">
                        AI-powered analysis
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-stone-400 bg-stone-100/80 px-2.5 py-1 rounded-lg flex-shrink-0">
                    7/2/2026
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                        JS
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                        AR
                      </div>
                    </div>
                    <span className="text-xs text-stone-400">
                      2 collaborators
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-[#0f8eea]] opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 📘 Recent Published Dashboards */}
          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded-full bg-[#5b8db8]" />
              <h2 className="text-base lg:text-lg font-bold text-stone-800">
                Recent Published Dashboards
              </h2>
            </div>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-[#5b8db8]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
              <div className="relative p-6 lg:p-8 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/70 shadow-xl shadow-stone-200/20 hover:shadow-2xl hover:shadow-stone-300/30 transition-all duration-300">
                <div className="flex flex-col items-center justify-center text-center py-2">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-[#eef3f8] flex items-center justify-center mb-4 shadow-sm"
                  >
                    <BarChart3 className="w-8 h-8 text-[#5b8db8]" />
                  </motion.div>
                  <p className="text-stone-600 font-medium">
                    No dashboards published
                  </p>
                  <p className="text-sm text-stone-400 mt-1 max-w-[220px]">
                    Create and publish your first dashboard to share insights
                    with your team
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 px-6 py-2.5 rounded-xl bg-[#0f8eea]] text-white text-sm font-medium shadow-lg hover:bg-[#234820] transition-colors"
                  >
                    Create Dashboard
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ✨ Quick Access — Image 2 Card Style */}
        <motion.div variants={item} className="mt-10 lg:mt-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-[#c4953a]" />
            <h2 className="text-base lg:text-lg font-bold text-stone-800">
              Quick Access
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {[
              {
                icon: TrendingUp,
                title: "Trend Analysis",
                desc: "Real-time market insights and pattern detection",
                accent: "#0f8eea]",
                bg: "#f0f5ee",
              },
              {
                icon: Zap,
                title: "Quick Actions",
                desc: "Automated workflows to streamline daily tasks",
                accent: "#c4953a",
                bg: "#faf5e8",
              },
              {
                icon: Users,
                title: "Team Reports",
                desc: "Weekly summaries and collaborative dashboards",
                accent: "#5b8db8",
                bg: "#eef3f8",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative cursor-pointer"
              >
                <div
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-25 blur-md transition-all duration-500"
                  style={{ backgroundColor: card.accent }}
                />
                <div className="relative h-full p-5 lg:p-6 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/70 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: card.bg }}
                  >
                    <card.icon
                      className="w-5 h-5"
                      style={{ color: card.accent }}
                    />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {card.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: card.accent }}
                  >
                    Explore <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🏔️ Bottom Nature Accent — Hill curve visual */}
        <motion.div variants={item} className="mt-16 lg:mt-20 relative">
          <div className="relative rounded-3xl overflow-hidden bg-[#4a8f3c] p-8 lg:p-10">
            {/* Hill texture overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white font-serif italic mb-2">
                  Ready to dive deeper?
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Start a new analysis or explore templates to get insights
                  faster
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#0f8eea]] font-semibold shadow-lg hover:shadow-xl transition-shadow flex-shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                Start New Analysis
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
