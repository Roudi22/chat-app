
import React from "react";
import { logo2, logo3, heroRight2 } from "../../../public";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { useTheme } from "next-themes";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import PreferencesTap from "@/components/PreferencesTap";
import RightImage from "@/components/RightImage";
const page = async () => {
  
  const {isAuthenticated} = getKindeServerSession()
  if ( await isAuthenticated()){ 
    return redirect('/')
  }
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex overflow-hidden dark:bg-[#1c5e6e] bg-[#cbf3fd] relative items-center justify-center px-4">
      <Image src={logo3} alt="logo" className="absolute -left-32 opacity-25 -bottom-28 lg:scale-125 xl:scale-100 scale-[2] pointer-events-none select-none -z-1"/>
      <div className="flex border-[#000] flex-col gap-2 px-4 text-center md:text-start font-semibold">
        <PreferencesTap/>
        <RightImage/>
        <p className="text-2xl md:text-3xl text-balance z-10">
            The <span className="bg-red-500 px-2 font-bold text-white">Most Simple</span> Chat App
        </p>
        <p className="text-2xl md:text-3xl mb-32 text-balance z-10">
            You <span className="bg-green-500/90 px-2 font-bold text-white">Need To</span> Try
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
