const LoveBackground = () => {
  const stars = Array.from({ length: 25 });

  return (
    <div className="love-bg">
      {stars.map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default LoveBackground;
