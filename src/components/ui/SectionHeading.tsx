import Reveal from "@/components/motion/Reveal";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "inverted";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const textTone = theme === "inverted" ? "text-white" : "text-garage-black";
  const bodyTone = theme === "inverted" ? "text-white/80" : "text-garage-gray";

  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      {eyebrow ? (
        <Reveal preset="fade" className="mb-3">
          <p
            className={`type-label ${
              theme === "inverted" ? "text-garage-lilacSoft" : "text-garage-blue"
            }`}
          >
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal>
        <h2 className={`type-h2 ${textTone}`}>{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.08} className={`mt-5 max-w-2xl ${centered ? "mx-auto" : ""}`}>
          <p className={`type-body-lg ${bodyTone} ${centered ? "mx-auto text-center" : ""}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
