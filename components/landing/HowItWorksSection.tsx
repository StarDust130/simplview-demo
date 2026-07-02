"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Check,
  LineChart,
  MessageSquare,
  Plug,
  Puzzle,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Step = {
  num: string;
  icon: LucideIcon;
  media: string;
  title: string;
  desc: string;
};

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    num: "01",
    icon: Plug,
    media: "Database connectors icon.jpg",
    title: "Connect your data sources in minutes",
    desc: "Simplview connects to your ERP, CRM, POS, SQL databases, or spreadsheets. One admin setup - your entire team gets instant, unified access to all your data.",
  },
  {
    num: "02",
    icon: MessageSquare,
    media: "Gradient Speech Bubble Icon",
    title: "Ask business questions in natural language",
    desc: 'Any manager types a question - "Which SKUs are declining?" or "Why did Mumbai revenue drop last month?" - and gets an instant visual answer. No training required.',
  },
  {
    num: "03",
    icon: LineChart,
    media: "Data Analysis Cards",
    title: "Get what, why, and what's next",
    desc: "Simplview doesn't just show charts - it explains why the trend happened and predicts what comes next. Descriptive, diagnostic, and predictive AI in one workspace.",
  },
];

const features: Feature[] = [
  {
    icon: Zap,
    title: "Zero training for any user",
    desc: "No SQL, no dashboard building, no analyst required. Any manager gets answers in 30 seconds from day one",
  },
  {
    icon: Brain,
    title: "What, why & predict - all in one",
    desc: "Goes beyond dashboards. Explains why trends happened and forecasts what comes next. Not just historical charts",
  },
  {
    icon: Puzzle,
    title: "Plug-and-play multi-source connectivity",
    desc: "Connects to ERP, CRM, POS, distributor systems in minutes. One admin setup, all users benefit immediately",
  },
  {
    icon: Settings,
    title: "Your business rule layer",
    desc: "Admin defines how the AI understands your business terminology, KPIs, and data relationships. No guesswork",
  },
];

