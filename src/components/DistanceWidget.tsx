const DistanceWidget = () => (
  <div className="flex flex-col items-center mt-6 mb-4 animate-fade-in gap-2">
    <div className="flex items-center gap-3">
      <span className="font-serif text-sm text-foreground/70 tracking-wide">Puducherry</span>

      <div className="flex items-center gap-2">
        <div className="w-10 h-px bg-gold/40" />
        <span
          className="font-serif text-xs tracking-[0.2em] text-gold"
          style={{ textShadow: "0 0 12px hsl(40 90% 75% / 0.4)" }}
        >
          1,514 KM
        </span>
        <div className="w-10 h-px bg-gold/40" />
      </div>

      <span className="font-serif text-sm text-foreground/70 tracking-wide">Kolkata</span>
    </div>

    <p className="font-serif text-[11px] italic text-muted-foreground/60 mt-1">
      The distance is just a test to see how far love can travel.
    </p>
  </div>
);

export default DistanceWidget;
