import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useMockUser } from "@/context/MockUserContext";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

const EdifyNavbar = () => {
  const { user, login, logout } = useMockUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

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

  // DOB
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");

  // Path selection
  const [selectedPath, setSelectedPath] = useState<"invite" | "verify" | null>(null);
  const [inviteCode, setInviteCode] = useState("");

  // ID uploads (mock)
  const [govIdUploaded, setGovIdUploaded] = useState(false);
  const [empIdUploaded, setEmpIdUploaded] = useState(false);

  const getAge = () => {
    if (!dobDay || !dobMonth || !dobYear) return null;
    const birth = new Date(parseInt(dobYear), parseInt(dobMonth) - 1, parseInt(dobDay));
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
  };

  const age = getAge();
  const isUnder18 = age !== null && age < 18;
  const dobValid = age !== null && age >= 18;

  const canCreateAccount = () => {
    if (signUpRole === "Parent" && householdEnabled) {
      if (!dobValid) return false;
      if (selectedPath === "invite") return inviteCode.length > 0;
      if (selectedPath === "verify") return govIdUploaded || empIdUploaded;
      return false;
    }
    return signUpName.length > 0 || signUpEmail.length > 0;
  };

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
    if (signUpRole === "Parent" && householdEnabled) {
      if (selectedPath === "invite") {
        login({ name: signUpName || "Parent", role: "Parent", grade: "" });
        setSignUpOpen(false);
        resetSignUp();
        navigate("/household");
        return;
      }
      if (selectedPath === "verify") {
        login({ name: signUpName || "Parent", role: "Parent", grade: "" });
        setSignUpOpen(false);
        resetSignUp();
        navigate("/pending-verification");
        return;
      }
    }
    login({ name: signUpName || "User", role: signUpRole, grade: signUpRole === "Student" ? "Grade 11" : "" });
    setSignUpOpen(false);
    resetSignUp();
  };

  const resetSignUp = () => {
    setSignUpName(""); setSignUpEmail(""); setSignUpPassword("");
    setSignUpRole("Student"); setHouseholdEnabled(false); setHouseholdName("");
    setDobDay(""); setDobMonth(""); setDobYear("");
    setSelectedPath(null); setInviteCode("");
    setGovIdUploaded(false); setEmpIdUploaded(false);
  };

  const switchToSignUp = () => { setLoginOpen(false); setSignUpOpen(true); };
  const switchToLogin = () => { setSignUpOpen(false); setLoginOpen(true); };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - i));

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <span className="text-xl font-extrabold text-primary tracking-tight">Edify</span>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-semibold text-foreground">{user.name}</span>
              <button onClick={logout} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Log out</button>
            </>
          ) : (
            <>
              <button onClick={() => setLoginOpen(true)} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Log in</button>
              <Button variant="pill" size="sm" onClick={() => setSignUpOpen(true)}>Sign Up</Button>
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
            <Input placeholder="Email address" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="rounded-full" />
            <div className="relative">
              <Input placeholder="Password" type={showLoginPw ? "text" : "password"} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="rounded-full pr-10" />
              <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showLoginPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button className="w-full" onClick={handleLogin}>Log In →</Button>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Button variant="outline" className="w-full" onClick={handleGuestLogin}>Continue as Guest →</Button>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Don't have an account?{" "}
              <button onClick={switchToSignUp} className="font-bold text-secondary">Sign Up →</button>
            </p>
          </div>
        </DrawerContent>
      </Drawer>

      {/* ── SIGN UP SHEET ── */}
      <Drawer open={signUpOpen} onOpenChange={(open) => { setSignUpOpen(open); if (!open) resetSignUp(); }}>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-xl font-extrabold">Create Your Account</DrawerTitle>
            <DrawerDescription>Join Nepal's trust-first tutoring platform</DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-6 flex flex-col gap-3">
            <Input placeholder="Full name" value={signUpName} onChange={e => setSignUpName(e.target.value)} className="rounded-full" />
            <Input placeholder="Email address" type="email" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} className="rounded-full" />
            <div className="relative">
              <Input placeholder="Password" type={showSignUpPw ? "text" : "password"} value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} className="rounded-full pr-10" />
              <button type="button" onClick={() => setShowSignUpPw(!showSignUpPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showSignUpPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role selector */}
            <div className="flex gap-2">
              {(["Student", "Parent"] as const).map(role => (
                <button
                  key={role}
                  onClick={() => { setSignUpRole(role); if (role === "Student") { setHouseholdEnabled(false); setHouseholdName(""); setSelectedPath(null); } }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                    signUpRole === role ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
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
                  <p className="text-sm font-bold text-foreground">🏠 Create a Household Account</p>
                  <Switch checked={householdEnabled} onCheckedChange={setHouseholdEnabled} />
                </div>
                {householdEnabled && (
                  <div className="mt-3">
                    <Input placeholder="Household Name (e.g. Thapa Family)" value={householdName} onChange={e => setHouseholdName(e.target.value)} className="rounded-full" />
                    <p className="text-xs text-muted-foreground mt-1.5">You can link your children's accounts after signing up.</p>
                  </div>
                )}
              </div>
            )}

            {/* DOB + Path selection (Parent with Household ON) */}
            {signUpRole === "Parent" && householdEnabled && (
              <>
                {/* Date of Birth */}
                <div className="mt-1">
                  <p className="text-sm font-bold text-foreground mb-2">Date of Birth</p>
                  <div className="flex gap-2">
                    <Select value={dobDay} onValueChange={setDobDay}>
                      <SelectTrigger className="flex-1 rounded-full"><SelectValue placeholder="Day" /></SelectTrigger>
                      <SelectContent>{days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={dobMonth} onValueChange={setDobMonth}>
                      <SelectTrigger className="flex-1 rounded-full"><SelectValue placeholder="Month" /></SelectTrigger>
                      <SelectContent>{months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={dobYear} onValueChange={setDobYear}>
                      <SelectTrigger className="flex-1 rounded-full"><SelectValue placeholder="Year" /></SelectTrigger>
                      <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">You must be 18 or older to create a Parent account</p>
                  {isUnder18 && (
                    <div className="mt-2 rounded-lg bg-warning/10 p-3">
                      <p className="text-xs font-bold text-warning">⚠️ Parent accounts require the guardian to be 18+. Please sign up as a Student instead.</p>
                    </div>
                  )}
                </div>

                {/* Path selector - only if DOB valid */}
                {dobValid && (
                  <>
                    <div className="flex flex-col gap-3 mt-1">
                      {/* Card A - Invite */}
                      <button
                        onClick={() => setSelectedPath("invite")}
                        className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                          selectedPath === "invite" ? "border-primary bg-primary/[0.04]" : "border-border"
                        }`}
                      >
                        <p className="text-sm font-bold text-foreground">🔗 I have an invite from my child</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Use the invite code sent to your email or phone to instantly activate your household
                        </p>
                      </button>

                      {/* Card B - Verify */}
                      <button
                        onClick={() => setSelectedPath("verify")}
                        className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                          selectedPath === "verify" ? "border-secondary bg-secondary/[0.04]" : "border-border"
                        }`}
                      >
                        <p className="text-sm font-bold text-foreground">🪪 I'll verify my identity instead</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload a Government ID or Employment ID to create your account independently
                        </p>
                      </button>
                    </div>

                    {/* Path A: Invite Code */}
                    {selectedPath === "invite" && (
                      <div className="mt-1">
                        <Input
                          placeholder="Paste your invite code here"
                          value={inviteCode}
                          onChange={e => setInviteCode(e.target.value)}
                          className="rounded-full"
                        />
                        <p className="text-xs text-muted-foreground mt-1.5">Check the email or SMS sent from Edify</p>
                      </div>
                    )}

                    {/* Path B: ID Upload */}
                    {selectedPath === "verify" && (
                      <div className="flex flex-col gap-3 mt-1">
                        {/* Gov ID */}
                        <button
                          onClick={() => setGovIdUploaded(true)}
                          className={`w-full rounded-xl p-5 flex flex-col items-center gap-2 transition-all ${
                            govIdUploaded
                              ? "bg-primary/[0.06] border-2 border-primary"
                              : "border-2 border-dashed border-secondary"
                          }`}
                        >
                          {govIdUploaded ? (
                            <>
                              <ShieldCheck size={28} className="text-primary" />
                              <span className="text-sm font-bold text-foreground">🪪 Government ID</span>
                              <span className="text-sm font-bold text-primary">✅ Document uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload size={28} className="text-secondary" />
                              <span className="text-sm font-bold text-foreground">🪪 Government ID</span>
                              <span className="text-xs text-muted-foreground">Upload your Citizenship Certificate or National ID</span>
                              <span className="text-[10px] text-muted-foreground">Accepted: JPG, PNG, PDF</span>
                            </>
                          )}
                        </button>

                        {/* Employment ID */}
                        <button
                          onClick={() => setEmpIdUploaded(true)}
                          className={`w-full rounded-xl p-5 flex flex-col items-center gap-2 transition-all ${
                            empIdUploaded
                              ? "bg-primary/[0.06] border-2 border-primary"
                              : "border-2 border-dashed border-secondary"
                          }`}
                        >
                          {empIdUploaded ? (
                            <>
                              <ShieldCheck size={28} className="text-primary" />
                              <span className="text-sm font-bold text-foreground">💼 Employment ID</span>
                              <span className="text-sm font-bold text-primary">✅ Document uploaded</span>
                            </>
                          ) : (
                            <>
                              <Upload size={28} className="text-secondary" />
                              <span className="text-sm font-bold text-foreground">💼 Employment ID</span>
                              <span className="text-xs text-muted-foreground">Or upload your Employment ID card</span>
                              <span className="text-[10px] text-muted-foreground">Either document is sufficient</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <Button className="w-full" onClick={handleSignUp} disabled={!canCreateAccount()}>
              Create Account →
            </Button>
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
