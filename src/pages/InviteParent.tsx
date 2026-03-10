import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const INVITE_URL = "https://edify.com.np/invite/abc123";

const InviteParent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Edify",
          text: "I've sent you an invite to link our accounts on Edify — Nepal's tutoring marketplace.",
          url: INVITE_URL,
        });
        setShared(true);
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_URL);
      toast({
        description: "✅ Link copied to clipboard",
        duration: 2000,
        className: "bg-foreground text-background rounded-full text-center",
      });
      setShared(true);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate("/account")} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
        <span className="text-lg font-extrabold text-foreground">Invite a Parent</span>
      </div>
      <div className="px-5 pt-6">
        <p className="text-sm text-muted-foreground mb-5">
          Share an invite link with your parent or guardian
        </p>

        {/* Info card */}
        <div className="rounded-xl bg-primary/[0.06] border-l-4 border-l-primary p-4 mb-6">
          <p className="text-sm font-bold text-foreground mb-2">Once linked, your parent can:</p>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-foreground">📚 Book lessons on your behalf</span>
            <span className="text-sm text-foreground">🎥 View your lesson recordings</span>
            <span className="text-sm text-foreground">💳 Manage payments centrally</span>
            <span className="text-sm text-foreground">🔔 Receive your booking notifications</span>
            <span className="text-sm text-foreground">🔒 Approve your tutor chat access</span>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex flex-col gap-3 mb-3">
          <Button className="w-full" onClick={handleShare}>
            🔗 Share Invitation Link
          </Button>
          <Button variant="outline" className="w-full border-primary text-primary" onClick={handleCopy}>
            📋 Copy Invitation Link
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mb-5">
          Invite link expires in 48 hours
        </p>

        {/* After sharing confirmation */}
        {shared && (
          <div className="text-center pt-2">
            <p className="text-sm font-bold text-primary mb-1">✅ Invite shared!</p>
            <p className="text-xs text-muted-foreground mb-3">
              Remind your parent to use the link within 48 hours.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="text-sm font-bold text-secondary">Resend Invite</button>
              <button className="text-sm font-bold text-muted-foreground">Cancel Invite</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteParent;
