import { ShieldCheck } from "lucide-react";

const TrustBanner = () => {
  return (
    <section className="px-5 py-4">
      <div className="border-l-4 border-primary bg-card rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={24} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground leading-relaxed">
              Your payment is protected. Funds are only released after lesson completion. Need help? Request a human callback anytime.
            </p>
            <button className="text-xs font-bold text-primary mt-2 hover:underline">
              Learn about our Satisfaction Guarantee →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
