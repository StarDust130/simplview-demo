import { BadgeCheck, BarChart3, Brain, MessageSquareText } from "lucide-react";

import { FadeIn, Stagger, MotionCard } from "./motion";

const showcaseHighlights = [
  {
    icon: MessageSquareText,
    label: "Ask",
    text: "Plain-English prompts for business teams.",
  },
  {
    icon: BarChart3,
    label: "Visualize",
    text: "Charts and dashboards appear in context.",
  },
  {
    icon: Brain,
    label: "Explain",
    text: "AI turns patterns into decision notes.",
  },
];

export function ProductVideoShowcase() {
  return (
    <section
      id="product"
      className="scroll-mt-24 px-5 pb-20 pt-12 sm:px-6 md:pb-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn className="relative mx-auto max-w-6xl">
          <div className="absolute inset-x-8 -top-8 h-24 rounded-full bg-blue-glow blur-3xl" />
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-showcase">
            <div className="flex h-10 items-center justify-between border-b border-border px-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-danger" />
                <span className="size-2.5 rounded-full bg-warning" />
                <span className="size-2.5 rounded-full bg-success" />
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:flex">
                <BadgeCheck className="size-3.5 text-brand" aria-hidden="true" />
                Live product demo
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                simplview.ai/demo
              </span>
            </div>

            <div className="overflow-hidden rounded-lg bg-surface-muted">
              <video
                className="aspect-video h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                controlsList="nodownload noplaybackrate"
                preload="metadata"
                aria-label="Simplview product demo showing AI business intelligence analysis"
              >
                <source src="/landing-page-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </FadeIn>

        <Stagger className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
          {showcaseHighlights.map((item) => (
            <MotionCard
              key={item.label}
              className="rounded-lg border border-border bg-background p-5 shadow-card"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-brand-soft text-brand">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
