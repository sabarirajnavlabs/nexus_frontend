"use client";
import React from "react";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";

const AudioModel = () => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={
          theme === "dark"
            ? "bg-[#181818] text-white"
            : "bg-white text-black mt-[-20px] p-2"
        }
      >
        <div
          className={`flex flex-col md:flex-row justify-between items-center pl-4 md:pl-8 rounded-lg shadow-lg border ${
            theme === "dark" ? "border-[#333333]" : "border-gray-300"
          }`}
        >
          <div className="md:w-1/2 md:mt-6 md:mb-6">
            <h1 className="text-3xl font-bold">Audio Model</h1>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Get ready to supercharge your coding experience with our
              AI-powered Code Assistant! Imagine having a coding buddy
              that&apos;s not only smart but also learns from your style —
              auto-completing code, suggesting improvements, and even catching
              bugs before you hit &apos;Run&apos;. Whether you&apos;re cranking
              out Python scripts or tackling complex data models, this tool is
              built to level up your game. It&apos;s like having a 24/7 AI
              co-pilot right in your editor, making every line of code smoother,
              faster, and more fun. Dive in and let the future of coding inspire
              you to create like never before!
            </p>
          </div>
          <div className="md:w-1/2 relative w-[200px] h-[200px]">
            <Image
              src={"/vscode.png"}
              fill
              objectFit="contain"
              alt="AI Classroom"
              className="rounded-lg max-h-[320px]"
            />
          </div>
        </div>
        <section
          id="ai-products"
          className={`my-12 ${
            theme === "dark" ? "bg-[#0C0C0C] text-white" : "bg-white text-black"
          } px-4 py-8 rounded-md`}
        >
          <h2 className="text-3xl font-semibold  mb-4">Base Models</h2>
          <p className="text-lg  mb-8">
            Best-in-class products, solutions, and services to supercharge your
            AI journey. Time to innovate with us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className=" rounded-lg shadow-md">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={"/image2.png"}
                    objectFit="cover"
                    fill
                    alt="AI Product"
                  />
                </div>

                <h3 className="text-xl font-semibold  mb-2 ml-4">Nexus AI</h3>
                <p className="text-sm font-light mb-4 ml-4">
                  Here we can place the info of the things! Some details info.
                </p>
                <div className={`flex gap-2 ml-4 mb-4`}>
                  <button
                    className={` ${
                      theme === "dark"
                        ? "bg-white text-black"
                        : "bg-[#0C0C0C] text-white"
                    } text- px-2 py-1 rounded-2xl font-bold`}
                  >
                    Nexus
                  </button>
                  <button
                    className={` ${
                      theme === "dark"
                        ? "bg-white text-black"
                        : "bg-[#0C0C0C] text-white"
                    } text-sm  px-2 py-1 rounded-2xl w-[40px] font-bold`}
                  >
                    AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AudioModel;
