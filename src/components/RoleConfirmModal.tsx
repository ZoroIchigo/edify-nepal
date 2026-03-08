import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMockUser } from "@/context/MockUserContext";

interface RoleConfirmModalProps {
  open: boolean;
  onClose: () => void;
  role: string;
}

const RoleConfirmModal = ({ open, onClose, role }: RoleConfirmModalProps) => {
  const navigate = useNavigate();
  const { login } = useMockUser();

  if (!open) return null;

  const handleGuestLogin = () => {
    login({ name: "Mahima Thapa", role: "Student", grade: "Grade 12" });
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40" />
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-muted-foreground"
            onClick={handleGuestLogin}
          >
            Continue as Guest →
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
