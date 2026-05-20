type MockupProps = {
  emoji: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
};

export default function Mockup({ emoji, title, subtitle, gradient }: MockupProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        aspectRatio: '3 / 4',
        background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        boxShadow: '0 20px 40px rgba(15,23,42,0.18)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center text-white">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] opacity-80">
          InnerScore
        </span>
        <span className="text-7xl drop-shadow-md" aria-hidden>
          {emoji}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-xs opacity-90">{subtitle}</p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 100%)',
        }}
      />
    </div>
  );
}
