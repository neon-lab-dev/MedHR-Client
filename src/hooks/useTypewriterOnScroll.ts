// hooks/useTypewriterOnScroll.ts
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useTypewriterOnScroll = (fullText: string, delay = 100) => {
  const [text, setText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView && !hasAnimated) {
      let index = 0;
      let currentText = "";

      const interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setText(currentText);
          index++;
        } else {
          clearInterval(interval);
          setHasAnimated(true);
        }
      }, delay);

      return () => clearInterval(interval);
    }
  }, [inView, hasAnimated, fullText, delay]);

  return { text, ref };
};
