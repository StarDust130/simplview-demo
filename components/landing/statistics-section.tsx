import { FadeIn, Stagger, MotionCard } from "./motion";

const stats = [
  {
    value: "1",
    label: "question",
    text: "Start analysis with the language your team already uses.",
  },
  {
    value: "0",
    label: "SQL required",
    text: "Business users can explore without waiting for a report queue.",
  },
  {
    value: "4",
    label: "AI outputs",
    text: "Charts, dashboards, predictions, and explanations in one flow.",
  },
  {
    value: "1",
    label: "decision view",
    text: "Keep the answer, context, and next action together.",
  },
];

export function StatisticsSection() {
  return (
    <section
      id="statistics"
      className="border-y border-border bg-surface-muted px-5 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold text-brand">Statistics</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.05] text-foreground md:text-5xl">
            A simpler way to move from data to direction.
          </h2>
        </FadeIn>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <MotionCard
              key={`${stat.value}-${stat.label}`}
              className="rounded-lg border border-border bg-background p-6 shadow-card"
            >
              <div className="font-heading text-5xl font-semibold text-brand">
                {stat.value}
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {stat.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {stat.text}
              </p>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
