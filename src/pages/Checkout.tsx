import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

type BookingType = "single" | "package";
type PaymentMethod = "esewa" | "khalti" | "bank" | "pass";

const Checkout = () => {
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState<BookingType>("single");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("esewa");

  const isSingle = bookingType === "single";
  const tutorFee = isSingle ? 800 : 3600;
  const serviceFee = Math.round(tutorFee * 0.05);
  const total = tutorFee + serviceFee;

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-36">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="flex-1 text-center text-base font-extrabold text-foreground">Checkout</span>
        <div className="w-6" />
      </nav>

      {/* Tutor Summary */}
      <section className="px-5 pt-5 pb-3">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-extrabold text-lg flex-shrink-0">
              AS
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-foreground">Aaryav Sharma</h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                  <BadgeCheck size={14} /> ID Verified
                </span>
                <span className="text-xs text-muted-foreground">🎓 B.Sc. Physics, TU</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">Physics</span>
          </div>
          <p className="text-sm font-semibold text-foreground">Saturday, July 18 • 10:00 AM – 11:00 AM</p>
          <p className="text-xs text-muted-foreground mt-1">Online via Edify Meet</p>
        </div>
      </section>

      {/* Booking Type Selector */}
      <section className="px-5 py-3">
        <h2 className="text-base font-extrabold text-foreground mb-3">Choose your plan</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setBookingType("single")}
            className={`relative rounded-2xl p-4 text-left transition-all border-2 ${
              isSingle ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <span className="text-2xl">📅</span>
            <p className="text-sm font-bold text-foreground mt-2">Single Lesson</p>
            <p className="text-xs text-muted-foreground">One-time</p>
            <p className="text-base font-extrabold text-foreground mt-2">NPR 800</p>
          </button>
          <button
            onClick={() => setBookingType("package")}
            className={`relative rounded-2xl p-4 text-left transition-all border-2 ${
              !isSingle ? "border-secondary bg-secondary/5" : "border-border bg-card"
            }`}
          >
            <span className="absolute top-2 right-2 text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
              Save 10%
            </span>
            <span className="text-2xl">🎯</span>
            <p className="text-sm font-bold text-foreground mt-2">5-Lesson Package</p>
            <p className="text-xs text-muted-foreground">Best value</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-base font-extrabold text-foreground">NPR 3,600</span>
              <span className="text-xs text-muted-foreground line-through">NPR 4,000</span>
            </div>
          </button>
        </div>
      </section>

      {/* Price Breakdown */}
      <section className="px-5 py-3">
        <div className="bg-card rounded-2xl p-4">
          <h2 className="text-base font-extrabold text-foreground mb-3">Price Breakdown</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tutor Fee</span>
              <span className="font-semibold text-foreground">NPR {tutorFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee (5%)</span>
              <span className="font-semibold text-foreground">NPR {serviceFee}</span>
            </div>
            <div className="border-t border-border my-2" />
            <div className="flex justify-between">
              <span className="font-bold text-foreground text-base">Total</span>
              <span className="font-extrabold text-foreground text-lg">NPR {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Upsell */}
        <div className="mt-3 border-l-4 border-secondary bg-secondary/[0.08] rounded-2xl p-4 flex items-start gap-3">
          <Zap size={18} className="text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground leading-relaxed">
              Remove service fees forever — Upgrade to Student Pass for NPR 250/month
            </p>
            <button className="text-xs font-bold text-secondary mt-1 hover:underline">
              See Student Pass benefits →
            </button>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="px-5 py-3">
        <h2 className="text-base font-extrabold text-foreground mb-3">Pay with</h2>
        <div className="space-y-2">
          {([
            { key: "esewa" as const, label: "eSewa", initials: "eS", color: "bg-primary", subtitle: null },
            { key: "khalti" as const, label: "Khalti", initials: "Kh", color: "bg-secondary", subtitle: null },
            { key: "bank" as const, label: "Bank Transfer", initials: "🏦", color: "", subtitle: "2–3 hour confirmation" },
            { key: "pass" as const, label: "Student Pass", initials: "⭐", color: "", subtitle: "NPR 250/month • No service fees ever" },
          ]).map((m) => {
            const selected = paymentMethod === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setPaymentMethod(m.key)}
                className={`w-full flex items-center gap-3 rounded-2xl p-4 text-left transition-all border-2 ${
                  selected ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selected ? "border-primary" : "border-muted-foreground/40"
                    }`}
                  >
                    {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </div>
                {m.color ? (
                  <div className={`w-9 h-9 rounded-xl ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {m.initials}
                  </div>
                ) : (
                  <span className="text-xl w-9 text-center flex-shrink-0">{m.initials}</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{m.label}</p>
                  {m.subtitle && (
                    <p className="text-xs text-muted-foreground mt-0.5">{m.subtitle}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Escrow Trust Banner */}
      <section className="px-5 py-3">
        <div className="border-l-4 border-primary bg-primary/[0.06] rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-foreground leading-relaxed">
            Your NPR {total.toLocaleString()} is held safely in escrow and only released to the tutor after your lesson is complete.
          </p>
        </div>
      </section>

      {/* Confirm Button */}
      <div className="fixed bottom-14 left-0 right-0 z-40">
        <div className="max-w-[430px] mx-auto px-5 py-3 bg-background/95 backdrop-blur-sm border-t border-border">
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate("/booking-confirmed", { state: { total } })}
          >
            Confirm & Pay NPR {total.toLocaleString()} →
          </Button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            By confirming, you agree to Edify's Refund Policy
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Checkout;
