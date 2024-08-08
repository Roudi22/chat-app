"use client";
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { logo2, logo3 } from "../../public";
const RightImage = () => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center">
      <Image
        src={theme === "dark" ? logo3 : logo2}
        alt="logo"
        width={300}
        height={280}
        className={`mt-20 w-[${theme === "dark" ? "300px" : "500px"}] z-0 pointer-events-none select-none`}
      />
    </div>
  );
};

export default RightImage;
