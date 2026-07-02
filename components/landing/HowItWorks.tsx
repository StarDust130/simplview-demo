"use client";

import { motion } from "framer-motion";
import { Plug, MessageSquare, Brain } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Connect your data sources in minutes",
    desc: "Simplview connects to your ERP, CRM, POS, SQL databases, or spreadsheets. One admin setup — your entire team gets instant, unified access to all your data.",
    icon: Plug,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    num: "02",
    title: "Ask business questions in natural language",
    desc: 'Any manager types a question — "Which SKUs are declining?" or "Why did Mumbai revenue drop last month?" — and gets an instant visual answer. No training required.',
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    num: "03",
    title: "Get what, why, and what's next",
    desc: "Simplview doesn't just show charts — it explains why the trend happened and predicts what comes next. Descriptive, diagnostic, and predictive AI in one workspace.",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    textColor: "text-violet-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            From question to insight{" "}
            <span className="font-serif italic font-normal">in 30 seconds</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            Three steps. No SQL. No dashboards. No waiting for an analyst. Any manager on your team can do this from day one.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="absolute top-16 left-1/2 hidden h-[calc(100%-8rem)] w-px -translate-x-1/2 bg-slate-200 md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex flex-col items-center gap-6 md:flex-row md:gap-12 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-flex items-center gap-2 rounded-full ${step.bgColor} px-3 py-1 mb-3`}>
                      <span className={`text-xs font-bold ${step.textColor}`}>{step.num}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {step.desc}
                    </p>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg shadow-blue-900/10" style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}>
                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${step.color} opacity-100`} />
                    <Icon className="relative z-10 h-7 w-7 text-white" />
                  </div>

                  {/* Spacer for layout */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
