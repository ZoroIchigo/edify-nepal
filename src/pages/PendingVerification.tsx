import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PendingVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col items-center justify-center px-5 text-center">
      <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mb-5">
        <span className="text-5xl">⏳</span>
      </div>
      <h1 className="text-xl font-extrabold text-foreground mb-2">Verification Under Review</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Your account is being reviewed. This takes up to 24 hours. We'll notify you once approved.
      </p>
      <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-xs font-bold mb-6">
        Pending Verification
      </span>

      <div className="w-full rounded-xl border-l-4 border-l-warning p-4 mb-6" style={{ backgroundColor: "rgba(245, 158, 11, 0.08)" }}>
        <p className="text-sm text-foreground text-left">
          While you wait, you can browse tutors freely. Your household dashboard unlocks once verified.
        </p>
      </div>

      <Button variant="outline" className="w-full border-primary text-primary" onClick={() => navigate("/")}>
        Continue Browsing →
      </Button>
    </div>
  );
};

export default PendingVerification;
