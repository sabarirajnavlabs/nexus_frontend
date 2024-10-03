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
          Welcome <span className={styles.gradientText}>User</span>
        </h1>
      </div>
      
      <div className="h-[720px] flex gap-2 relative justify-center items-center text-[20px]">
        <div className="group relative w-[180px] h-[90%] m-2 p-2">
          <div className="w-full h-full rounded-md flex justify-center items-center text-center bg-[#EFF7FF] border-[3px] border-black group-hover:invisible hover:transform-none">
            <div className="-rotate-90">
              Simplified User <br /> Experience
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full rounded-md flex gap-2 p-2 justify-center items-center text-center  opacity-0 group-hover:opacity-100 transition-opacity hover:transform-none">
            <div
              className={`relative flex text-black border-[3px] border-black rounded-md w-[45px] h-full bg-[#EFF7FF] items-center justify-center text-center`}
            >
              <div className="flex -rotate-90 whitespace-nowrap ">IDE</div>
            </div>
            <div
              className={`relative flex text-black border-[3px] border-black rounded-md w-[45px] h-full bg-[#EFF7FF] items-center justify-center text-center`}
            >
              <div className="flex -rotate-90 whitespace-nowrap">
                AI CODING ASSISTANT
              </div>
            </div>

            <div
              className={`relative flex text-black border-[3px] border-black rounded-md w-[45px] h-full bg-[#EFF7FF] items-center justify-center text-center`}
            >
              <div className="flex -rotate-90 whitespace-nowrap">
                1 CLICK WE ACCESS
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[720px] h-[90%] rounded-md m-2 p-2">
          <div className="h-[160px] relative group">
            <div className="h-[160px] bg-[#EFF7FF] border-[3px] border-black rounded-md flex justify-center items-center group-hover:invisible">
              Foundational Model Access
            </div>

            <div className="absolute top-0 left-0 h-[160px] w-full border-[3px] border-[#36DBB3] bg-[#EFF7FF] rounded-md flex p-6 justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="relative w-[110px] h-[35px]">
                <Image
                  src="/whatsnew/1/openai.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[110px] h-[35px]">
                <Image
                  src="/whatsnew/1/antropic.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[110px] h-[69px]">
                <Image
                  src="/whatsnew/1/meta.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[50px] h-[50px]">
                <Image
                  src="/whatsnew/1/huggingfaces.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[50px] h-[50px]">
                <Image
                  src="/whatsnew/1/stability.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>

          <div className="h-[160px] relative group">
            <div className="h-[160px] bg-[#EFF7FF] border-[3px] border-black rounded-md flex justify-center items-center group-hover:invisible">
              Standardized APIs
            </div>

            <div className="absolute top-0 left-0 h-[160px] w-full border-[3px] border-[#36DBB3] bg-[#EFF7FF] rounded-md flex justify-between p-4 items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="relative w-[120px] h-[65px]">
                <Image
                  src="/whatsnew/2/apis.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[120px] h-[65px]">
                <Image
                  src="/whatsnew/2/langchain.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[140px] h-[35px]">
                <Image
                  src="/whatsnew/2/langgraph.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[110px] h-[60px]">
                <Image
                  src="/whatsnew/2/lalama.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[110px] h-[40px]">
                <Image
                  src="/whatsnew/2/crew.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>

          <div className="h-[160px] flex gap-2 rounded-md p-1">
            <div className="w-[50%] h-full relative group">
              <div className="rounded-md w-full h-full bg-[#EFF7FF] border-[3px] border-black flex justify-center items-center text-center group-hover:invisible">
                OPTIMIZED MODEL <br /> TRAINING
              </div>

              <div className="absolute top-0 left-0 w-full h-full border-[3px] border-[#36DBB3] bg-[#EFF7FF] rounded-md flex justify-between p-4 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="relative w-[180px] h-[85px]">
                  <Image
                    src="/whatsnew/3/gpu.svg"
                    alt="vector"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="relative w-[100px] h-[70px]">
                  <Image
                    src="/whatsnew/3/peft.svg"
                    alt="vector"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>

            <div className="w-[50%] h-full relative group">
              <div className="rounded-md w-full h-full bg-[#EFF7FF] border-[3px] border-black flex justify-center items-center text-center group-hover:invisible">
                HYPERSCALE <br /> INTERFACE
              </div>

              <div className="absolute top-0 left-0 w-full h-full border-[3px] border-[#36DBB3] bg-[#EFF7FF] rounded-md flex justify-between p-4 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="relative w-[100px] h-[25px]">
                  <Image
                    src="/whatsnew/4/realtime.svg"
                    alt="vector"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="relative w-[90px] h-[25px]">
                  <Image
                    src="/whatsnew/4/batch.svg"
                    alt="vector"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="relative w-[75px] h-[25px]">
                  <Image
                    src="/whatsnew/4/async.svg"
                    alt="vector"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[160px] relative group">
            <div className="h-[160px] bg-[#EFF7FF] border-[3px] border-black rounded-md flex justify-center items-center group-hover:invisible">
              Compute & Storage
            </div>

            <div className="absolute top-0 left-0 h-[160px] w-full border-[3px] border-[#36DBB3] bg-[#EFF7FF] rounded-md flex justify-between p-8 items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="relative w-[60px] h-[70px]">
                <Image
                  src="/whatsnew/5/gpu.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[220px] h-[100px]">
                <Image
                  src="/whatsnew/5/custom.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-[60px] h-[80px]">
                <Image
                  src="/whatsnew/5/cpu.svg"
                  alt="vector"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative w-[180px] h-[90%] m-2 p-2">
          <div className="w-full h-full rounded-md flex justify-center items-center text-center bg-[#EFF7FF] border-[3px] border-black group-hover:invisible hover:transform-none">
            <div className="rotate-90">RESPONSIBLE AI</div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full rounded-md flex gap-2 p-2 justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity hover:transform-none">
            <div className="relative flex text-black border-[3px] border-black rounded-md w-[45px] h-full bg-[#EFF7FF] items-center justify-center text-center">
              <div className="flex whitespace-nowrap rotate-90">MONITORING</div>
            </div>
            <div className="relative flex text-black border-[3px] border-black rounded-md w-[45px] h-full bg-[#EFF7FF] items-center justify-center text-center">
              <div className="flex whitespace-nowrap  rotate-90">
                ETHICAL AI
              </div>
            </div>
            <div className="relative flex text-black border-[3px] border-black rounded-md w-[45px] h-full bg-[#EFF7FF] items-center justify-center text-center">
              <div className="flex whitespace-nowrap  rotate-90">
                NETWORKING & SECURITY
              </div>
            </div>
          </div>
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
