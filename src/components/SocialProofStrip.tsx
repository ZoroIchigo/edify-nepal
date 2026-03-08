const stats = [
  { label: "2,400+ Students" },
  { label: "200+ Verified Tutors" },
  { label: "4.8★ Avg Rating" },
];

const SocialProofStrip = () => {
  return (
    <section className="px-5 py-4">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {stats.map((stat) => (
          <span
            key={stat.label}
            className="shrink-0 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold"
          >
            {stat.label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SocialProofStrip;
