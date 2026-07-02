import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FadeIn } from "./motion";

export function FinalCtaSection() {
  return (
    <section id="cta" className="scroll-mt-24 px-5 py-20 sm:px-6 md:py-28 lg:px-8">
      <FadeIn className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand shadow-soft">
          <Sparkles className="size-5" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-4xl font-semibold leading-[1.02] text-foreground md:text-6xl">
          Make your next decision feel obvious.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Replace slow reporting cycles with a calm AI BI workspace that turns
          questions into shareable business clarity.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-blue hover:bg-primary/90 sm:w-auto"
          >
            <a href="mailto:hello@simplview.ai">
              Request access
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-full border-border bg-background px-6 text-sm font-semibold text-foreground shadow-soft hover:bg-surface-muted sm:w-auto"
          >
            <a href="#product">Replay product demo</a>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
