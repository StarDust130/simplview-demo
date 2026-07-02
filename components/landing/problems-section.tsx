import { AlertCircle, Clock3, FileQuestion, Layers3 } from "lucide-react";

import { SectionHeading } from "./section-heading";
import { Stagger, MotionCard } from "./motion";

const problems = [
  {
    icon: Clock3,
    title: "Reports arrive after the moment has passed",
    text: "Teams wait on dashboards while decisions keep moving.",
  },
  {
    icon: Layers3,
    title: "Metrics live in too many places",
    text: "Spreadsheets, SaaS tools, and dashboards tell different stories.",
  },
  {
    icon: FileQuestion,
    title: "Charts still need interpretation",
    text: "A graph without context leaves leaders asking what changed and why.",
  },
  {
    icon: AlertCircle,
    title: "Ad hoc requests bury analysts",
    text: "High-value data teams become ticket queues for basic questions.",
  },
];

export function ProblemsSection() {
  return (
    <section
      id="problems"
      className="scroll-mt-24 px-5 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Problems"
          title="Business intelligence should not feel like a waiting room."
          description="Simplview is designed for the daily friction between fast questions and slow reporting workflows."
        />

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
          {problems.map((problem) => (
            <MotionCard
              key={problem.title}
              className="rounded-lg border border-border bg-background p-6 shadow-card"
            >
              <div className="mb-6 flex size-11 items-center justify-center rounded-md bg-danger/10 text-danger">
                <problem.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-xl font-semibold leading-7 text-foreground">
                {problem.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {problem.text}
              </p>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
