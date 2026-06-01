type MockupProps = {
  illustration: string;
  title: string;
  subtitle: string;
  accent: string;
};

export default function Mockup({
  illustration,
  title,
  subtitle,
  accent,
}: MockupProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white"
      style={{
        aspectRatio: '3 / 4',
        border: `1px solid ${accent}33`,
        boxShadow: '0 20px 40px rgba(15,23,42,0.12)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: accent }}
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center">
        <span
          className="font-display text-[10px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          InnerScore
        </span>

        <img
          src={illustration}
          alt=""
          aria-hidden
          className="my-4 w-full max-w-[80%]"
        />

        <div>
          <h3 className="font-display text-xl font-bold leading-tight text-[#0f172a] md:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-xs text-[#64748b]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
