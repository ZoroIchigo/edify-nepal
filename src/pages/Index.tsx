import EdifyNavbar from "@/components/EdifyNavbar";
import HeroSection from "@/components/HeroSection";
import RoleSelector from "@/components/RoleSelector";
import SocialProofStrip from "@/components/SocialProofStrip";
import HowItWorks from "@/components/HowItWorks";
import TrustBanner from "@/components/TrustBanner";
import TutorCard from "@/components/TutorCard";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      <EdifyNavbar />
      <HeroSection />
      <RoleSelector />
      <SocialProofStrip />
      <HowItWorks />
      <TrustBanner />

      {/* Sample Tutor Card Preview */}
      <section className="px-5 py-6">
        <h2 className="text-lg font-extrabold text-foreground mb-1">Featured Tutor</h2>
        <p className="text-sm text-muted-foreground mb-4">From our verified community</p>
        <TutorCard />
      </section>

      <BottomNav />
    </div>
  );
};

export default Index;
