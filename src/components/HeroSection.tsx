const HeroSection = () => {
  return (
    <section className="relative px-5 pt-10 pb-8 overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/[0.07]" />
        <div className="absolute top-32 -left-16 w-48 h-48 rounded-full bg-secondary/[0.07]" />
        <div className="absolute bottom-0 right-10 w-32 h-32 rounded-full bg-primary/[0.05]" />
        <div className="absolute top-10 left-1/2 w-24 h-24 rounded-full bg-secondary/[0.05]" />
      </div>

      <div className="relative z-10">
        <h1 className="text-[28px] leading-tight font-extrabold text-foreground mb-3">
          Verified Tutors.<br />
          Fair Pay. Real Results.
        </h1>
        <p className="text-muted-foreground text-base">
          Nepal's trust-first tutoring marketplace.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
