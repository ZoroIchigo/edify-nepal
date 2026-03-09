import { useState, useCallback } from "react";
import { BadgeCheck, Star, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

const tutors = [
  {
    name: "Aaryav Sharma",
    initials: "AS",
    avatarBg: "bg-primary/20",
    avatarText: "text-primary",
    credential: "🎓 B.Sc. Physics, TU",
    subjects: ["Physics", "Math"],
    rating: 4.9,
    reviews: 38,
    price: "NPR 800",
    ctaBg: "bg-secondary",
  },
  {
    name: "Priya Shrestha",
    initials: "PS",
    avatarBg: "bg-secondary",
    avatarText: "text-secondary-foreground",
    credential: "🎓 B.Ed. Mathematics, TU",
    subjects: ["Math", "Statistics"],
    rating: 4.8,
    reviews: 31,
    price: "NPR 700",
    ctaBg: "bg-secondary",
  },
  {
    name: "Rohan Adhikari",
    initials: "RA",
    avatarBg: "bg-primary",
    avatarText: "text-primary-foreground",
    credential: "🎓 M.Sc. Physics, KU",
    subjects: ["Physics", "Chemistry"],
    rating: 4.9,
    reviews: 41,
    price: "NPR 900",
    ctaBg: "bg-secondary",
  },
];

const FeaturedTutorsCarousel = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Attach listener
  if (emblaApi) {
    emblaApi.on("select", onSelect);
  }

  return (
    <section className="py-6">
      <div className="px-5">
        <h2 className="text-lg font-extrabold text-foreground mb-1">Featured Tutors</h2>
        <p className="text-sm text-muted-foreground mb-4">From our verified community</p>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {tutors.map((tutor, i) => (
            <div key={i} className="flex-[0_0_85%] min-w-0 pl-5" style={i === tutors.length - 1 ? { paddingRight: 20 } : {}}>
              <div className="bg-card rounded-2xl p-4 shadow-sm">
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
                      <span className="text-xs text-muted-foreground">{tutor.credential}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {tutor.subjects.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">{s}</span>
                  ))}
                </div>
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
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-foreground">{tutor.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">/ hour</span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => navigate("/checkout")}>
                    Book Trial Lesson →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
