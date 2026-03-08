import { Home, Search, MessageCircle, User } from "lucide-react";
import { useState } from "react";

const tabs = [
  { key: "home", label: "Home", icon: Home },
  { key: "explore", label: "Explore", icon: Search },
  { key: "inbox", label: "Inbox", icon: MessageCircle },
  { key: "account", label: "Account", icon: User },
] as const;

const BottomNav = () => {
  const [active, setActive] = useState<string>("home");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.6} fill={isActive ? "currentColor" : "none"} />
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
