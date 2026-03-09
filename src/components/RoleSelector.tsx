import { useState } from "react";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleConfirmModal from "@/components/RoleConfirmModal";

const roles = [
  { key: "student", label: "Student", icon: GraduationCap },
  { key: "parent", label: "Parent", icon: Users },
] as const;

type Role = typeof roles[number]["key"];

const RoleSelector = () => {
  const [selected, setSelected] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="px-5 py-6">
      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
        I am a...
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {roles.map(({ key, label, icon: Icon }) => {
          const active = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`flex flex-col items-center gap-2 py-5 rounded-2xl border-2 transition-all ${
                active
                  ? "bg-primary border-primary text-primary-foreground shadow-md"
                  : "bg-card border-transparent text-foreground hover:border-primary/40"
              }`}
            >
              <Icon size={28} strokeWidth={1.8} />
              <span className="text-sm font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <Button
          size="lg"
          className="w-full"
          onClick={() => setShowModal(true)}
        >
          Continue as {roles.find(r => r.key === selected)?.label} →
        </Button>
      )}

      <RoleConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        role={selected ? roles.find(r => r.key === selected)!.label : ""}
      />
    </section>
  );
};

export default RoleSelector;
