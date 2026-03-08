import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, BadgeCheck, Star, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";

type Step = 1 | 2 | 3 | 4;

const GRADE_OPTIONS = [
  "No preference",
  "Kindergarten",
  "Grade 1 – 5",
  "Grade 6 – 10",
  "Grade 11 & 12",
  "University / Bachelor",
  "Adult Learning",
];

const AVAILABILITY_OPTIONS = [
  { label: "Today", subtitle: "See tutors available right now" },
  { label: "Within a few days", subtitle: "Flexible scheduling this week" },
  { label: "Within two weeks", subtitle: "Plan ahead for upcoming exams" },
  { label: "Sometime this month", subtitle: "No rush, find the best fit" },
];

const MOCK_TUTORS = [
  { name: "Priya Shrestha", initials: "PS", rate: 700, degree: "B.Sc. Physics, TU", rating: 4.8, reviews: 24, subjects: ["Physics", "Math"] },
  { name: "Rohan Adhikari", initials: "RA", rate: 900, degree: "M.Sc. Physics, KU", rating: 4.9, reviews: 41, subjects: ["Physics"] },
  { name: "Sneha Maharjan", initials: "SM", rate: 650, degree: "B.Com. English, TU", rating: 4.7, reviews: 18, subjects: ["English", "Economics"] },
  { name: "Aakash Thapa", initials: "AT", rate: 800, degree: "B.Sc. Physics, PU", rating: 5.0, reviews: 9, subjects: ["Physics", "Math"] },
  { name: "Nisha Pandey", initials: "NP", rate: 750, degree: "M.Ed. Physics, TU", rating: 4.9, reviews: 33, subjects: ["Physics"] },
];

const Explore = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [onlineLocal, setOnlineLocal] = useState<"online" | "local">("online");

  const goBack = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  // Step 1: Search Entry
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
        <div className="px-5 pt-10 pb-6">
          <h1 className="text-2xl font-extrabold text-foreground">Find Your Tutor</h1>
          <p className="text-sm text-muted-foreground mt-1">Search by subject and location</p>

          <div className="mt-6 space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Subject (e.g. Physics, Math, English)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="pl-10 rounded-full h-12"
              />
            </div>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Location (e.g. Kathmandu, Lalitpur, or Online)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 rounded-full h-12"
              />
            </div>
          </div>

          <Button
            className="w-full mt-6"
            size="lg"
            disabled={!subject.trim() || !location.trim()}
            onClick={() => setStep(2)}
          >
            Search Tutors →
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Step 2: Grade Level Filter
  if (step === 2) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-28">
        <StepHeader onBack={goBack} currentDot={0} />
        <div className="px-5 pt-4 pb-6">
          <h1 className="text-xl font-extrabold text-foreground">What grade level do you need tutoring in?</h1>
          <p className="text-sm text-muted-foreground mt-1">We'll match you with the right tutors</p>

          <div className="mt-5 space-y-2">
            {GRADE_OPTIONS.map((g) => (
              <SelectableCard
                key={g}
                label={g}
                selected={selectedGrade === g}
                onSelect={() => setSelectedGrade(g)}
              />
            ))}
          </div>
        </div>
        <FixedBottomButton label="Next →" disabled={!selectedGrade} onClick={() => setStep(3)} />
        <BottomNav />
      </div>
    );
  }

  // Step 3: Availability Filter
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-28">
        <StepHeader onBack={goBack} currentDot={1} />
        <div className="px-5 pt-4 pb-6">
          <h1 className="text-xl font-extrabold text-foreground">When do you need help?</h1>
          <p className="text-sm text-muted-foreground mt-1">We'll prioritize available tutors</p>

          <div className="mt-5 space-y-2">
            {AVAILABILITY_OPTIONS.map((a) => (
              <SelectableCard
                key={a.label}
                label={a.label}
                subtitle={a.subtitle}
                selected={selectedAvailability === a.label}
                onSelect={() => setSelectedAvailability(a.label)}
              />
            ))}
          </div>
        </div>
        <FixedBottomButton label="Show Tutors →" disabled={!selectedAvailability} onClick={() => setStep(4)} />
        <BottomNav />
      </div>
    );
  }

  // Step 4: Results
  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      {/* Header */}
      <nav className="sticky top-0 z-50 flex items-center px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={goBack} className="p-1 -ml-1 text-foreground">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 ml-3">
          <h1 className="text-base font-extrabold text-foreground">{subject} Tutors</h1>
          <p className="text-xs text-muted-foreground">5 verified tutors found near {location}</p>
        </div>
      </nav>

      {/* Online/Local toggle */}
      <div className="px-5 pt-4 pb-2 flex gap-2">
        {(["online", "local"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setOnlineLocal(t)}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
              onlineLocal === t
                ? "bg-primary text-primary-foreground"
                : "border-2 border-muted text-muted-foreground"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { label: "✅ Verified Only", active: true },
          { label: `📍 ${location}`, active: true },
          { label: selectedGrade || "All Grades", active: !!selectedGrade },
          { label: "🕐 Available Soon", active: false },
        ].map((chip) => (
          <span
            key={chip.label}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 ${
              chip.active
                ? "bg-primary text-primary-foreground"
                : "border-2 border-primary text-primary"
            }`}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {/* Tutor cards */}
      <div className="px-5 pt-2 pb-4 space-y-3">
        {MOCK_TUTORS.map((tutor) => (
          <div key={tutor.name} className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-extrabold text-lg flex-shrink-0">
                {tutor.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-bold text-foreground">{tutor.name}</h3>
                  <span className="text-sm font-extrabold text-primary whitespace-nowrap">NPR {tutor.rate}/hr</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                    <BadgeCheck size={14} /> ID Verified
                  </span>
                  <span className="text-xs text-muted-foreground">🎓 {tutor.degree}</span>
                </div>
              </div>
            </div>

            {/* Subject pills */}
            <div className="flex gap-2 mb-3">
              {tutor.subjects.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-primary/[0.12] text-primary text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>

            {/* Rating + recording */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-warning fill-warning" />
                <span className="text-sm font-bold text-foreground">{tutor.rating}</span>
                <span className="text-xs text-muted-foreground">({tutor.reviews} reviews)</span>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Video size={12} /> Recordings available
              </span>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                navigate("/checkout", {
                  state: { tutorName: tutor.name, subject: tutor.subjects[0], rate: tutor.rate },
                })
              }
            >
              Book Trial Lesson →
            </Button>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

/* ---- Shared sub-components ---- */

function StepHeader({ onBack, currentDot }: { onBack: () => void; currentDot: number }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
      <button onClick={onBack} className="p-1 -ml-1 text-foreground">
        <ArrowLeft size={22} />
      </button>
      <div className="flex-1 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === currentDot ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <div className="w-6" />
    </nav>
  );
}

function SelectableCard({
  label,
  subtitle,
  selected,
  onSelect,
}: {
  label: string;
  subtitle?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 rounded-2xl p-4 text-left transition-all border-2 ${
        selected
          ? "border-l-4 border-primary bg-primary/[0.08]"
          : "border-border bg-card"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-primary" : "border-muted-foreground/40"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">{label}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </button>
  );
}

function FixedBottomButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-40">
      <div className="max-w-[430px] mx-auto px-5 py-3 bg-background/95 backdrop-blur-sm border-t border-border">
        <Button className="w-full" size="lg" disabled={disabled} onClick={onClick}>
          {label}
        </Button>
      </div>
    </div>
  );
}

export default Explore;
