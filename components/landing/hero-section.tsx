import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FadeIn } from "./motion";

export function HeroSection() {
  return (
    <section className="landing-hero-bg overflow-hidden px-5 pt-20 sm:px-6 md:pt-24 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-medium text-brand-foreground shadow-soft">
            <Sparkles className="size-4 text-brand" aria-hidden="true" />
            Ask your business data in plain English
          </div>
        </FadeIn>

        <FadeIn delay={0.06} className="mt-7">
          <h1 className="font-heading text-5xl font-semibold leading-[0.98] text-foreground sm:text-6xl md:text-7xl">
            Turn every business question into a clear decision.
          </h1>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            Simplview gives teams AI-generated charts, dashboards, predictions,
            and executive-ready explanations from the same calm BI workspace.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-blue hover:bg-primary/90 sm:w-auto"
            >
              <a href="#cta">
                Start free analysis
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-border bg-background px-6 text-sm font-semibold text-foreground shadow-soft hover:bg-surface-muted sm:w-auto"
            >
              <a href="#product">
                <Play className="size-4 fill-current" aria-hidden="true" />
                Watch demo
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
