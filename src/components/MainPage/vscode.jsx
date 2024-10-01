"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";
import image from "/public/vscode.png";
import Cookies from "js-cookie";

const Vscode = () => {
  const { theme } = useTheme();

  const postData = async (orgName) => {
    try {
      const res = await fetch(
        `https://nsh6zxrxlj.execute-api.us-east-1.amazonaws.com/testing/diy/${orgName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: Cookies.get("__session") || "",
          },
          body: JSON.stringify({
            orgName: orgName,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const handleLaunchVSC = async () => {
    setIsDisabled(true);

    const orgName = "testing";
    const url = await postData(orgName);
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Failed to retrieve URL");
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, 60000);
  };

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
            <h1 className="text-3xl font-bold">VS Code Editor</h1>
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

        <div
          className={`mt-12 p-6 ${
            theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-200"
          } shadow-lg border rounded-lg border-[#333333]`}
        >
          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            Code Editor Small{" "}
            <span
              className={`text-[14px] font-normal ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Intel Skylake E5 | CPU | x86_64 | 2 vCPUs | 4 GiB
            </span>
          </h2>
          <hr className="m-auto border border-teal-500 mt-4 mb-10" />
          <div className="rounded-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <h3 className="text-lg font-semibold text-white">VS Code</h3>
            </div>
            {/* <div className="flex gap-10">
              <div className="mb-6 flex-grow">
                <label
                  htmlFor="cpuSlider"
                  className={`block mb-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  CPU
                </label>
                <div className="flex gap-10 justify-center items-center">
                  <div className="w-[100%]">
                    <input
                      type="range"
                      id="cpuSlider"
                      min="0"
                      max="1"
                      step="0.01"
                      value={cpu}
                      onChange={(e) => setCpu(e.target.value)}
                      className="slider"
                    />
                    <div
                      className={`flex justify-between mt-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span>0</span>
                      <span>0.25</span>
                      <span>0.5</span>
                      <span>0.75</span>
                      <span>1</span>
                    </div>
                  </div>
                  <div
                    className={`text-center mt-2 inline-block border min-w-[50px] ${
                      theme === "dark"
                        ? "border-gray-400 text-gray-400"
                        : "border-gray-600 text-gray-600"
                    } p-2`}
                  >
                    {cpu}
                  </div>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <label
                  htmlFor="gpuSlider"
                  className={`block mb-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  GPU
                </label>
                <div className="flex gap-10 justify-center items-center">
                  <div className="w-[100%]">
                    <input
                      type="range"
                      id="gpuSlider"
                      min="0"
                      max="1"
                      step="0.01"
                      value={gpu}
                      onChange={(e) => setGpu(e.target.value)}
                      className="slider"
                    />
                    <div
                      className={`flex justify-between mt-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span>0</span>
                      <span>0.25</span>
                      <span>0.5</span>
                      <span>0.75</span>
                      <span>1</span>
                    </div>
                  </div>
                  <div
                    className={`text-center mt-2 inline-block border min-w-[50px] ${
                      theme === "dark"
                        ? "border-gray-400 text-gray-400"
                        : "border-gray-600 text-gray-600"
                    } p-2`}
                  >
                    {gpu}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex justify-around items-start mt-6 space-x-8">
              <div className="text-center">
                <p className="font-bold">App</p>
                <Image
                  src="/vscode.png"
                  alt="Code Editor App"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">VS Code</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Compute</p>
                <Image
                  src="/Res_Amazon-EC2_Instance_48.png"
                  alt="Intel"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">Intel</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Storage</p>
                <Image
                  src="/Res_Amazon-Elastic-Block-Store_Volume_48.png"
                  alt="Storage"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">5 GB</p>
              </div>
              <div className="text-center">
                <p className="font-bold">GitHub</p>
                {theme === "dark" ? (
                  <Image
                    src="/github-mark-white.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto mt-4"
                  />
                ) : (
                  <Image
                    src="/github-mark.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto mt-4"
                  />
                )}
                <p className="mt-2 ">Repo</p>
              </div>
              <div className="text-center">
                <p className="font-bold">AI</p>
                <Image
                  src="/cody-logo.svg"
                  alt="Cody"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">Coding Assistant</p>
              </div>
              <div className="text-center mt-10">
                {isDisabled ? (
                  <button
                    className="bg-gray-400 text-black py-2 px-4 rounded"
                    disabled
                  >
                    Launching...
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => handleLaunchVSC()}
                  >
                    Launch
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-12 p-6 ${
            theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-200"
          } shadow-lg border rounded-lg border-[#333333]`}
        >
          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            Code Editor Medium{" "}
            <span
              className={`text-[14px] font-normal ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Intel Xeon Platinum | CPU | x86_64 | 4 vCPUs | 16 GiB
            </span>
          </h2>
          <hr className="m-auto border border-teal-500 mt-4 mb-10" />
          <div className="rounded-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <h3 className="text-lg font-semibold text-white">VS Code</h3>
            </div>
            <div className="flex justify-around items-start mt-6 space-x-8">
              <div className="text-center">
                <p className="font-bold">App</p>
                <Image
                  src="/vscode.png"
                  alt="Code Editor App"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">VS Code</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Compute</p>
                <Image
                  src="/Res_Amazon-EC2_Instance_48.png"
                  alt="Intel"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">Intel</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Storage</p>
                <Image
                  src="/Res_Amazon-Elastic-Block-Store_Volume_48.png"
                  alt="Storage"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">5 GB</p>
              </div>
              <div className="text-center">
                <p className="font-bold">GitHub</p>
                {theme === "dark" ? (
                  <Image
                    src="/github-mark-white.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto mt-4"
                  />
                ) : (
                  <Image
                    src="/github-mark.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto mt-4"
                  />
                )}
                <p className="mt-2 ">Repo</p>
              </div>
              <div className="text-center">
                <p className="font-bold">AI</p>
                <Image
                  src="/cody-logo.svg"
                  alt="Cody"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2">Coding Assistant</p>
              </div>
              <div className="text-center mt-10">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  disabled
                >
                  Contact Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-12 p-6 ${
            theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-200"
          } shadow-lg border rounded-lg border-[#333333]`}
        >
          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            Code Editor Large{" "}
            <span
              className={`text-[14px] font-normal ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              AMD EPYC | GPU | Nvidia A10G | 4 vCPUs | 16 GiB
            </span>
          </h2>
          <hr className="m-auto border border-teal-500 mt-4 mb-10" />
          <div className="rounded-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <h3 className="text-lg font-semibold text-white">VS Code</h3>
            </div>
            <div className="flex justify-around items-start mt-6 space-x-8">
              <div className="text-center">
                <p className="font-bold">App</p>
                <Image
                  src="/vscode.png"
                  alt="Code Editor App"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">VS Code</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Compute</p>
                <Image
                  src="/Res_Amazon-EC2_Instance_48.png"
                  alt="Intel"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">AMD</p>
              </div>
              <div className="text-center">
                <p className="font-bold">Storage</p>
                <Image
                  src="/Res_Amazon-Elastic-Block-Store_Volume_48.png"
                  alt="Storage"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">5 GB</p>
              </div>
              <div className="text-center">
                <p className="font-bold">GitHub</p>
                {theme === "dark" ? (
                  <Image
                    src="/github-mark-white.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto mt-4"
                  />
                ) : (
                  <Image
                    src="/github-mark.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto mt-4"
                  />
                )}
                <p className="mt-2 ">Repo</p>
              </div>
              <div className="text-center">
                <p className="font-bold">AI</p>
                <Image
                  src="/cody-logo.svg"
                  alt="Cody"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">Coding Assistant</p>
              </div>
              <div className="text-center mt-10">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  disabled
                >
                  Contact Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vscode;
