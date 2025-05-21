"use client";
import NextTopLoader from "nextjs-toploader";

import React from "react";

const TopLoader = () => {
  return (
    <NextTopLoader
      color="#F9533A"
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      easing="ease"
      speed={200}
      shadow="linear-gradient(180deg, #F9533A 0%, #C22A13 93.51%)"
      zIndex={1600}
    />
  );
};

export default TopLoader;
