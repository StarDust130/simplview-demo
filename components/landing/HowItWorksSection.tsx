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

// Reusable animated chart to bring static dashboards to life
function LiveChart({
  heights,
  className = "",
}: {
  heights: number[];
  className?: string;
}) {
  return (
    <div className={`flex items-end gap-1.5 w-full h-full ${className}`}>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: `${h}%` }}
          animate={{
            height: [
              `${h}%`,
              `${Math.max(15, h - 25)}%`,
              `${Math.min(100, h + 20)}%`,
              `${h}%`,
            ],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 via-cyan-400 to-green-300"
        />
      ))}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-white py-16 text-slate-950 md:scroll-mt-28 md:py-20"
    >
      <div className="absolute left-0 top-0 h-96 w-full bg-gradient-to-b from-sky-50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Fixed Grid: 12 Columns total, locked fractions */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text & Steps (5 Columns) */}
          <motion.div
            initial={{ x: -34, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black uppercase text-blue-600">
              How It Works
            </span>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              From question to{" "}
              <span className="font-serif italic font-semibold">insight</span>{" "}
              in 30 seconds
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-7 text-slate-600">
              Three steps. No SQL. No dashboards. No waiting for an analyst. Any
              manager on your team can do this from day one.
            </p>

            <div className="mt-10 space-y-4">
              {steps.map((step, index) => (
                <motion.article
                  key={step.num}
                  initial={{ y: 26, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:grid-cols-[4rem_1fr] cursor-default"
                >
                  <div className="flex items-start justify-between gap-3 sm:block">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-white transition-transform duration-300 group-hover:scale-105">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="mt-3 block text-[10px] font-black uppercase text-blue-600">
                      Step {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-black leading-tight text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] font-medium leading-relaxed text-slate-500">
                      {step.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Right Mock Dashboard (7 Columns) */}
          <motion.div
            initial={{ x: 34, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative lg:col-span-7"
          >
            <div className="absolute -inset-6 rounded-2xl bg-[url('/bg.gif')] bg-cover bg-center opacity-20 blur-md pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fbff] shadow-2xl">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-auto rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                  simplview.com
                </span>
              </div>

              {/* Dashboard Content */}
              <div className="grid gap-6 p-6 md:p-8">
                {/* Search / Question Bar */}
                <div className="rounded-xl bg-[#0A0D14] p-6 text-white shadow-md">
                  <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    Ask Simplview
                  </p>
                  <p className="mt-3 text-2xl font-black leading-tight tracking-tight md:text-3xl">
                    Why did Mumbai revenue drop last month?
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["SKU mix", "Distributor delay", "Forecast risk"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/10 border border-white/5 px-4 py-1.5 text-[11px] font-bold text-white/80"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Data & Trace Blocks */}
                <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
                  <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-black uppercase tracking-wide text-slate-900">
                        Revenue diagnostic
                      </p>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                        30 sec
                      </span>
                    </div>
                    {/* Integrated LiveChart replacing static heights */}
                    <div className="mt-8 flex h-40 items-end gap-2 w-full">
                      <LiveChart heights={[45, 65, 50, 85, 60, 95, 75, 90]} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-[13px] font-black uppercase tracking-wide text-slate-900">
                      Trace
                    </p>
                    <div className="mt-6 space-y-4">
                      {timeline.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15, duration: 0.4 }}
                          className="flex items-center gap-3 text-[13px] font-bold text-slate-600"
                        >
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
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

        {/* Features Section */}
        <div
          id="features"
          className="mt-24 grid gap-12 lg:grid-cols-12 lg:items-center"
        >
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
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl cursor-default"
              >
                <div className="mb-5 flex items-start justify-between">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-900 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-600">
                    <feature.icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>

                <div>
                  <h3 className="text-[15px] font-black leading-tight text-slate-900">
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
      </div>
    </section>
  );
}
