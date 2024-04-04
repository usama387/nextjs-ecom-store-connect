import Collections from "@/components/Collections";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <>
      {/* Hero Section Banner */}
      <Image
        src="/banner.png"
        alt="hero-image"
        width={2000}
        height={1000}
        className="w-screen "
      />

      {/* Collections Component */}
      <Collections />
    </>
  );
};

export default HomePage;
