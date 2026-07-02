import { Database, MessageSquareText, Share2 } from "lucide-react";

import { SectionHeading } from "./section-heading";
import { Stagger, MotionCard } from "./motion";

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Bring your data into one view",
    text: "Simplview is shaped around connected business context, not scattered report fragments.",
  },
  {
    icon: MessageSquareText,
    step: "02",
    title: "Ask the question directly",
    text: "Use plain English to request the metric, trend, segment, or prediction you need.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share the decision brief",
    text: "Send a clear answer with charts, explanation, and recommended next steps together.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="workflow"
      className="scroll-mt-24 bg-surface-muted px-5 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How It Works"
          title="From scattered data to boardroom-ready answers."
          description="The workflow is intentionally quiet: connect context, ask the question, and let Simplview assemble the answer."
        />

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <MotionCard
              key={step.title}
              className="rounded-lg border border-border bg-background p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <step.icon className="size-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-sm font-semibold text-brand">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-8 font-heading text-xl font-semibold leading-7 text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {step.text}
              </p>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
