import {
  BadgeCheck,
  Brain,
  ChartLine,
  Gauge,
  Sparkles,
  Workflow,
} from "lucide-react";

import { SectionHeading } from "./section-heading";
import { Stagger, MotionCard } from "./motion";

const reasons = [
  {
    icon: Brain,
    title: "AI analyst layer",
    text: "Questions become structured analysis instead of another dashboard search.",
  },
  {
    icon: ChartLine,
    title: "Predictive context",
    text: "Trends and forecasts sit beside the chart so teams can see what is changing.",
  },
  {
    icon: Sparkles,
    title: "Executive explanations",
    text: "Every answer is written for clarity, not for people who live in SQL all day.",
  },
  {
    icon: Workflow,
    title: "Reusable decision flow",
    text: "Answers can become dashboards, follow-ups, and shared views without losing context.",
  },
];

export function WhySimplviewSection() {
  return (
    <section
      id="why"
      className="scroll-mt-24 px-5 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Why Simplview"
            title="Built for leaders who need answers, not another analytics maze."
            description="Simplview keeps the interface calm while doing the heavy analytical work behind each response."
            align="left"
          />

          <div className="mt-8 flex flex-col gap-3 text-sm font-medium text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-soft">
              <BadgeCheck className="size-4 text-success" aria-hidden="true" />
              Human-readable answers
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-soft">
              <Gauge className="size-4 text-brand" aria-hidden="true" />
              Fast insight loops
            </div>
          </div>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <MotionCard
              key={reason.title}
              className="rounded-lg border border-border bg-background p-6 shadow-card"
            >
              <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-brand-soft text-brand">
                <reason.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-xl font-semibold leading-7 text-foreground">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {reason.text}
              </p>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
