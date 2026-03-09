import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, Camera, ChevronRight, BookOpen, Brain, CalendarDays,
  CreditCard, Palette, Headphones, LogOut, Star, Check, X, Plus,
  ChevronLeft, ChevronRight as ChevronRightIcon, Clock, Video,
  Link as LinkIcon, ShieldCheck, Upload, HelpCircle, ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";
import BottomNav from "@/components/BottomNav";
import { useMockUser } from "@/context/MockUserContext";

type Screen =
  | "main"
  | "learnings"
  | "quiz"
  | "points"
  | "transactions"
  | "schedule"
  | "addEvent"
  | "avatarBuilder"
  | "adultVerification"
  | "faq";

type QuizStep = 1 | 2 | 3;

const mockRole = "student"; // "student" | "parent"

const mockLessons = [
  { tutor: "Aaryav Sharma", subject: "Physics", date: "June 18", duration: "1 hr", rating: 5 },
  { tutor: "Priya Shrestha", subject: "Math", date: "June 12", duration: "1.5 hr", rating: 4 },
  { tutor: "Rohan Adhikari", subject: "Physics", date: "May 28", duration: "1 hr", rating: 5 },
  { tutor: "Sneha Maharjan", subject: "English", date: "May 20", duration: "2 hr", rating: 4 },
];

const mockTransactions = [
  { tutor: "Aaryav Sharma", subject: "Physics", date: "June 18", amount: "NPR 840", status: "pending" },
  { tutor: "Priya Shrestha", subject: "Math", date: "June 12", amount: "NPR 735", status: "completed" },
  { tutor: "Rohan Adhikari", subject: "Physics", date: "May 28", amount: "NPR 840", status: "completed" },
  { tutor: "Sneha Maharjan", subject: "English", date: "May 20", amount: "NPR 1,470", status: "completed" },
];

const mockEvents = [
  { title: "Physics Lesson — Aaryav Sharma", date: "July 18, 10:00 AM", color: "primary" },
  { title: "Math Revision", date: "July 20, 4:00 PM", color: "secondary" },
  { title: "NEB Exam Prep", date: "July 25, 9:00 AM", color: "primary" },
];

const subjectPoints = [
  { subject: "Physics", points: 120, percent: 85 },
  { subject: "Math", points: 80, percent: 72 },
  { subject: "English", points: 40, percent: 90 },
];

