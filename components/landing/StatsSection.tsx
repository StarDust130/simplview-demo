"use client";

import { motion, useInView } from "framer-motion";
import {
  BarChart2,
  Clock,
  Cloud,
  Database,
  DollarSign,
  EyeOff,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type Problem = {
  num: string;
  icon: LucideIcon;
  title: string;
  visual: string;
  desc: string;
  quote: string;
};

const metrics: Metric[] = [
  {
    value: "3 Days",
    label: "saved per report request",
    detail: "answers in 30 seconds",
  },
  {
    value: "$20K+",
    label: "saved vs Traditional BI setup costs",
    detail: "setup costs avoided",
  },
  {
    value: "$80K+",
    label: "in analyst costs automated per year",
    detail: "lean teams move faster",
  },
  {
    value: "10+",
    label: "industry verticals",
    detail: "D2C, BFSI, manufacturing & more",
  },
];

const problems: Problem[] = [
  {
    num: "01",
    icon: Clock,
    title: "Waiting days for a single report",
    visual: "30 sec answer path",
    desc: "Your analyst is backed up. Decisions wait. Opportunities pass. A 3-day turnaround for one data question is the norm - but it doesn't have to be.",
    quote: "Our analyst is always backed up",
  },
  {
    num: "02",
    icon: EyeOff,
    title: "Can't read your own dashboards",
    visual: "Minimalist Pie Chart",
    desc: "Traditional BI dashboards sits mostly unused because your team needed training they never got. You're paying for software your managers can't operate.",
    quote: "I can't read the dashboards myself",
  },
  {
    num: "03",
    icon: Database,
    title: "Data exists in 5 different systems",
    visual: "Cloud data connection",
    desc: "SAP, ERP, CRM, POS, spreadsheets - no unified view without a specialist doing manual joins that take days and break every time something changes.",
    quote: "We have data in 5+ systems",
  },
  {
    num: "04",
    icon: DollarSign,
    title: "Expensive analyst dependency",
    visual: "Dollar Sign Road Sign",
    desc: "Your analyst is backed up. Decisions wait. Opportunities pass. A 3-day turnaround for one data question is the norm - but it doesn't have to be.",
    quote: "We can't afford a full BI team",
  },
  {
    num: "05",
    icon: TrendingDown,
    title: "Trends seen too late to act",
    visual: "Blue Bar Graph Icon",
    desc: "Inventory drift, distributor slippage, SKU decline - you find out after it's already too late to change course. By the time you see it, it's over.",
    quote: "By the time we see the trend, it's over",
  },
  {
    num: "06",
    icon: BarChart2,
    title: "Static dashboards, stale data",
    visual: "Blue Geometric Icon",
    desc: "Most BI tools show yesterday's numbers with no conversational layer and no predictions. You see what happened - but not why, and not what comes next.",
    quote: "Our Power BI just shows old data",
  },
];

// Reusable continuous animation chart mimicking real-time data
function LiveChart({
  heights,
  className = "",
}: {
  heights: number[];
  className?: string;
}) {
  return (
    <div className={`flex items-end gap-2 w-full h-full ${className}`}>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: `${h}%` }}
          // Oscillates between base height, slightly lower, slightly higher, and back
          animate={{
            height: [
              `${h}%`,
              `${Math.max(20, h - 15)}%`,
              `${Math.min(100, h + 15)}%`,
              `${h}%`,
            ],
          }}
          transition={{
            duration: 3 + (i % 2), // Creates organic offset in the timing
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 via-cyan-400 to-green-300 shadow-sm"
        />
      ))}
    </div>
  );
}

