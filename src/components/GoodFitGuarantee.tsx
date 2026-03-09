const GoodFitGuarantee = () => {
  return (
    <section className="px-5 py-2">
      <div className="relative rounded-2xl p-5 overflow-hidden border-l-4 border-l-primary"
        style={{ background: "linear-gradient(135deg, hsl(97 20% 41% / 0.08), hsl(274 18% 41% / 0.06))" }}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🛡️</span>
            <span className="text-sm font-extrabold text-primary">Good Fit Guarantee</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Not satisfied with your first hour? We'll refund your full booking fee — no questions asked.
          </p>
          <button className="text-xs font-bold text-primary">Learn how it works →</button>
        </div>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl font-extrabold text-secondary/10 select-none pointer-events-none">
          100%
        </span>
      </div>
    </section>
  );
};

export default GoodFitGuarantee;
