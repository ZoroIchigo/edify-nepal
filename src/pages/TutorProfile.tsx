import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Star, BadgeCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BottomNav from "@/components/BottomNav";
import { getTutorById } from "@/data/tutors";

const TutorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bioExpanded, setBioExpanded] = useState(false);
  const tutor = getTutorById(id || "");

  if (!tutor) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto flex items-center justify-center">
        <p className="text-muted-foreground">Tutor not found.</p>
      </div>
    );
  }

  const goToCheckout = () =>
    navigate("/checkout", {
      state: { tutorName: tutor.name, subject: tutor.subjects[0], rate: tutor.rate },
    });

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-36">
      {/* Header */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-foreground">
          <ArrowLeft size={22} />
        </button>
        <span className="text-sm text-muted-foreground font-semibold">Tutor Profile</span>
        <button className="p-1 -mr-1 text-muted-foreground">
          <Bookmark size={20} />
        </button>
      </nav>

      <div className="px-5 pt-5 space-y-6">
        {/* SECTION 1: Profile Hero */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-[72px] h-[72px] rounded-full ${tutor.avatarBg} flex items-center justify-center font-extrabold text-xl ${tutor.avatarText} flex-shrink-0`}
              >
                {tutor.initials}
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/[0.12] px-2 py-0.5 rounded-full">
                <BadgeCheck size={12} /> Verified
              </span>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="text-lg font-extrabold text-foreground">{tutor.name}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {tutor.degree}, {tutor.institution}
              </p>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2">
                <div className="flex items-center gap-1">
                  <Star size={13} className="text-warning fill-warning" />
                  <span className="text-xs font-bold text-foreground">{tutor.rating}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{tutor.reviews} reviews</span>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{tutor.hoursTaught} hrs taught</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-2">
            {tutor.subjects.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-primary/[0.12] text-primary text-xs font-bold">
                {s}
              </span>
            ))}
          </div>

          <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Video size={12} /> Lesson recordings available
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-extrabold text-primary">NPR {tutor.rate}</span>
              <span className="text-xs text-muted-foreground ml-1">/ hour</span>
            </div>
            <Button
              size="sm"
              className="rounded-full px-5"
              style={{ backgroundColor: "#6D557E" }}
              onClick={goToCheckout}
            >
              Book Trial Lesson
            </Button>
          </div>
        </div>

        {/* SECTION 2: About */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-2">
            About {tutor.name.split(" ")[0]}
          </h2>
          <Separator className="mb-3" />
          <div className="relative">
            <p
              className={`text-sm text-muted-foreground leading-relaxed ${
                !bioExpanded ? "line-clamp-3" : ""
              }`}
            >
              {tutor.bio}
            </p>
            {!bioExpanded && (
              <button
                onClick={() => setBioExpanded(true)}
                className="text-xs font-bold mt-1"
                style={{ color: "#6D557E" }}
              >
                Read more →
              </button>
            )}
          </div>
        </div>

        {/* SECTION 3: Education */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-2">Education</h2>
          <Separator className="mb-3" />
          <div className="space-y-3">
            <div>
              <p className="text-sm font-bold text-foreground">{tutor.institution}</p>
              <p className="text-xs text-muted-foreground">{tutor.degree}</p>
            </div>
            {tutor.secondaryEducation && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-bold text-foreground">{tutor.secondaryEducation.institution}</p>
                  <p className="text-xs text-muted-foreground">{tutor.secondaryEducation.degree}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SECTION 4: Policies */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-2">Policies</h2>
          <Separator className="mb-3" />
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-base">💰</span>
              <div>
                <p className="text-sm font-bold text-foreground">Hourly Rate</p>
                <p className="text-sm font-bold text-foreground">NPR {tutor.rate} per hour</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <span className="text-base">📅</span>
              <div>
                <p className="text-sm font-bold text-foreground">Lesson Cancellation</p>
                <p className="text-sm font-bold text-foreground">2 hours notice required</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <span className="text-base">✅</span>
              <div>
                <p className="text-sm font-bold text-primary">Background check passed</p>
                <p className="text-xs text-muted-foreground">Verified by Edify on {tutor.backgroundCheckDate}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <span className="text-base">🛡️</span>
              <div>
                <p className="text-sm text-foreground">
                  Your first lesson is backed by our{" "}
                  <button
                    className="font-bold"
                    style={{ color: "#6D557E" }}
                    onClick={() => navigate("/account", { state: { screen: "faq", faqIndex: 2 } })}
                  >
                    Good Fit Guarantee
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Schedule */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-2">Schedule</h2>
          <Separator className="mb-3" />
          <div className="space-y-2">
            {tutor.schedule.map((s) => (
              <div key={s.day} className="flex justify-between py-1">
                <span className="text-sm font-bold text-foreground">{s.day}</span>
                <span
                  className="text-sm"
                  style={{ color: s.time ? "#667e55" : "#6B7280" }}
                >
                  {s.time || "Unavailable"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Approved Subjects */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-2">Approved Subjects</h2>
          <Separator className="mb-2" />
          <p className="text-xs text-muted-foreground mb-3">Verified by Edify academic team</p>
          <div className="grid grid-cols-2 gap-2">
            {tutor.approvedSubjects.map((s) => (
              <span
                key={s}
                className="px-3 py-2 rounded-full bg-primary/[0.10] text-primary text-xs font-bold text-center"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 7: Reviews */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-0.5">Student Reviews</h2>
          <p className="text-xs text-muted-foreground mb-2">
            {tutor.reviews} reviews • ⭐ {tutor.rating} average
          </p>
          <Separator className="mb-3" />

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-extrabold text-primary">{tutor.rating}</span>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i <= Math.round(tutor.rating) ? "text-warning fill-warning" : "text-muted-foreground/30"}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Based on {tutor.reviews} lessons
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {tutor.reviewsList.map((r, i) => (
              <div key={i} className="bg-card rounded-xl p-3 shadow-sm">
                <div className="flex items-start gap-2.5 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full ${r.avatarBg} flex items-center justify-center text-xs font-extrabold text-secondary-foreground flex-shrink-0`}
                  >
                    {r.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-foreground">{r.name}</p>
                        <p className="text-[10px] text-muted-foreground">{r.role}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          className={s <= r.stars ? "text-warning fill-warning" : "text-muted-foreground/30"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          <button
            className="w-full text-center text-xs font-bold mt-3 py-2"
            style={{ color: "#6D557E" }}
          >
            View all {tutor.reviews} reviews →
          </button>
        </div>

        {/* SECTION 8: Location */}
        <div>
          <h2 className="text-base font-extrabold text-foreground mb-2">Location</h2>
          <Separator className="mb-3" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">📍 Based in: {tutor.location}, {tutor.province}</p>
            {tutor.onlineAvailable && (
              <p className="text-sm text-muted-foreground">💻 Also available online via Edify Meet</p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-14 left-0 right-0 z-40">
        <div className="max-w-[430px] mx-auto flex items-center justify-between px-5 py-3 bg-background border-t" style={{ borderColor: "#E5E7EB" }}>
          <div>
            <span className="text-base font-extrabold text-primary">NPR {tutor.rate}</span>
            <span className="text-xs text-muted-foreground ml-1">/ hour</span>
          </div>
          <Button
            size="sm"
            className="rounded-full px-5"
            style={{ backgroundColor: "#6D557E" }}
            onClick={goToCheckout}
          >
            Book Trial Lesson →
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default TutorProfile;
