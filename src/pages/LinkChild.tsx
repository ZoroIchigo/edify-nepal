import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LinkChild = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col items-center justify-center px-5 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-lg font-extrabold text-foreground mb-2">Request sent!</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your child will receive an email to confirm the link. They'll appear in your household once confirmed.
        </p>
        <Button variant="outline" className="w-full border-primary text-primary" onClick={() => navigate("/")}>
          Back to Home →
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
        <span className="text-lg font-extrabold text-foreground">Link Child's Account</span>
      </div>
      <div className="px-5 pt-6">
        <p className="text-sm text-muted-foreground mb-5">
          Enter your child's school or personal email address to send them a link request
        </p>
        <Input
          placeholder="Child's school or personal email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="rounded-full mb-2"
        />
        <p className="text-xs text-muted-foreground mb-6">
          Your child will receive an invitation to confirm the household link
        </p>
        <Button className="w-full" disabled={!email} onClick={() => setSent(true)}>
          Send Link Request →
        </Button>
      </div>
    </div>
  );
};

export default LinkChild;
