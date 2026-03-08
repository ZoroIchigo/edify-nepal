import { Home, Search, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { key: "home", path: "/", label: "Home", icon: Home },
  { key: "explore", path: "/explore", label: "Explore", icon: Search },
  { key: "inbox", path: "/inbox", label: "Inbox", icon: MessageCircle },
  { key: "account", path: "/account", label: "Account", icon: User },
] as const;

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white border-t"
      style={{
        borderColor: "#E5E7EB",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around py-2 max-w-[430px] mx-auto">
        {tabs.map(({ key, path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${
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
