import EdifyNavbar from "@/components/EdifyNavbar";
import HeroSection from "@/components/HeroSection";
import RoleSelector from "@/components/RoleSelector";
import SocialProofStrip from "@/components/SocialProofStrip";
import HowItWorks from "@/components/HowItWorks";
import TrustBanner from "@/components/TrustBanner";
import FeaturedTutorsCarousel from "@/components/FeaturedTutorsCarousel";
import GoodFitGuarantee from "@/components/GoodFitGuarantee";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-20">
      <EdifyNavbar />
      <HeroSection />
      <RoleSelector />
      <SocialProofStrip />
      <FeaturedTutorsCarousel />
      <GoodFitGuarantee />
      <HowItWorks />
      <TrustBanner />
      <BottomNav />
    </div>);

};

export default Index;