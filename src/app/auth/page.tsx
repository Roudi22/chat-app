
import React from "react";
import { logo2, logo3, heroRight2 } from "../../../public";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
const page = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex overflow-hidden dark:bg-[#651c2b55] bg-[#cbf3fd] relative items-center justify-center px-4">
      <Image src={logo3} alt="logo" className="absolute -left-32 opacity-25 -bottom-28 lg:scale-125 xl:scale-100 scale-[2] pointer-events-none select-none -z-1"/>
      <div className="flex border-[#000] flex-col gap-2 px-4 text-center md:text-start font-semibold">
        <Image src={logo2} alt="logo" width={700} height={280} className="mt-20 w-[500px] z-0 pointer-events-none select-none"/>
        <p className="text-2xl md:text-3xl text-balance z-10">
            The <span className="bg-red-500 px-2 font-bold text-white">Ultimate</span> Chat App
        </p>
        <p className="text-2xl md:text-3xl mb-32 text-balance z-10">
            You <span className="bg-green-500/90 px-2 font-bold text-white">Need To</span> Build
        </p>
        <AuthButtons/>
      </div>
      </div>
      <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
        <Image src={heroRight2} alt="hero image" fill className="object-cover dark:opacity-60 opacity-90 pointer-events-none select-none h-full"/>
      </div>
    </div>
  );
};

export default page;
