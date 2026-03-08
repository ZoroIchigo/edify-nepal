import { Search, CalendarCheck, Video } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: Search,
    title: "Find a Verified Tutor",
    desc: "Browse by subject, grade, or location. Every tutor is ID and credential verified.",
  },
  {
    num: 2,
    icon: CalendarCheck,
    title: "Book & Pay Safely",
    desc: "Pay via eSewa or Khalti. Funds held in escrow until your lesson is complete.",
  },
  {
    num: 3,
    icon: Video,
    title: "Learn & Review",
    desc: "Attend your lesson. Recording available. Rate your tutor after.",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-5 py-8">
      <h2 className="text-lg font-extrabold text-foreground mb-1">
        Simple. Safe. Transparent.
      </h2>
      <p className="text-sm text-muted-foreground mb-6">How Edify works</p>

      <div className="flex flex-col gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex gap-4 p-4 bg-card rounded-2xl"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground text-sm font-extrabold">{step.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <step.icon size={16} className="text-secondary" strokeWidth={2} />
                <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
