"use client";
import React from "react";
import { useTheme } from "next-themes";
import styles from "./main.module.css";
import Image from "next/image";

const WhatsNew = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-[80vw] relative items-center justify-center ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <div className="flex flex-col gap-4 m-4 g-4 items-center justify-center">
        <h1 className="text-[65px] text-center font-semibold font-sans">
          Welcome Back
        </h1>
        <h1
          className={`text-[70px] font-semibold text-center font-sans ${styles.gradientText}`}
        >
          User
        </h1>
      </div>
      <div className="h-[720px] flex gap-2 relative justify-center items-center text-[20px]">
        <div className="w-[180px] h-[90%] rounded-md m-2 p-2 flex justify-center items-center text-center bg-[#EFF7FF] border-[3px] border-black">
          <div className="-rotate-90">
            Simplified User <br /> Experience
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[720px] h-[90%] rounded-md m-2 p-2">
          <div className="h-[160px] bg-[#EFF7FF] border-[3px] border-black rounded-md p-1 flex justify-center items-center">
            Foundational Model Access
          </div>
          <div className="h-[160px] bg-[#EFF7FF] border-[3px] border-black rounded-md p-1 flex justify-center items-center">
            Standardized APIs
          </div>
          <div className="h-[160px] flex gap-2 rounded-md p-1">
            <div className="w-[50%] rounded-md bg-[#EFF7FF] border-[3px] border-black flex justify-center items-center text-center">
              OPTIMIZED MODEL <br /> TRAINING
            </div>
            <div className="w-[50%] rounded-md bg-[#EFF7FF] border-[3px] border-black flex justify-center items-center text-center">
              HYPERSCALE <br /> INTERFACE
            </div>
          </div>
          <div className="h-[160px] rounded-md p-1 bg-[#EFF7FF] border-[3px] border-black flex justify-center items-center text-center">
            COMPUTE & STORAGE
          </div>
        </div>
        <div className="w-[180px] h-[90%] rounded-md m-2 p-2 flex justify-center items-center text-center bg-[#EFF7FF] border-[3px] border-black">
          <div className="rotate-90">RESPONSIBLE AI</div>
        </div>
      </div>
      <div className="h-[550px] flex flex-col gap-7 m-4 g-4 relative items-center justify-center">
        <div className="flex gap-2 h-[330px]">
          <div className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center">
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/Vector.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center">
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/gpuicon.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center">
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/webapp.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center">
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/cloud.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center">
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/website.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="h-[160px] w-full flex items-center justify-center text-center bg-[#EFF7FF] border-4 border-black rounded-md"></div>
      </div>
    </div>
  );
};

export default WhatsNew;
