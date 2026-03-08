import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const total = (location.state as any)?.total ?? 840;

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-16 pb-8">
        {/* Animated checkmark */}
        <div className="animate-pulse mb-6">
          <CheckCircle2 size={72} className="text-primary" strokeWidth={1.8} />
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Your payment of NPR {total.toLocaleString()} is held in escrow.
        </p>

        {/* Lesson summary */}
        <div className="w-full bg-card rounded-2xl p-5 mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tutor</span>
              <span className="font-bold text-foreground">Aaryav Sharma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subject</span>
              <span className="font-bold text-foreground">Physics</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="font-bold text-foreground">Sat, July 18 • 10:00 AM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="px-3 py-1 rounded-full bg-warning/15 text-warning text-xs font-bold">
                ⏳ Awaiting Tutor Confirmation
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mb-8 leading-relaxed">
          Aaryav typically confirms within 2 hours.{"\n"}You'll get notified on Inbox.
        </p>

        <div className="w-full space-y-3">
          <Button className="w-full" size="lg" onClick={() => navigate("/")}>
            View My Lessons →
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>

        <button
          className="mt-6 text-xs font-bold text-secondary hover:underline"
          onClick={() => {}}
        >
          Need help? Request a human callback →
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default BookingConfirmed;
