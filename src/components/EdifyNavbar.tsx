import { Button } from "@/components/ui/button";
import { useMockUser } from "@/context/MockUserContext";

const EdifyNavbar = () => {
  const { user, logout } = useMockUser();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
      <span className="text-xl font-extrabold text-primary tracking-tight">Edify</span>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm font-semibold text-foreground">{user.name}</span>
            <button
              onClick={logout}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Log in
            </button>
            <Button variant="pill" size="sm">
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default EdifyNavbar;
