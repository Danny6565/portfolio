export default function Earth() {
  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      {/* Outer atmosphere glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: "140%",
          height: "140%",
          background:
            "radial-gradient(circle, transparent 48%, rgba(56,189,248,0.10) 62%, rgba(56,189,248,0.04) 78%, transparent 100%)",
        }}
      />
      {/* Inner atmosphere haze */}
      <div
        className="absolute rounded-full"
        style={{
          width: "110%",
          height: "110%",
          background:
            "radial-gradient(circle, transparent 58%, rgba(147,210,250,0.18) 73%, rgba(56,189,248,0.06) 90%, transparent 100%)",
          filter: "blur(5px)",
        }}
      />

      {/* Globe */}
      <div
        className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden relative"
        style={{
          boxShadow:
            "inset -30px -20px 60px rgba(0,0,0,0.80), inset 10px 10px 28px rgba(255,255,255,0.04), 0 0 80px rgba(56,189,248,0.28), 0 0 160px rgba(56,189,248,0.10)",
        }}
      >
        {/* Rotating surface */}
        <div
          className="absolute inset-y-0"
          style={{
            width: "200%",
            left: 0,
            animation: "earth-rotate 30s linear infinite",
            background: `linear-gradient(to right,
              #1e3a8a 0%,
              #1d4ed8 5%,
              #1e40af 12%,
              #166534 15%,
              #15803d 19%,
              #2d8b2d 22%,
              #166534 24%,
              #1e40af 27%,
              #1e3a8a 34%,
              #1d4ed8 39%,
              #166534 42%,
              #92400e 44%,
              #a16207 46%,
              #166534 47%,
              #1e40af 49%,
              #1e3a8a 50%,
              #1e3a8a 50%,
              #1d4ed8 55%,
              #1e40af 62%,
              #166534 65%,
              #15803d 69%,
              #2d8b2d 72%,
              #166534 74%,
              #1e40af 77%,
              #1e3a8a 84%,
              #1d4ed8 89%,
              #166534 92%,
              #92400e 94%,
              #a16207 96%,
              #166534 97%,
              #1e40af 99%,
              #1e3a8a 100%
            )`,
          }}
        />

        {/* Cloud wisps layer (slightly slower rotation) */}
        <div
          className="absolute inset-y-0"
          style={{
            width: "200%",
            left: 0,
            animation: "earth-rotate 45s linear infinite",
            background: `repeating-linear-gradient(
              to right,
              transparent 0px,
              transparent 55px,
              rgba(255,255,255,0.04) 55px,
              rgba(255,255,255,0.07) 75px,
              transparent 75px,
              transparent 130px,
              rgba(255,255,255,0.03) 130px,
              rgba(255,255,255,0.05) 148px,
              transparent 148px
            )`,
          }}
        />

        {/* Sphere lighting overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.12) 0%, transparent 44%, rgba(0,0,0,0.60) 100%)",
          }}
        />
      </div>
    </div>
  );
}
