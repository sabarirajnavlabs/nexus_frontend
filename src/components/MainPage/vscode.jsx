"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";
import image from "/public/vscode.png";
import Cookies from "js-cookie";

const Vscode = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { theme } = useTheme();
  const [orgName, setOrgName] = useState("testing");
  const [loading, setLoading] = useState(false); // Loading state

  const postData = async (orgName) => {
    try {
      const res = await fetch(`${endpoint}/diy/${orgName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: Cookies.get("__session") || "",
        },
        body: JSON.stringify({
          orgName: orgName,
        }),
      });

      if (res.status === 409) {
        let storedVSCUrl = Cookies.get("storedVSCUrl");
        storedVSCUrl = storedVSCUrl.split("/auth")[0];
        storedVSCUrl = storedVSCUrl + "/codeeditor/default";
        return storedVSCUrl || null;
      }

      if (res.status === 200) {
        const data = await res.json();
        Cookies.set("storedVSCUrl", data.url, {
          expires: 1,
          secure: window.location.hostname !== "localhost",
          sameSite: "strict",
        });

        return data.url;
      }

      throw new Error(`Unexpected status code: ${res.status}`);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  };

  const handleLaunchVSC = async () => {
    setLoading(true);
  
    try {
      const url = await postData(orgName);
  
      if (url) {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
  
        // Append to the document and trigger click
        document.body.appendChild(link);
        link.click();
  
        // Remove the anchor element after clicking
        document.body.removeChild(link);
  
        setTimeout(() => {
          setLoading(false);
        }, 30000);
      } else {
        console.error("Failed to retrieve URL");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error launching VSC:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    if (hostname === "localhost" || subdomain === "dev") {
      setOrgName("testing");
    } else {
      setOrgName(subdomain);
    }
  }, []);

  return (
    <>
      <div
        className={`
          ${theme === "dark" ? "bg-[#181818] text-white" : "text-black"}
            mt-[-20px] p-2`}
      >
        <div
          className={`flex flex-col md:flex-row justify-between items-center pl-4 md:pl-8 rounded-lg shadow-lg border ${
            theme === "dark" ? "border-[#333333]" : "bg-white border-gray-300"
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
                <button
                  className={`bg-blue-500 text-white py-2 px-4 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleLaunchVSC}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Launch"}
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
