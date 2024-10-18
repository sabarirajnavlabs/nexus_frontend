"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import styles from "./main.module.css";
import Image from "next/image";
import { ReactTyped } from "react-typed";

const WhatsNew = () => {
  const { theme } = useTheme();
  const [hoverText, setHoverText] = useState("");

  return (
    <div
      className={`w-[80vw] relative items-center justify-center ${
        theme === "dark" ? "text-white border-white" : "text-black border-black"
      }`}
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-[36px] text-center font-semibold font-sans">
          <span className={styles.gradientText}>Nexus AI</span> <br />
          {/* <span className="text-[40px] font-normal flex">
            All-In-One AI Platform For
            <div className="">
              <span className={`ml-2 ${styles.gradientText}`}>
                <ReactTyped
                  strings={[
                    "SOFTWARE TEAMS",
                    "DEVELOPERS",
                    "RESEARCHERS",
                    "DATA SCIENTISTS",
                    "ML ENGINEERS",
                  ]}
                  typeSpeed={30}
                  backSpeed={30}
                  loop={true}
                  showCursor={false}
                />
              </span>
            </div>
          </span> */}
        </h1>
        {/* <h1 className="text-5xl font-bold text-black text-center">
          All-In-One AI Platform For <br />
          <span className={`ml-2 ${styles.gradientText}`}>
            <ReactTyped
              strings={[
                "SOFTWARE TEAMS",
                "DEVELOPERS",
                "RESEARCHERS",
                "DATA SCIENTISTS",
                "ML ENGINEERS",
              ]}
              typeSpeed={10}
              backSpeed={10}
              loop={true}
              showCursor={false}
            />
          </span>
        </h1> */}
      </div>

      <div className="h-[720px] flex gap-2 relative justify-center items-center text-[20px]">
        <div className="group relative w-[180px] h-[90%] m-2 p-2">
          <div
            className={`w-full h-full rounded-md flex justify-center items-center text-center border-[3px] group-hover:invisible hover:transform-none ${
              theme === "dark" ? "border-white" : "border-black"
            }`}
          >
            <div className="-rotate-90">
              Simplified User <br /> Experience
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full rounded-md flex gap-2 p-2 justify-center items-center text-center  opacity-0 group-hover:opacity-100 transition-opacity hover:transform-none">
            <div
              className={`relative flex border-[3px] rounded-md w-[45px] h-full items-center justify-center text-center ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              <div className="flex -rotate-90 whitespace-nowrap ">IDE</div>
            </div>
            <div
              className={`relative flex border-[3px] rounded-md w-[45px] h-full items-center justify-center text-center ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              <div className="flex -rotate-90 whitespace-nowrap">
                AI CODING ASSISTANT
              </div>
            </div>

            <div
              className={`relative flex border-[3px] rounded-md w-[45px] h-full items-center justify-center text-center ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              <div className="flex -rotate-90 whitespace-nowrap">
                1 CLICK WE ACCESS
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[720px] h-[90%] rounded-md m-2 p-2">
          <div className="h-[160px] relative group">
            <div
              className={`h-[160px] border-[3px] rounded-md flex justify-center items-center group-hover:invisible ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
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
            <div
              className={`${
                theme === "dark" ? "border-white" : "border-black"
              } h-[160px] border-[3px] rounded-md flex justify-center items-center group-hover:invisible`}
            >
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
              <div
                className={`rounded-md w-full h-full border-[3px] flex justify-center items-center text-center group-hover:invisible ${
                  theme === "dark" ? "border-white" : "border-black"
                }`}
              >
                Optimized Model <br /> Training
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
              <div
                className={`rounded-md w-full h-full border-[3px] flex justify-center items-center text-center group-hover:invisible ${
                  theme === "dark" ? "border-white" : "border-black"
                }`}
              >
                Hyperscale <br /> Interface
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
            <div
              className={`h-[160px] border-[3px] rounded-md flex justify-center items-center group-hover:invisible ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
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
          <div
            className={`w-full h-full rounded-md flex justify-center items-center text-center border-[3px] group-hover:invisible hover:transform-none ${
              theme === "dark" ? "border-white" : "border-black"
            }`}
          >
            <div className="rotate-90">Responsible AI</div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full rounded-md flex gap-2 p-2 justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity hover:transform-none">
            <div
              className={` ${
                theme === "dark" ? "border-white" : "border-black"
              } relative flex border-[3px] rounded-md w-[45px] h-full items-center justify-center text-center`}
            >
              <div className="flex whitespace-nowrap rotate-90">Monitoring</div>
            </div>
            <div
              className={`${
                theme === "dark" ? "border-white" : "border-black"
              } relative flex border-[3px] rounded-md w-[45px] h-full items-center justify-center text-center`}
            >
              <div className="flex whitespace-nowrap  rotate-90">
                Ethical AI
              </div>
            </div>
            <div
              className={`${
                theme === "dark" ? "border-white" : "border-black"
              } relative flex border-[3px] rounded-md w-[45px] h-full items-center justify-center text-center`}
            >
              <div className="flex whitespace-nowrap  rotate-90">
                Networking & Security
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[550px] flex flex-col gap-7 m-4 g-4 relative items-center justify-center">
        <div className="flex gap-2 h-[330px]">
          <div
            className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center hover:scale-110 hover:mr-2 transition-transform duration-300"
            onMouseEnter={() =>
              setHoverText(
                "State-of-art foundational model access including OpenAl, Anthropic Claude, Meta Llama3 and more. Custom APIs for secure model access"
              )
            }
            onMouseLeave={() => setHoverText("")}
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/Vector.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div
            className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center hover:scale-110 hover:mx-2 transition-transform duration-300"
            onMouseEnter={() =>
              setHoverText(
                "Access to wide range of GPUs, CPUs with support for Single-GPU, Multi-GPU/node fine-tuning with PEFT LoRA and a selection of inference options"
              )
            }
            onMouseLeave={() => setHoverText("")}
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/gpuicon.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div
            className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center hover:scale-110 hover:mx-2 transition-transform duration-300"
            onMouseEnter={() =>
              setHoverText(
                "Fully integrated coding IDEs (VSCode) and JupyterLab environment with Al coding assistant support. Docker container with ML, DL and Al libraries"
              )
            }
            onMouseLeave={() => setHoverText("")}
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/webapp.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div
            className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center hover:scale-110 hover:mx-2 transition-transform duration-300"
            onMouseEnter={() =>
              setHoverText(
                "Cloud native platform with simple web browser access. High performance and cost optimized compute, storage, network and security"
              )
            }
            onMouseLeave={() => setHoverText("")}
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/whatsnew/cloud.svg"
                alt="vector"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div
            className="w-[215px] rounded-sm border-4 border-black flex relative items-center justify-center hover:scale-110 hover:ml-2 transition-transform duration-300"
            onMouseEnter={() =>
              setHoverText(
                "End-to-end monitoring for reliability, availability, and performance with metrics and alarms. Audit of API calls for every user of the platform"
              )
            }
            onMouseLeave={() => setHoverText("")}
          >
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
        <div className="h-[160px] w-full flex items-center justify-center text-center border-4 border-black rounded-md text-[25px] p-4 px-14">
          <p className="h-full flex justify-center items-center text-center">
            {hoverText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
