const DistanceWidget = () => (
  <div className="flex items-center justify-center gap-3 mt-6 mb-4 animate-fade-in">
    <span className="font-serif text-sm text-foreground/70 tracking-wide">D</span>
    <span className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest">(Puducherry)</span>

    <div className="flex items-center gap-2">
      <div className="w-8 h-px bg-gold/40" />
      <span
        className="font-serif text-xs tracking-[0.2em] text-gold"
        style={{ textShadow: "0 0 12px hsl(40 90% 75% / 0.4)" }}
      >
        1,514 KM
      </span>
      <div className="w-8 h-px bg-gold/40" />
    </div>

    <span className="font-serif text-sm text-foreground/70 tracking-wide">Anmona</span>
    <span className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest">(Kolkata)</span>
  </div>
);

export default DistanceWidget;