function AnimatedMetric({ value, active }: { value: string; active: boolean }) {
  const [display, setDisplay] = useState(value.replace(/[0-9]/g, "0"));

  useEffect(() => {
    if (!active) return;
    const number = Number(value.match(/\d+/)?.[0] ?? 0);
    const prefix = value.split(/\d+/)[0] ?? "";
    const suffix = value.replace(prefix, "").replace(String(number), "");
    const start = performance.now();
    const duration = 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${Math.round(number * eased)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, value]);

  return <span>{display}</span>;
}

function MiniSignal({
  label,
  dark = false,
  isWide = false,
}: {
  label: string;
  dark?: boolean;
  isWide?: boolean;
}) {
  const isChart =
    label.includes("Chart") ||
    label.includes("Graph") ||
    label.includes("Geometric");

  if (isChart) {
    return (
      <div
        className={`mt-5 flex items-end gap-2 rounded-xl border p-4 ${
          dark
            ? "border-white/10 bg-white/5"
            : "border-slate-200/50 bg-slate-50/50"
        } ${isWide ? "h-32 w-full max-w-sm ml-auto" : "h-28 w-full"}`}
      >
        <LiveChart heights={[45, 80, 55, 95, 70, 85]} />
      </div>
    );
  }

  return (
    <div
      className={`mt-5 flex items-center justify-between rounded-xl border px-5 py-4 ${
        dark
          ? "border-white/10 bg-white/5 text-white"
          : "border-slate-200/50 bg-slate-50/50 text-slate-700"
      }`}
    >
      <span className="text-xs font-black uppercase tracking-widest">
        {label}
      </span>
      <Cloud
        className={dark ? "h-5 w-5 text-cyan-400" : "h-5 w-5 text-blue-600"}
      />
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="problems"
      ref={ref}
      className="relative z-10 overflow-hidden bg-[#F3F1EA] py-24 text-slate-950"
    >
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[url('/bg.gif')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3F1EA]/50 via-[#F3F1EA] to-[#F3F1EA] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-white/5 bg-[#0A0D14] p-3 shadow-2xl"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.value}
                className="relative overflow-hidden rounded-xl bg-white/5 p-6 text-white border border-white/5"
              >
                <span className="absolute right-5 top-5 text-[10px] font-black tracking-widest text-white/20">
                  0{index + 1}
                </span>
                <p className="text-3xl font-black tracking-tight md:text-4xl">
                  <AnimatedMetric value={metric.value} active={inView} />
                </p>
                <p className="mt-3 text-sm font-bold leading-snug text-white/90">
                  {metric.label}
                </p>
                <p className="mt-1 text-xs font-semibold text-cyan-400">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div
            initial={{ x: -24, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex rounded-full border border-blue-200/60 bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
              Does this sound familiar?
            </span>
            <h2 className="mt-6 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-6xl text-slate-900">
              The problems your business{" "}
              <span className="font-serif italic font-medium text-slate-600">
                team faces
              </span>{" "}
              every week
            </h2>
          </motion.div>

          <motion.p
            initial={{ x: 24, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md text-base font-medium leading-relaxed text-slate-600 lg:justify-self-end lg:pb-3"
          >
            You have data. You have decisions to make. But getting from one to
            the other takes days.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => {
            const isHero = index === 0;
            const isBlue = index === 2;
            const isWide = index === 5;
            const isDark = isHero || index === 4 || index === 5;

            return (
              <motion.article
                key={problem.num}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default ${
                  isHero
                    ? "md:col-span-1 lg:col-span-1 lg:row-span-2"
                    : isWide
                      ? "md:col-span-2 lg:col-span-3"
                      : "md:col-span-1 lg:col-span-1"
                } ${
                  isHero
                    ? "bg-[#0A0D14] text-white border-slate-800"
                    : isBlue
                      ? "bg-blue-600 text-white border-blue-500"
                      : isDark
                        ? "bg-[#0A0D14] text-white border-slate-800"
                        : "border-slate-200/60 bg-white text-slate-900"
                }`}
              >
                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 ${
                      isDark || isBlue
                        ? "bg-white text-slate-950"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    <problem.icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      isDark || isBlue ? "text-white/40" : "text-slate-300"
                    }`}
                  >
                    Problem {problem.num}
                  </span>
                </div>

                <div
                  className={`relative flex flex-1 flex-col ${isWide ? "lg:flex-row lg:items-center lg:justify-between lg:gap-12" : ""}`}
                >
                  <div
                    className={`mt-6 ${isWide ? "lg:max-w-md lg:mt-4" : ""}`}
                  >
                    <h3
                      className={`${isHero ? "text-3xl lg:text-4xl" : "text-xl"} font-black leading-tight tracking-tight`}
                    >
                      {problem.title}
                    </h3>
                    <p
                      className={`mt-4 text-[14px] font-medium leading-relaxed ${
                        isDark || isBlue ? "text-white/70" : "text-slate-500"
                      }`}
                    >
                      {problem.desc}
                    </p>
                  </div>

                  <div
                    className={`flex flex-col flex-1 ${isWide ? "lg:w-1/2 lg:flex-none" : "mt-auto pt-6"}`}
                  >
                    {/* Hero Chart: Added flex-1 and min-h to absorb the empty space */}
                    {isHero && (
                      <div className="relative mt-8 flex flex-1 flex-col rounded-xl border border-white/10 bg-white/5 p-5 min-h-[200px]">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                            Report queue
                          </p>
                          <span className="rounded-full bg-green-300 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-950 shadow-sm">
                            30 sec
                          </span>
                        </div>
                        <div className="mt-8 flex flex-1 items-end gap-2 w-full">
                          <LiveChart heights={[35, 75, 50, 95, 65, 100, 80]} />
                        </div>
                      </div>
                    )}

                    {!isHero && (
                      <div className="mt-auto">
                        <MiniSignal
                          label={problem.visual}
                          dark={isDark || isBlue}
                          isWide={isWide}
                        />
                      </div>
                    )}

                    <p
                      className={`border-t pt-5 text-sm font-semibold italic ${
                        isWide ? "mt-6" : "mt-6"
                      } ${
                        isDark || isBlue
                          ? "border-white/10 text-white/50"
                          : "border-slate-100 text-slate-400"
                      }`}
                    >
                      &quot;{problem.quote}&quot;
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