const quizLevels = ["Grade 1 – 5", "Grade 6 – 10", "Grade 11 & 12", "University / Bachelor"];
const quizSubjects = ["Math", "Physics", "Chemistry", "English", "Biology", "Social Studies"];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useMockUser();
  const [screen, setScreen] = useState<Screen>("main");

  // Handle navigation state from other pages (e.g., Inbox → Schedule)
  useEffect(() => {
    const state = location.state as { screen?: Screen } | null;
    if (state?.screen) {
      setScreen(state.screen);
      // Clear the state to prevent re-triggering on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Drawers
  const [photoSheet, setPhotoSheet] = useState(false);
  const [appearanceSheet, setAppearanceSheet] = useState(false);
  const [helpSheet, setHelpSheet] = useState(false);
  const [logoutSheet, setLogoutSheet] = useState(false);

  // Appearance
  const [theme, setTheme] = useState("light");

  // Quiz
  const [quizStep, setQuizStep] = useState<QuizStep>(1);
  const [quizLevel, setQuizLevel] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Schedule
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [eventName, setEventName] = useState("");

  // Transaction parent mock
  const [childLinked, setChildLinked] = useState(false);

  // Adult Verification
  const [adultVerified, setAdultVerified] = useState(false);
  const [nationalIdUploaded, setNationalIdUploaded] = useState(false);
  const [studentIdUploaded, setStudentIdUploaded] = useState(false);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase();

  const goBack = () => {
    if (screen === "addEvent") setScreen("schedule");
    else if (screen === "avatarBuilder") setScreen("main");
    else setScreen("main");
    // Reset quiz
    if (screen === "quiz") {
      setQuizStep(1);
      setQuizLevel("");
      setQuizSubject("");
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
    }
  };

  const handleLogout = () => {
    setLogoutSheet(false);
    logout();
    navigate("/");
  };

  // ── SUB-SCREEN HEADER ──
  const SubHeader = ({ title }: { title: string }) => (
    <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
      <button onClick={goBack} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
      <span className="text-lg font-extrabold text-foreground">{title}</span>
    </div>
  );

  // ── STARS ──
  const Stars = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={14} className={i <= count ? "text-primary fill-primary" : "text-border"} />
      ))}
    </div>
  );

  // ══════════════════════════════════════════
  // MY LEARNINGS
  // ══════════════════════════════════════════
  if (screen === "learnings") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <SubHeader title="My Learnings" />
        <div className="px-5 pt-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
            {["📚 8 Classes Taken", "⏱ 12.5 Hours", "⭐ 4 Tutors"].map(s => (
              <span key={s} className="whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary">{s}</span>
            ))}
          </div>
          <h2 className="text-base font-extrabold text-foreground mb-3">Classes Taken</h2>
          <div className="flex flex-col gap-3">
            {mockLessons.map((l, i) => (
              <div key={i} className="bg-background rounded-xl border border-border p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold shrink-0">
                    {getInitials(l.tutor)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{l.tutor}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{l.subject}</span>
                      <span className="text-xs text-muted-foreground">{l.date}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{l.duration}</span>
                </div>
                <Stars count={l.rating} />
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // QUIZ
  // ══════════════════════════════════════════
  if (screen === "quiz") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-24">
        {quizStep === 1 && (
          <>
            <SubHeader title="Quiz" />
            <div className="px-5 pt-4">
              <p className="text-sm text-muted-foreground mb-4">Test your knowledge. Earn points.</p>
              <h2 className="text-base font-extrabold text-foreground mb-3">Select your level</h2>
              <div className="flex flex-col gap-2.5">
                {quizLevels.map(level => {
                  const sel = quizLevel === level;
                  return (
                    <button key={level} onClick={() => setQuizLevel(level)}
                      className={`flex items-center gap-3 w-full p-4 rounded-xl border transition-all text-left ${sel ? "border-l-4 border-l-primary bg-primary/[0.08] border-primary" : "border-border bg-background"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${sel ? "border-primary" : "border-muted-foreground/40"}`}>
                        {sel && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="text-sm font-bold text-foreground">{level}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="fixed bottom-20 left-0 right-0 px-5 max-w-[430px] mx-auto">
              <Button className="w-full" disabled={!quizLevel} onClick={() => setQuizStep(2)}>Next →</Button>
            </div>
          </>
        )}
        {quizStep === 2 && (
          <>
            <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
              <button onClick={() => setQuizStep(1)} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
              <span className="text-lg font-extrabold text-foreground flex-1">Quiz</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
            </div>
            <div className="px-5 pt-4">
              <h2 className="text-base font-extrabold text-foreground mb-3">Select a subject</h2>
              <div className="flex gap-2 flex-wrap mb-6">
                {quizSubjects.map(s => {
                  const sel = quizSubject === s;
                  return (
                    <button key={s} onClick={() => setQuizSubject(s)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${sel ? "bg-primary text-primary-foreground" : "border border-primary text-primary bg-background"}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="fixed bottom-20 left-0 right-0 px-5 max-w-[430px] mx-auto">
              <Button className="w-full" disabled={!quizSubject} onClick={() => { setQuizStep(3); setSelectedAnswer(null); setAnswerSubmitted(false); }}>Start Quiz →</Button>
            </div>
          </>
        )}
        {quizStep === 3 && (
          <>
            <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
              <button onClick={() => setQuizStep(2)} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
              <span className="text-lg font-extrabold text-foreground flex-1">{quizSubject} Quiz</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">240 pts</span>
            </div>
            <div className="px-5 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-semibold">Question 1 of 5</span>
              </div>
              <Progress value={20} className="h-2 mb-5" />
              <div className="bg-background rounded-xl border border-border p-5 shadow-sm mb-5">
                <p className="text-base font-bold text-foreground">What is the capital city of Nepal?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "A", label: "Pokhara" },
                  { key: "B", label: "Kathmandu" },
                  { key: "C", label: "Lalitpur" },
                  { key: "D", label: "Biratnagar" },
                ].map(opt => {
                  const sel = selectedAnswer === opt.key;
                  const correct = opt.key === "B";
                  let bg = "bg-background border-border";
                  if (answerSubmitted && sel && correct) bg = "bg-primary/20 border-primary";
                  else if (answerSubmitted && sel && !correct) bg = "bg-warning/20 border-warning";
                  else if (answerSubmitted && correct) bg = "bg-primary/10 border-primary/50";
                  else if (sel) bg = "bg-primary text-primary-foreground border-primary";

                  return (
                    <button key={opt.key} onClick={() => { if (!answerSubmitted) setSelectedAnswer(opt.key); }}
                      className={`p-4 rounded-xl border text-left transition-all ${bg}`}>
                      <span className={`text-sm font-bold ${sel && !answerSubmitted ? "text-primary-foreground" : "text-foreground"}`}>
                        {opt.key}: {opt.label}
                      </span>
                      {answerSubmitted && sel && correct && <span className="ml-1">✅</span>}
                      {answerSubmitted && sel && !correct && <span className="ml-1">❌</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="fixed bottom-20 left-0 right-0 px-5 max-w-[430px] mx-auto">
              <Button className="w-full" disabled={!selectedAnswer} onClick={() => setAnswerSubmitted(true)}>
                {answerSubmitted ? "Next Question →" : "Submit Answer →"}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════
  // POINTS TALLY
  // ══════════════════════════════════════════
  if (screen === "points") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <SubHeader title="My Points" />
        <div className="px-5 pt-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2">
            <span className="text-3xl font-extrabold text-primary-foreground">240</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Total Points</p>
          <div className="w-full">
            <h2 className="text-base font-extrabold text-foreground mb-3">Performance by Subject</h2>
            <div className="flex flex-col gap-3">
              {subjectPoints.map((s, i) => (
                <div key={i} className="bg-background rounded-xl border border-border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">{s.subject}</span>
                    <span className="text-sm font-bold text-primary">{s.points} pts</span>
                  </div>
                  <Progress value={s.percent} className="h-2 mb-1" />
                  <span className="text-xs text-muted-foreground">{s.percent}% correct</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // TRANSACTIONS
  // ══════════════════════════════════════════
  if (screen === "transactions") {
    if (mockRole === "student") {
      return (
        <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
          <SubHeader title="Transaction History" />
          <div className="px-5 pt-10 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
              <CreditCard size={48} className="text-secondary/60" />
            </div>
            <p className="text-base font-bold text-foreground mb-1">This feature is available for Parent accounts</p>
            <p className="text-sm text-muted-foreground mb-5">Switch to a Parent account to view and manage lesson transactions.</p>
            <button className="text-sm font-bold text-primary">Switch to Parent →</button>
          </div>
          <BottomNav />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <SubHeader title="Transaction History" />
        {!childLinked ? (
          <div className="px-5 pt-10 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
              <LinkIcon size={48} className="text-secondary/60" />
            </div>
            <p className="text-base font-bold text-foreground mb-1">Link your child's account to view transactions</p>
            <p className="text-sm text-muted-foreground mb-5">NPR payments across all lessons in one place.</p>
            <Button onClick={() => setChildLinked(true)}>🔗 Link Child's Account →</Button>
          </div>
        ) : (
          <div className="px-5 pt-4">
            <div className="flex gap-2 mb-3">
              {["1 Month", "6 Months", "All Time"].map((f, i) => (
                <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{f}</button>
              ))}
              <button className="ml-auto px-3 py-1.5 rounded-full text-xs font-bold border border-secondary text-secondary">Sort by Date ↕</button>
            </div>
            <div className="flex flex-col gap-3">
              {mockTransactions.map((t, i) => (
                <div key={i} className="bg-background rounded-xl border border-border p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-secondary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{t.tutor}</p>
                    <p className="text-xs text-muted-foreground">{t.subject}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">{t.amount}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === "completed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                      {t.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // SCHEDULE
  // ══════════════════════════════════════════
  if (screen === "schedule") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
          <button onClick={goBack} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
          <span className="text-lg font-extrabold text-foreground flex-1">Schedule</span>
          <Button variant="outline" size="sm" onClick={() => setScreen("addEvent")}>
            <Plus size={14} /> Add Event
          </Button>
        </div>
        <div className="px-3 pt-2">
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
            className="rounded-xl border border-border shadow-sm pointer-events-auto"
          />
        </div>
        <div className="px-5 pt-4">
          <h2 className="text-base font-extrabold text-foreground mb-3">Upcoming</h2>
          <div className="flex flex-col gap-3">
            {mockEvents.map((e, i) => (
              <div key={i} className="flex rounded-xl border border-border overflow-hidden shadow-sm bg-background">
                <div className={`w-1.5 ${i % 2 === 0 ? "bg-primary" : "bg-secondary"}`} />
                <div className="p-4">
                  <p className="text-sm font-bold text-foreground">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // ADD EVENT
  // ══════════════════════════════════════════
  if (screen === "addEvent") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-24">
        <SubHeader title="Add Event" />
        <div className="px-3 pt-2">
          <p className="px-2 text-sm font-bold text-foreground mb-2">Select a date</p>
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
            className="rounded-xl border border-border shadow-sm pointer-events-auto"
          />
        </div>
        <div className="px-5 pt-4 flex flex-col gap-3">
          <Input
            placeholder="Add an Event"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            className="rounded-full"
          />
          <Button variant="outline" className="w-full border-secondary text-secondary">
            🔗 Link with Calendar
          </Button>
          <p className="text-xs text-muted-foreground text-center">Sync with Google Calendar coming soon</p>
        </div>
        <div className="fixed bottom-20 left-0 right-0 px-5 max-w-[430px] mx-auto">
          <Button className="w-full" disabled={!eventName}>Save Event →</Button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  // AVATAR BUILDER (placeholder)
  // ══════════════════════════════════════════
  if (screen === "avatarBuilder") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <SubHeader title="Create Avatar" />
        <div className="px-5 pt-10 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
            <Palette size={56} className="text-secondary/40" />
          </div>
          <p className="text-lg font-bold text-foreground mb-1">Avatar builder coming soon!</p>
          <p className="text-sm text-muted-foreground">Create a personalized avatar for your profile.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // ADULT VERIFICATION
  // ══════════════════════════════════════════
  if (screen === "adultVerification") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-24">
        <SubHeader title="Adult Verification" />
        <div className="px-5 pt-4">
          <p className="text-sm text-muted-foreground mb-5">Upload a valid ID to unlock adult features</p>

          {!verificationSubmitted ? (
            <>
              {/* Info card */}
              <div className="rounded-xl bg-primary/[0.06] border-l-4 border-l-primary p-4 mb-6">
                <p className="text-sm font-bold text-foreground mb-2">Once verified, you'll have access to:</p>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-foreground">✅ Full messaging with tutors</span>
                  <span className="text-sm text-foreground">✅ Voice & video calls</span>
                  <span className="text-sm text-foreground">✅ Transaction history</span>
                  <span className="text-sm text-foreground">✅ Sending images and documents</span>
                </div>
              </div>

              {/* Upload cards */}
              <div className="flex flex-col gap-4 mb-4">
                {/* National ID */}
                <button
                  onClick={() => setNationalIdUploaded(true)}
                  className={`w-full rounded-xl p-6 flex flex-col items-center gap-2 transition-all ${
                    nationalIdUploaded
                      ? "bg-primary/[0.06] border-2 border-primary"
                      : "border-2 border-dashed border-secondary"
                  }`}
                >
                  {nationalIdUploaded ? (
                    <>
                      <ShieldCheck size={32} className="text-primary" />
                      <span className="text-sm font-bold text-foreground">🪪 National ID Card</span>
                      <span className="text-sm font-bold text-primary">✅ Document uploaded</span>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="text-secondary" />
                      <span className="text-sm font-bold text-foreground">🪪 National ID Card</span>
                      <span className="text-xs text-muted-foreground">Tap to upload front of ID</span>
                      <span className="text-[10px] text-muted-foreground">Accepted: JPG, PNG, PDF</span>
                    </>
                  )}
                </button>

                {/* Student ID */}
                <button
                  onClick={() => setStudentIdUploaded(true)}
                  className={`w-full rounded-xl p-6 flex flex-col items-center gap-2 transition-all ${
                    studentIdUploaded
                      ? "bg-primary/[0.06] border-2 border-primary"
                      : "border-2 border-dashed border-secondary"
                  }`}
                >
                  {studentIdUploaded ? (
                    <>
                      <ShieldCheck size={32} className="text-primary" />
                      <span className="text-sm font-bold text-foreground">🎓 Student ID Card</span>
                      <span className="text-sm font-bold text-primary">✅ Document uploaded</span>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="text-secondary" />
                      <span className="text-sm font-bold text-foreground">🎓 Student ID Card</span>
                      <span className="text-xs text-muted-foreground">Tap to upload Student ID</span>
                      <span className="text-[10px] text-muted-foreground">Accepted: JPG, PNG, PDF</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mb-5">Either document is sufficient</p>

              <Button
                className="w-full"
                disabled={!nationalIdUploaded && !studentIdUploaded}
                onClick={() => setVerificationSubmitted(true)}
              >
                Submit for Verification →
              </Button>
            </>
          ) : (
            /* Pending state */
            <div className="flex flex-col items-center text-center pt-8">
              <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                <span className="text-4xl">⏳</span>
              </div>
              <p className="text-lg font-extrabold text-foreground mb-2">Verification Under Review</p>
              <p className="text-sm text-muted-foreground mb-4">
                We'll notify you within 24 hours. You can continue using Edify while you wait.
              </p>
              <Badge className="bg-warning/10 text-warning border-0 font-bold text-xs">Pending Review</Badge>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // FAQ SCREEN
  // ══════════════════════════════════════════
  const faqItems = [
    { q: "What is a Student Pass?", a: "A Student Pass is a subscription system for users who book multiple lessons in a month. It removes any service charges included with booking for just NPR 250 a month." },
    { q: "What is a Household Account?", a: "A Household Account is a type of account created for parents which links their child's or children's accounts in a single place. It helps parents monitor, track, provide insight and schedule or book lessons on their child's behalf." },
    { q: "What if I don't like the Tutor after a lesson?", a: "With our Good Fit Guarantee, we will return the booking fee (excluding service charge) for the first hour of your lesson if it did not live up to your expectations." },
    { q: "How do I cancel or reschedule a lesson?", a: "You can cancel or reschedule any upcoming lesson up to 2 hours before the session starts. Go to Schedule in your Account page, select the lesson and tap 'Reschedule' or 'Cancel.' Refunds are processed within 24 hours to your original payment method." },
    { q: "Is my child's data safe on Edify?", a: "Yes. Edify uses end-to-end encryption for all messages and stores your child's data in compliance with Nepal's privacy standards. Parents have full visibility and control over their child's account through the Household Account feature. We never share personal data with third parties." },
  ];

  if (screen === "faq") {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <SubHeader title="FAQs" />
        <div className="px-5 pt-4">
          <p className="text-sm text-muted-foreground mb-5">Everything you need to know about Edify</p>
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => {
              const [open, setOpen] = [faqOpen === i, (v: boolean) => setFaqOpen(v ? i : -1)];
              return (
                <button
                  key={i}
                  onClick={() => setOpen(!open)}
                  className={`w-full text-left rounded-xl border border-border p-4 transition-all ${open ? "bg-muted" : "bg-background"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground flex-1 pr-2">{item.q}</span>
                    <ChevronDown size={16} className={`text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
                  </div>
                  {open && (
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.a}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ══════════════════════════════════════════
  // MAIN ACCOUNT SCREEN
  // ══════════════════════════════════════════
  const isGuest = user?.name === "Guest";
  const displayName = isGuest ? "Guest" : (user?.name || "Sushant Thapa");
  const displaySubtitle = isGuest ? "Browsing as Guest" : `${user?.role || "Student"} • ${user?.grade || "Grade 11"}`;
  const avatarInitials = isGuest ? "G" : getInitials(displayName);
  const avatarBg = isGuest ? "bg-[hsl(220,9%,46%)]" : "bg-secondary";
  const showVerifiedTick = adultVerified && !isGuest;

  const menuGroups = [
    {
      label: "My Learning",
      items: [
        { icon: BookOpen, label: "My Learnings", action: () => setScreen("learnings") },
        {
          icon: Brain, label: "Quiz", action: () => setScreen("quiz"),
          badge: (
            <button onClick={(e) => { e.stopPropagation(); setScreen("points"); }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
              <span className="text-[10px] font-extrabold text-primary-foreground leading-none">240<br />pts</span>
            </button>
          ),
        },
        { icon: CalendarDays, label: "Schedule", action: () => setScreen("schedule") },
      ],
    },
    {
      label: "Account & Billing",
      items: [
        { icon: CreditCard, label: "Transaction History", action: () => setScreen("transactions") },
      ],
    },
    {
      label: "Help & FAQ",
      items: [
        { icon: HelpCircle, label: "Frequently Asked Questions", action: () => setScreen("faq") },
      ],
    },
    {
      label: "Verification",
      items: [
        {
          icon: ShieldCheck,
          label: "Verify you're an Adult",
          subtitle: "Unlock full messaging and transaction features",
          action: () => setScreen("adultVerification"),
          badge: (
            <Badge className={`shrink-0 border-0 font-bold text-xs ${
              adultVerified
                ? "bg-primary/10 text-primary"
                : "bg-warning/10 text-warning"
            }`}>
              {adultVerified ? "✅ Verified" : "Not Verified"}
            </Badge>
          ),
        },
      ],
    },
    {
      label: "Preferences",
      items: [
        { icon: Palette, label: "Appearance", action: () => setAppearanceSheet(true) },
      ],
    },
    {
      label: "Support",
      items: [
        { icon: Headphones, label: "Help & Support", action: () => setHelpSheet(true) },
        { icon: LogOut, label: "Log Out", action: () => setLogoutSheet(true), destructive: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <span className="text-xl font-extrabold text-primary tracking-tight">Edify</span>
      </nav>

      {/* Profile header */}
      <div className="flex flex-col items-center pt-6 pb-4 px-5">
        <div className="relative mb-3">
          <div className={`w-24 h-24 rounded-full ${avatarBg} flex items-center justify-center`}>
            <span className="text-2xl font-extrabold text-secondary-foreground">{avatarInitials}</span>
          </div>
          {showVerifiedTick && (
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center border-2 border-background">
              <Check size={12} className="text-primary-foreground" strokeWidth={3} />
            </div>
          )}
          {!isGuest && (
            <button
              onClick={() => setPhotoSheet(true)}
              className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm"
            >
              <Camera size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
        <h1 className="text-xl font-extrabold text-foreground">{displayName}</h1>
        <p className="text-sm text-muted-foreground mb-1.5">{displaySubtitle}</p>
      </div>

      {/* Guest banner */}
      {isGuest && (
        <div className="mx-5 mb-4 rounded-xl bg-secondary/[0.08] border-l-4 border-l-secondary p-4">
          <p className="text-sm font-bold text-foreground mb-1">🔓 You're browsing as a guest</p>
          <p className="text-xs text-muted-foreground mb-3">
            Create an account to book tutors, track progress and access all features.
          </p>
          <Button variant="secondary" className="w-full" onClick={() => navigate("/")}>
            Create Account →
          </Button>
        </div>
      )}

      {/* Menu groups */}
      <div className="px-5 pb-6">
        {menuGroups.map((group, gi) => (
          <div key={gi} className="mb-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{group.label}</p>
            <div className="flex flex-col gap-2">
              {group.items.map((item, ii) => (
                <button
                  key={ii}
                  onClick={item.action}
                  className="flex items-center gap-3 w-full p-4 rounded-xl bg-background border border-border shadow-sm text-left transition-all active:scale-[0.98]"
                >
                  <item.icon size={20} className={(item as any).destructive ? "text-destructive" : "text-foreground"} />
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-bold block ${(item as any).destructive ? "text-destructive" : "text-foreground"}`}>{item.label}</span>
                    {(item as any).subtitle && (
                      <span className="text-xs text-muted-foreground block">{(item as any).subtitle}</span>
                    )}
                  </div>
                  {(item as any).badge && (item as any).badge}
                  {!(item as any).destructive && !(item as any).badge && <ChevronRight size={18} className="text-muted-foreground" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />

      {/* ── PHOTO SHEET ── */}
      <Drawer open={photoSheet} onOpenChange={setPhotoSheet}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Profile Photo</DrawerTitle>
            <DrawerDescription>Choose an option</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 flex flex-col gap-3">
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => setPhotoSheet(false)}>
              📁 Upload Photo
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => { setPhotoSheet(false); setScreen("avatarBuilder"); }}>
              🎨 Create Avatar
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* ── APPEARANCE SHEET ── */}
      <Drawer open={appearanceSheet} onOpenChange={setAppearanceSheet}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Appearance</DrawerTitle>
            <DrawerDescription>Choose your preferred theme</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 flex flex-col gap-2">
            {[
              { key: "light", label: "☀️ Light Mode" },
              { key: "dark", label: "🌙 Dark Mode" },
              { key: "contrast", label: "♿ High Contrast" },
            ].map(t => (
              <button key={t.key} onClick={() => setTheme(t.key)}
                className={`flex items-center gap-3 w-full p-4 rounded-xl border transition-all ${theme === t.key ? "border-primary bg-primary/[0.08]" : "border-border"}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${theme === t.key ? "border-primary" : "border-muted-foreground/40"}`}>
                  {theme === t.key && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span className="text-sm font-bold text-foreground">{t.label}</span>
              </button>
            ))}
            <Button className="w-full mt-2" onClick={() => setAppearanceSheet(false)}>Apply Theme →</Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* ── HELP SHEET ── */}
      <Drawer open={helpSheet} onOpenChange={setHelpSheet}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>How can we help?</DrawerTitle>
            <DrawerDescription>Choose a support option</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 flex flex-col gap-3">
            <Button variant="outline" className="w-full">💬 Chat with Support</Button>
            <Button className="w-full">📞 Request a Callback</Button>
            <p className="text-xs text-muted-foreground text-center">We typically respond within 30 minutes.</p>
          </div>
        </DrawerContent>
      </Drawer>

      {/* ── LOGOUT SHEET ── */}
      <Drawer open={logoutSheet} onOpenChange={setLogoutSheet}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you sure you want to log out?</DrawerTitle>
            <DrawerDescription>You'll need to sign in again to access your account.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setLogoutSheet(false)}>Cancel</Button>
            <Button variant="destructive" className="flex-1" onClick={handleLogout}>Log Out</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Account;
