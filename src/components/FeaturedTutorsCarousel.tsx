import { useState, useCallback, useRef } from "react";
import { BadgeCheck, Star, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ALL_TUTORS } from "@/data/tutors";

const tutors = ALL_TUTORS.slice(0, 3);

const FeaturedTutorsCarousel = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild?.clientWidth ?? 1;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(index, tutors.length - 1));
  }, []);

  return (
    <section className="py-6">
      <div className="px-5">
        <h2 className="text-lg font-extrabold text-foreground mb-1">Featured Tutors</h2>
        <p className="text-sm text-muted-foreground mb-4">From our verified community</p>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 px-5 overflow-x-scroll"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {tutors.map((tutor, i) => (
          <div
            key={i}
            className="min-w-[80%] flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <div
              className="bg-card rounded-2xl p-4 shadow-sm cursor-pointer"
              onClick={() => navigate(`/tutor/${tutor.id}`)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-14 h-14 rounded-full ${tutor.avatarBg} flex items-center justify-center font-extrabold text-lg flex-shrink-0 ${tutor.avatarText}`}>
                  {tutor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground">{tutor.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                      <BadgeCheck size={14} /> ID Verified
                    </span>
                    <span className="text-xs text-muted-foreground">🎓 {tutor.degree}, {tutor.institution}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                {tutor.subjects.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-primary/[0.12] text-primary text-xs font-bold">{s}</span>
                ))}
              </div>
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-warning fill-warning" />
                  <span className="text-sm font-bold text-foreground">{tutor.rating}</span>
                  <span className="text-xs text-muted-foreground">({tutor.reviews} reviews)</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Video size={12} /> Recordings available
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  ⏱ {tutor.hoursTaught} hrs taught
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <span className="text-lg font-extrabold text-foreground">NPR {tutor.rate}</span>
                  <span className="text-xs text-muted-foreground ml-1">/ hour</span>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-3"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/checkout", { state: { tutorName: tutor.name, subject: tutor.subjects[0], rate: tutor.rate } });
                }}
              >
                Book Trial Lesson
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {tutors.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? "bg-primary w-4" : "bg-primary/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedTutorsCarousel;
