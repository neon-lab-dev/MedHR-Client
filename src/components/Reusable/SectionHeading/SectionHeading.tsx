"use client";
import { useTypewriterOnScroll } from "@/hooks/useTypewriterOnScroll";
import React from "react";

interface SectionHeadingProps {
  highlightedText: string;
  normalText?: string;
  className?: string;
  align?: "center" | "left" | "right";
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  highlightedText,
  normalText = "",
  className = "",
  align = "center",
}) => {
  const { text, ref } = useTypewriterOnScroll(highlightedText);

  const alignmentClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  return (
    <h3
      ref={ref}
      className={`section-heading max-w-7xl mx-auto px-6 2xl:px-0uto text-center z-10 ${alignmentClass} ${className}`}
    >
      {align === "right" ? (
        <>
          {normalText}{" "}
          <span className="highlight">
            {text}
            <br className="xl:hidden" />
          </span>
        </>
      ) : (
        <>
          <span className="highlight">
            {text}
            <br className="xl:hidden" />
          </span>{" "}
          {normalText}
        </>
      )}
    </h3>
  );
};

export default SectionHeading;
