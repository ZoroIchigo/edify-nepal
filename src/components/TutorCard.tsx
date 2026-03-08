import { BadgeCheck, Star, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const TutorCard = () => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-extrabold text-lg flex-shrink-0">
          AS
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground">Aaryav Sharma</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="flex items-center gap-1 text-xs text-primary font-semibold">
              <BadgeCheck size={14} /> ID Verified
            </span>
            <span className="text-xs text-muted-foreground">
              🎓 B.Sc. Physics, TU
            </span>
          </div>
        </div>
      </div>

      {/* Subject pills */}
      <div className="flex gap-2 mb-3">
        <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">Physics</span>
        <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">Math</span>
      </div>

      {/* Rating + recording */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Star size={14} className="text-warning fill-warning" />
          <span className="text-sm font-bold text-foreground">4.9</span>
          <span className="text-xs text-muted-foreground">(38 reviews)</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Video size={12} /> Recordings available
        </span>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-extrabold text-foreground">NPR 800</span>
          <span className="text-xs text-muted-foreground ml-1">/ hour</span>
        </div>
        <Button variant="secondary" size="sm">
          Book Trial Lesson
        </Button>
      </div>
    </div>
  );
};

export default TutorCard;
