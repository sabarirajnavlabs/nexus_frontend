"use client";
import React, { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";
import image from "/public/Main/image.png";
import Cookies from "js-cookie";

const NexusAI = () => {
  const { theme } = useTheme();
  const [cpu, setCpu] = useState(0.2);
  const [gpu, setGpu] = useState(0.2);
  const [storage, setStorage] = useState(16);

  const postData = async (orgName) => {
    try {
      const res = await fetch(
        `https://nsh6zxrxlj.execute-api.us-east-1.amazonaws.com/testing/diy/${orgName}`,
        // `https://nsh6zxrxlj.execute-api.us-east-1.amazonaws.com/testing/jupyter/${orgName}`,
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

  const handleLaunchVSC = async () => {
    const orgName = "testing";
    const url = await postData(orgName);
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Failed to retrieve URL");
    }
  };

  const postData1 = async (orgName) => {
    try {
      const res = await fetch(
        // `https://nsh6zxrxlj.execute-api.us-east-1.amazonaws.com/testing/diy/${orgName}`,
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

  const handleLaunchJPN = async () => {
    const orgName = "testing";
    const url = await postData1(orgName);
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Failed to retrieve URL");
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
            <h1 className="text-3xl font-bold">NEXUS AI</h1>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              We offer state-of-the-art AI hardware and software to our
              customers through a simple internet browser...
            </p>
            <button
              className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded text-black"
              // onClick={handleLaunch}
            >
              Start with US!!
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src={image}
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
            Build Yourself ( VSCode )
          </h2>
          <hr className="m-auto border border-teal-500 mt-4 mb-10" />
          <div className="rounded-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <h3 className="text-lg font-semibold text-white">VS Code</h3>
            </div>
            <div className="flex gap-10">
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
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center ">
                <div>
                  <label
                    htmlFor="storageSlider"
                    className={`block pt-10 pb-6 mb-2 text-2xl ${
                      theme === "dark" ? "text-gray-200" : "text-black"
                    }`}
                  >
                    Storage (GB)
                  </label>
                  <div className="flex justify-left gap-10 items-center">
                    <input
                      type="range"
                      id="storageSlider"
                      min="0"
                      max="20"
                      step="1"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-[50%]"
                    />
                    <div className="flex justify-center items-center">
                      <span>Value: {storage} GB </span>
                      <span> | $0.5 /hr</span>
                    </div>
                  </div>

                  <p
                    className={`text-sm mt-1 py-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    <ExclamationCircleIcon className="h-4 w-4 inline-block mr-1 text-yellow-400" />
                    You cannot reduce the storage opted once you create the
                    instance. You can increase it.
                  </p>
                </div>
                <button
                  className="mt-16 max-w-[200px] max-h-[50px] px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded text-black font-semibold w-full"
                  onClick={handleLaunchVSC}
                >
                  LAUNCH
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
            Build Yourself ( Jupyter Notebook )
          </h2>
          <hr className="m-auto border border-teal-500 mt-4 mb-10" />
          <div className="rounded-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <h3 className="text-lg font-semibold text-white">VS Code</h3>
            </div>
            <div className="flex gap-10">
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
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center ">
                <div>
                  <label
                    htmlFor="storageSlider"
                    className={`block pt-10 pb-6 mb-2 text-2xl ${
                      theme === "dark" ? "text-gray-200" : "text-black"
                    }`}
                  >
                    Storage (GB)
                  </label>
                  <div className="flex justify-left gap-10 items-center">
                    <input
                      type="range"
                      id="storageSlider"
                      min="0"
                      max="20"
                      step="1"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-[50%]"
                    />
                    <div className="flex justify-center items-center">
                      <span>Value: {storage} GB </span>
                      <span> | $0.5 /hr</span>
                    </div>
                  </div>

                  <p
                    className={`text-sm mt-1 py-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    <ExclamationCircleIcon className="h-4 w-4 inline-block mr-1 text-yellow-400" />
                    You cannot reduce the storage opted once you create the
                    instance. You can increase it.
                  </p>
                </div>
                <button
                  className="mt-16 max-w-[200px] max-h-[50px] px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded text-black font-semibold w-full"
                  onClick={handleLaunchJPN}
                >
                  LAUNCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NexusAI;
