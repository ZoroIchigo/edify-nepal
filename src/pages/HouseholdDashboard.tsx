import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const children = [
  { name: "Sushant", grade: "Grade 11" },
];

const upcomingLessons = [
  { tutor: "Aarav Sharma", subject: "Physics", date: "Falgun 18, 10AM", status: "confirmed" },
  { tutor: "Rohan Adhikari", subject: "Chemistry", date: "Falgun 22, 4PM", status: "pending" },
];

const recordings = [
  { subject: "Physics", tutor: "Aarav Sharma", date: "Falgun 15", duration: "1hr" },
  { subject: "Math", tutor: "Priya Shrestha", date: "Falgun 10", duration: "1.5hr" },
];

const transactions = [
  { tutor: "Aarav Sharma", subject: "Physics", date: "Falgun 18", amount: "NPR 840" },
  { tutor: "Rohan Adhikari", subject: "Chemistry", date: "Falgun 15", amount: "NPR 945" },
  { tutor: "Priya Shrestha", subject: "Math", date: "Falgun 10", amount: "NPR 630" },
];

const notifications = [
  { text: "Aarav Sharma confirmed Sushant's lesson", time: "2 hours ago" },
  { text: "Rohan Adhikari's booking is pending confirmation", time: "1 day ago" },
  { text: "Recording available: Physics with Aarav Sharma", time: "3 days ago" },
];

const HouseholdDashboard = () => {
  const navigate = useNavigate();
  const [activeChild, setActiveChild] = useState(0);
  const [chatApproved, setChatApproved] = useState(false);

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate("/account")} className="p-1"><ArrowLeft size={22} className="text-foreground" /></button>
        <span className="text-lg font-extrabold text-foreground">Household</span>
        <button className="p-1"><Settings size={20} className="text-muted-foreground" /></button>
      </div>

      <div className="px-5 pt-5">
        {/* Title */}
        <h1 className="text-xl font-extrabold text-foreground">Thapa Household</h1>
        <p className="text-sm text-muted-foreground mb-4">👨‍👩‍👧 1 child linked</p>

        {/* Child Switcher */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
          {children.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveChild(i)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeChild === i
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary text-primary"
              }`}
            >
              {c.name} - {c.grade} {activeChild === i && "✓"}
            </button>
          ))}
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border border-primary text-primary">
            + Add Child
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
          {["📚 8 Lessons", "⏱ 12.5 Hours", "⭐ 4 Tutors"].map(s => (
            <span key={s} className="whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary">{s}</span>
          ))}
        </div>

        {/* Upcoming Lessons */}
        <div className="rounded-xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-foreground">Upcoming Lessons</h2>
            <button onClick={() => navigate("/explore")} className="text-xs font-bold text-secondary">Book a Lesson →</button>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingLessons.map((l, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-secondary-foreground">{getInitials(l.tutor)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{l.tutor}</p>
                  <p className="text-xs text-muted-foreground">{l.subject} • {l.date}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  l.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                }`}>
                  {l.status === "confirmed" ? "✅ Confirmed" : "⏳ Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Recordings */}
        <div className="rounded-xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-foreground">Recent Recordings</h2>
            <button className="text-xs font-bold text-secondary">View All →</button>
          </div>
          <div className="flex flex-col gap-3">
            {recordings.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg">🎥</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{r.subject} — {r.tutor}</p>
                  <p className="text-xs text-muted-foreground">{r.date} • {r.duration}</p>
                </div>
                <button className="px-3 py-1 rounded-full border border-primary text-primary text-xs font-bold">▶ Play</button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Recordings available for 30 days after each lesson</p>
        </div>

        {/* Chat Approvals */}
        <div className="rounded-xl border border-border p-4 mb-4">
          <h2 className="text-base font-extrabold text-foreground mb-3">Chat Access Requests</h2>
          {!chatApproved ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-secondary-foreground">RA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">Rohan Adhikari</p>
                <p className="text-xs text-muted-foreground">Sushant wants to chat with this tutor</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setChatApproved(true)} className="px-2.5 py-1 rounded-full border border-border text-xs font-bold text-muted-foreground">Deny ✕</button>
                <button onClick={() => setChatApproved(true)} className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">Approve ✓</button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">✅ No pending chat requests</p>
          )}
        </div>

        {/* Centralized Billing */}
        <div className="rounded-xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-extrabold text-foreground">Monthly Billing</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Falgun 2081</p>

          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Total Spent</span>
            <span className="text-lg font-extrabold text-primary">NPR 2,415</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Lessons Booked</span>
            <span className="text-xs font-bold text-foreground">3</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">Service Fees Paid</span>
            <span className="text-xs font-bold text-foreground">NPR 115</span>
          </div>

          <button onClick={() => navigate("/account", { state: { screen: "transactions" } })} className="text-xs font-bold text-secondary mb-4 block">
            View Full Transaction History →
          </button>

          <div className="flex flex-col gap-3">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs">📚</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{t.tutor}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">{t.amount}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">✅</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border p-4 mb-4">
          <h2 className="text-base font-extrabold text-foreground mb-3">Recent Notifications</h2>
          <div className="flex flex-col gap-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-sm mt-0.5">🔔</span>
                <div>
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Lesson CTA */}
        <div className="rounded-xl border border-border border-l-4 border-l-secondary p-4 mb-6">
          <p className="text-sm font-bold text-foreground mb-1">📚 Book a Lesson for Sushant</p>
          <p className="text-xs text-muted-foreground mb-3">Find and book a tutor directly from here</p>
          <Button variant="secondary" className="w-full" onClick={() => navigate("/explore")}>
            Find a Tutor for Sushant →
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HouseholdDashboard;
