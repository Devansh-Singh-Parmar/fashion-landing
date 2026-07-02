export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-hero-gradient" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(#d9d4cb 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 72%)",
        }}
      />

      {/* floating line-art motifs */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[6%] top-[24%] h-16 w-16 animate-float-a text-brand-500 opacity-50 sm:h-20 sm:w-20 motion-reduce:animate-none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 20a6 6 0 106 6c0-3-6-6-6-6" />
          <path d="M50 32v6l-30 20a4 4 0 002 8h56a4 4 0 002-8L52 38" />
        </g>
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[7%] top-[30%] h-14 w-14 animate-float-b text-clay-500 opacity-55 sm:h-[4.5rem] sm:w-[4.5rem] motion-reduce:animate-none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 42h52l-4 34H28z" />
          <path d="M38 42v-6a12 12 0 0124 0v6" />
        </g>
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-[8%] right-[15%] hidden h-14 w-14 animate-float-a text-brand-500 opacity-40 sm:block motion-reduce:animate-none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="52" r="24" />
          <path d="M50 52V38M50 52l12 6M42 22h16M50 22v6" />
        </g>
      </svg>

      <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-white/40 blur-3xl" />
      <div className="absolute bottom-[-15%] left-[-5%] h-[320px] w-[320px] rounded-full bg-brand-700/10 blur-3xl" />
    </div>
  );
}
