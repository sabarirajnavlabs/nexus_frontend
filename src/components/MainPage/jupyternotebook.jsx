"use client";
import React, { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";
// import image from "/public/Main/image.png";
import image from "/public/jupyter.png";
import Cookies from "js-cookie";

const JupyterNotebook = () => {
  const { theme } = useTheme();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLaunchJPN = async () => {
    setIsDisabled(true);

    const orgName = "testing";
    const url = await postData1(orgName);
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Failed to retrieve URL");
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, 300000);
  };

  const postData1 = async (orgName) => {
    try {
      const res = await fetch(
        `https://nsh6zxrxlj.execute-api.us-east-1.amazonaws.com/testing/jupyter/${orgName}`,
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
            <h1 className="text-3xl font-bold">Jupyter Editor</h1>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Introducing JupyterLab App with AI Assist—your new secret weapon
              for next-level productivity! Imagine having a workspace that
              adapts to your needs, with AI-powered tools that help you
              organize, collaborate, and supercharge your code. From
              streamlining complex workflows to auto-generating code suggestions
              on the fly, this feature takes the chaos out of data science and
              development. Whether you&apos;re deep into research or building
              the next big thing, JupyterLab Spaces with AI makes sure
              you&apos;re not just working—you&apos;re working smarter, faster,
              and with a whole lot more fun. Get ready to dive into the future
              of coding!
            </p>
          </div>
          <div className="md:w-1/2 relative w-[200px] h-[200px]">
            <Image
              src={"/jupyter.png"}
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
            Jupyter Lab Small{" "}
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
            <div className="flex justify-around items-start mt-6 space-x-8">
              <div className="text-center">
                <p className="font-bold">App</p>
                <Image
                  src="/jupyter.png"
                  alt="Jupyter Lab App"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
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
              </div>
              <div className="text-center">
                <p className="font-bold">AI</p>
                <Image
                  src="/chat.png"
                  alt="Cody"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
                <p className="mt-2 ">Coding Assistant</p>
              </div>
              <div className="text-center mt-10">
                {/* <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleLaunchJPN()}
                >
                  Launch
                </button> */}
                {isDisabled ? (
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                    disabled
                  >
                    Launching...
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => handleLaunchJPN()}
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
            Jupyter Lab Medium{" "}
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
                  src="/jupyter.png"
                  alt="Jupyter Lab App"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
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
              </div>
              <div className="text-center">
                <p className="font-bold">AI</p>
                <Image
                  src="/chat.png"
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

        <div
          className={`mt-12 p-6 ${
            theme === "dark" ? "bg-[#1e1e1e]" : "bg-gray-200"
          } shadow-lg border rounded-lg border-[#333333]`}
        >
          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            Jupyter Lab Large{" "}
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
                  src="/jupyter.png"
                  alt="Jupyter Lab App"
                  width={48}
                  height={48}
                  className="mx-auto mt-4"
                />
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
              </div>
              <div className="text-center">
                <p className="font-bold">AI</p>
                <Image
                  src="/chat.png"
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

export default JupyterNotebook;
