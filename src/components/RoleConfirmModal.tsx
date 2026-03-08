import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RoleConfirmModalProps {
  open: boolean;
  onClose: () => void;
  role: string;
}

const RoleConfirmModal = ({ open, onClose, role }: RoleConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Bottom sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              Welcome, {role}!
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Let's get you started.
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <Button size="lg" className="w-full">
            Create Account
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            Log In
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Are you a Parent managing a child's account?{" "}
          <button onClick={onClose} className="font-bold text-primary hover:underline">
            Switch role ↩
          </button>
        </p>
      </div>
    </div>
  );
};

export default RoleConfirmModal;
