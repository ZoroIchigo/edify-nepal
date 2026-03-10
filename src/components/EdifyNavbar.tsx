import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useMockUser } from "@/context/MockUserContext";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";

const EdifyNavbar = () => {
  const { user, login, logout } = useMockUser();
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  // Auto-open Sign Up sheet when navigated with state
  useEffect(() => {
    const state = location.state as { openSignUp?: boolean } | null;
    if (state?.openSignUp) {
      setSignUpOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Sign up form
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUpPw, setShowSignUpPw] = useState(false);
  const [signUpRole, setSignUpRole] = useState<"Student" | "Parent">("Student");
  const [householdEnabled, setHouseholdEnabled] = useState(false);
  const [householdName, setHouseholdName] = useState("");

  const handleLogin = () => {
    login({ name: loginEmail.split("@")[0] || "User", role: "Student", grade: "Grade 11" });
    setLoginOpen(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleGuestLogin = () => {
    login({ name: "Guest", role: "Student", grade: "" });
    setLoginOpen(false);
  };

  const handleSignUp = () => {
    login({ name: signUpName || "User", role: signUpRole, grade: signUpRole === "Student" ? "Grade 11" : "" });
    setSignUpOpen(false);
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpRole("Student");
    setHouseholdEnabled(false);
    setHouseholdName("");
  };

  const switchToSignUp = () => { setLoginOpen(false); setSignUpOpen(true); };
  const switchToLogin = () => { setSignUpOpen(false); setLoginOpen(true); };

  return (
    <>
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
              <button
                onClick={() => setLoginOpen(true)}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Log in
              </button>
              <Button variant="pill" size="sm" onClick={() => setSignUpOpen(true)}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* ── LOGIN SHEET ── */}
      <Drawer open={loginOpen} onOpenChange={setLoginOpen}>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-xl font-extrabold">Welcome Back</DrawerTitle>
            <DrawerDescription>Log in to your Edify account</DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-6 flex flex-col gap-3">
            <Input
              placeholder="Email address"
              type="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              className="rounded-full"
            />
            <div className="relative">
              <Input
                placeholder="Password"
                type={showLoginPw ? "text" : "password"}
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="rounded-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowLoginPw(!showLoginPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showLoginPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button className="w-full" onClick={handleLogin}>Log In →</Button>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Button variant="outline" className="w-full" onClick={handleGuestLogin}>
              Continue as Guest →
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Don't have an account?{" "}
              <button onClick={switchToSignUp} className="font-bold text-secondary">Sign Up →</button>
            </p>
          </div>
        </DrawerContent>
      </Drawer>

      {/* ── SIGN UP SHEET ── */}
      <Drawer open={signUpOpen} onOpenChange={setSignUpOpen}>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-xl font-extrabold">Create Your Account</DrawerTitle>
            <DrawerDescription>Join Nepal's trust-first tutoring platform</DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-6 flex flex-col gap-3">
            <Input
              placeholder="Full name"
              value={signUpName}
              onChange={e => setSignUpName(e.target.value)}
              className="rounded-full"
            />
            <Input
              placeholder="Email address"
              type="email"
              value={signUpEmail}
              onChange={e => setSignUpEmail(e.target.value)}
              className="rounded-full"
            />
            <div className="relative">
              <Input
                placeholder="Password"
                type={showSignUpPw ? "text" : "password"}
                value={signUpPassword}
                onChange={e => setSignUpPassword(e.target.value)}
                className="rounded-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowSignUpPw(!showSignUpPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showSignUpPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role selector */}
            <div className="flex gap-2">
              {(["Student", "Parent"] as const).map(role => (
                <button
                  key={role}
                  onClick={() => { setSignUpRole(role); if (role === "Student") { setHouseholdEnabled(false); setHouseholdName(""); } }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                    signUpRole === role
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Parent-only household toggle */}
            {signUpRole === "Parent" && (
              <div className="rounded-xl border border-border p-4 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">🏠 Create a Household Account</p>
                  </div>
                  <Switch checked={householdEnabled} onCheckedChange={setHouseholdEnabled} />
                </div>
                {householdEnabled && (
                  <div className="mt-3">
                    <Input
                      placeholder="Household Name (e.g. Thapa Family)"
                      value={householdName}
                      onChange={e => setHouseholdName(e.target.value)}
                      className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      You can link your children's accounts after signing up.
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button className="w-full" onClick={handleSignUp}>Create Account →</Button>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Already have an account?{" "}
              <button onClick={switchToLogin} className="font-bold text-secondary">Log In →</button>
            </p>
            <p className="text-[10px] text-center text-muted-foreground">
              By signing up, you agree to Edify's Terms & Privacy Policy
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EdifyNavbar;
