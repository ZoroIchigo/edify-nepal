import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const VerificationApproved = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col items-center justify-center px-5 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 animate-bounce">
        <Check size={40} className="text-primary" strokeWidth={3} />
      </div>
      <h1 className="text-xl font-extrabold text-foreground mb-2">Identity Verified!</h1>
      <p className="text-sm text-muted-foreground mb-6">
        You can now link your child's account.
      </p>
      <Button className="w-full" onClick={() => navigate("/link-child")}>
        Link Child's Account →
      </Button>
    </div>
  );
};

export default VerificationApproved;
