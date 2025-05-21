"use client";

import { useTypewriterOnScroll } from "@/hooks/useTypewriterOnScroll";

const JobsHeading = () => {
    const { text, ref } = useTypewriterOnScroll("Latest Jobs");
    return (
        <h3 ref={ref} className="section-heading wrapper max-width m-auto text-center xl:text-left">
        <span className="highlight">
        {text}
          <br className="xl:hidden" />
        </span>{" "}
        You Might Like
      </h3>
    );
};

export default JobsHeading;