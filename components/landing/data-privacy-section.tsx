import { EyeOff, KeyRound, LockKeyhole, Server, ShieldCheck } from "lucide-react";

import { SectionHeading } from "./section-heading";
import { FadeIn, Stagger, MotionCard } from "./motion";

const privacyItems = [
  {
    icon: LockKeyhole,
    title: "Controlled access",
    text: "Keep answers aligned with the roles and permissions your teams already trust.",
  },
  {
    icon: EyeOff,
    title: "Private analysis by design",
    text: "The product experience is shaped to keep sensitive business context protected.",
  },
  {
    icon: Server,
    title: "Secure data connections",
    text: "Designed for the controls modern BI teams expect around connected sources.",
  },
  {
    icon: KeyRound,
    title: "Audit-friendly workflows",
    text: "Decision context stays attached to the question, chart, and explanation.",
  },
];

export function DataPrivacySection() {
  return (
    <section
      id="privacy"
      className="scroll-mt-24 border-y border-border bg-brand-soft px-5 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Data Privacy"
              title="Your business data deserves more than a chatbot wrapper."
              description="Simplview is presented as a governed BI experience, with privacy and decision traceability treated as product fundamentals."
              align="left"
            />

            <FadeIn delay={0.12} className="mt-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold text-brand-foreground shadow-soft">
                <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
                Enterprise-minded from day one
              </div>
            </FadeIn>
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {privacyItems.map((item) => (
              <MotionCard
                key={item.title}
                className="rounded-lg border border-border/70 bg-background/90 p-6 shadow-card"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-brand-soft text-brand">
                  <item.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold leading-7 text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </MotionCard>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