const timeline = [
  "Question received",
  "Business rules matched",
  "SQL generated",
  "Insight explained",
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-white py-16 text-slate-950 md:scroll-mt-28 md:py-20"
    >
      <div className="absolute left-0 top-0 h-96 w-full bg-linear-to-b from-sky-50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ x: -34, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black uppercase text-blue-600">
              How It Works
            </span>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              From question to{" "}
              <span className="font-serif italic font-semibold">insight</span>{" "}
              in 30 seconds
            </h2>
            <p className="mt-5 max-w-lg text-base font-medium leading-7 text-slate-600">
              Three steps. No SQL. No dashboards. No waiting for an analyst. Any
              manager on your team can do this from day one.
            </p>

            <div className="mt-9 space-y-3">
              {steps.map((step, index) => (
                <motion.article
                  key={step.num}
                  initial={{ y: 26, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_55px_rgba(37,99,235,0.11)] sm:grid-cols-[4rem_1fr]"
                >
                  <div className="flex items-start justify-between gap-3 sm:block">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white transition-transform duration-300 group-hover:rotate-3">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="mt-3 block text-xs font-black text-blue-600">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase text-slate-400">
                      {step.media}
                    </p>
                    <h3 className="mt-1 text-lg font-black leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 34, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-lg bg-[url('/bg.png')] bg-cover bg-center opacity-20 blur-sm" />
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-[#f8fbff] shadow-[0_35px_95px_rgba(15,23,42,0.16)]">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-500">
                  simplview.ai/live
                </span>
              </div>

              <div className="grid gap-5 p-5 md:p-7">
                <div className="rounded-lg bg-slate-950 p-5 text-white">
                  <p className="text-[11px] font-black uppercase text-sky-300">
                    Ask Simplview
                  </p>
                  <p className="mt-3 text-2xl font-black leading-tight">
                    Why did Mumbai revenue drop last month?
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["SKU mix", "Distributor delay", "Forecast risk"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_0.72fr]">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black">Revenue diagnostic</p>
                      <span className="text-xs font-black text-emerald-600">
                        30 sec
                      </span>
                    </div>
                    <div className="mt-5 flex h-40 items-end gap-2">
                      {[54, 88, 64, 104, 78, 132, 94, 116].map(
                        (height, index) => (
                          <motion.span
                            key={`${height}-${index}`}
                            initial={{ height: 20 }}
                            whileInView={{ height }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.04 }}
                            className="w-full rounded-sm bg-linear-to-t from-blue-700 via-sky-400 to-lime-300"
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black">Trace</p>
                    <div className="mt-4 space-y-3">
                      {timeline.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0.3, x: 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.45 }}
                          className="flex items-center gap-2 text-xs font-bold text-slate-600"
                        >
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-3 w-3" />
                          </span>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column (5 of 12 columns) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold tracking-wide uppercase text-emerald-700">
              Why Simplview wins
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-6xl text-slate-900">
              Built for business teams,{" "}
              <span className="font-serif italic font-medium text-slate-800">
                not data teams
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-medium leading-relaxed text-slate-600">
              Every other BI tool was built for analysts. Simplview is the first
              one built for the people who actually need the answers.
            </p>
          </motion.div>

          {/* Right Column (7 of 12 columns) */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                // Removed Framer Motion whileHover. Handled entirely via optimized Tailwind transitions.
                // Pure bg-white ensures the card pops against the section background.
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] cursor-default"
              >
                <div className="mb-5 flex items-start justify-between">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                    <feature.icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>

                <div>
                  <h3 className="text-base font-bold leading-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium leading-relaxed text-slate-500">
                    {feature.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          id="pricing"
          className="mt-16 scroll-mt-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-[0_35px_110px_rgba(15,23,42,0.25)] md:scroll-mt-28"
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-[1fr_0.78fr]">
            <div className="relative min-h-[25rem] overflow-hidden p-6 md:p-9">
              <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center opacity-[0.24]" />
              <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-950/[0.86] to-blue-950/[0.72]" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-lime-300 px-3 py-1 text-[11px] font-black uppercase text-slate-950">
                  Free for now
                </span>
                <h2 className="mt-6 max-w-xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
                  AI-powered Data Team{" "}
                  <span className="font-serif italic font-semibold">
                    Start for free.
                  </span>
                </h2>
                <p className="mt-5 max-w-lg text-base font-semibold leading-7 text-white/[0.72]">
                  Start for free with Simplview&apos;s AI-powered Data Analysis.
                  Unlock insights and enhance efficiency - no strings attached.
                  Elevate your data game today!
                </p>
              </div>

              <div className="relative mt-9 grid max-w-xl grid-cols-3 gap-2">
                {["Upload", "Ask", "Chart"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ y: 12, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-3 text-center text-xs font-black uppercase text-white/[0.75]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-[#06101f] p-5 text-white md:p-7">
              <div className="relative h-full overflow-hidden rounded-lg border border-white/[0.14] bg-white/[0.08] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-lime-300 via-sky-300 to-blue-500" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase text-lime-300">
                      Free Plan
                    </p>
                    <h3 className="mt-2 text-2xl font-black">Free</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black tracking-tight">$00</p>
                    <p className="text-xs font-bold text-white/[0.45]">
                      for now
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm font-semibold leading-6 text-white/[0.68]">
                  Start for free with Simplview&apos;s AI-powered Data Analysis.
                  Unlock insights and enhance efficiency - no strings attached.
                </p>

                <div className="mt-6 rounded-lg border border-white/[0.12] bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase text-sky-200">
                      Included this month
                    </p>
                    <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-black text-white/[0.72]">
                      0 / 15 used
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1">
                    {Array.from({ length: 15 }).map((_, index) => (
                      <motion.span
                        key={index}
                        initial={{ scaleY: 0.35, opacity: 0.35 }}
                        whileInView={{ scaleY: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.025, duration: 0.35 }}
                        className="h-10 origin-bottom rounded-sm bg-linear-to-t from-blue-600 to-lime-300"
                      />
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-black text-slate-950 shadow-xl shadow-lime-950/20 transition-all hover:-translate-y-0.5 hover:bg-lime-200 active:scale-95"
                >
                  Buy Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="mt-6 space-y-3">
                  {[
                    "15 Charts / month",
                    "Csv/ Excel Upload",
                    "Google Sheets Connectivity",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.12] bg-white/[0.08] px-4 py-3 text-sm font-black text-white/[0.82]"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-300 text-slate-950">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
