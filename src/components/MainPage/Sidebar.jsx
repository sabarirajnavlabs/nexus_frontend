"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ProductSideNavbar() {
  const { theme } = useTheme();
  const [showDIY, setShowDIY] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDIY = () => setShowDIY(!showDIY);
  const toggleModels = () => setShowModels(!showModels);
  const toggleWhatsNew = () => setShowWhatsNew(!showWhatsNew);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className={`relative p-4 w-64 text-left ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Home Page Link */}
      <div className="top-[100px] mb-8">
        <a href="#home" className="text-lg font-semibold hover:underline">
          Nexus AI
        </a>
        <div className="h-1 w-full bg-teal-500 mt-1"></div>
      </div>

      <div className="mb-8">
        <a
          href="#"
          className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
        >
          Whats New
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
        </a>
      </div>

      {/* DIY Dropdown */}
      <div className="mb-8">
        <button
          onClick={toggleDIY}
          className={`flex items-center justify-between w-full relative p-0 rounded transition duration-300 ease-in-out group ${
            showDIY ? "font-bold" : "hover:text-teal-500"
          }`}
        >
          Build Yourself
          <span
            className={`transform transition-transform ${
              showDIY ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>
        {showDIY && (
          <ul className="mt-4 space-y-2 pl-0">
            <li>
              <a
                href="#"
                onClick={openModal}
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
              >
                VS Code Editor
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </a>
            </li>
            <li>
              <a
                href="#elevate-ai"
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
              >
                Jupyter Lab
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </a>
            </li>
          </ul>
        )}
        {/* {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-fit">
              <button onClick={closeModal} className="text-red-500 float-right">
                X
              </button>
              <div className="flex justify-around items-center mt-6 space-x-8">
                <div className="text-center">
                  <Image
                    src="/vscodeimage.jpg"
                    alt="Code Editor App"
                    width={48}
                    height={48}
                    className="mx-auto"
                  />
                  <p className="mt-2 text-black">Code Editor App</p>
                </div>
                <div className="text-center">
                  <Image
                    src="/ec2logo.png"
                    alt="Intel"
                    width={48}
                    height={48}
                    className="mx-auto"
                  />
                  <p className="mt-2 text-black">Intel</p>
                  <p className="mt-2 text-black">ml.t3.medium</p>
                  <p className="text-black mt-2">vCPU: 2</p>
                  <p className="text-black mt-2">Memory: 4GB</p>
                </div>
                <div className="text-center">
                  <Image
                    src="/storagelogo.png"
                    alt="Storage"
                    width={48}
                    height={48}
                    className="mx-auto"
                  />
                  <p className="mt-2 text-black">EBS Volume</p>
                  <p className="mt-2 text-black">Memory: 5GB</p>
                </div>
                <div className="text-center">
                  <Image
                    src="/githublogo.png"
                    alt="Git Repo"
                    width={48}
                    height={48}
                    className="mx-auto"
                  />
                  <p className="mt-2 text-black">Git Repo</p>
                </div>
                <div className="text-center">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Launch
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Models Dropdown */}
      <div className="mb-8">
        <button
          onClick={toggleModels}
          className={`flex items-center justify-between w-full relative p-0 rounded transition duration-300 ease-in-out group ${
            showModels ? "font-bold" : "hover:text-teal-500"
          }`}
        >
          MODELS
          <span
            className={`transform transition-transform ${
              showModels ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>
        {showModels && (
          <ul className="mt-4 space-y-2 pl-0">
            <li>
              <span
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={(e) => e.preventDefault()}
              >
                Text
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                <span className="ml-2 bg-black text-white text-xs p-1 rounded opacity-100 transition-opacity duration-200 shadow-lg shadow-gradient">
                  Coming Soon
                </span>
              </span>
            </li>

            {/* Additional items for Models */}
            <li className="relative flex items-center">
              <span
                className="hover:text-teal-500 relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={(e) => e.preventDefault()}
              >
                Images
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
              <span className="ml-2 bg-black text-white text-xs p-1 rounded opacity-100 transition-opacity duration-200 shadow-lg shadow-gradient">
                Coming Soon
              </span>
            </li>
            <li className="relative flex items-center">
              <span
                className="hover:text-teal-500 relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={(e) => e.preventDefault()}
              >
                Multi Model
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
              <span className="ml-2 bg-black text-white text-xs p-1 rounded opacity-100 transition-opacity duration-200 shadow-lg shadow-gradient">
                Coming Soon
              </span>
            </li>
            <li className="relative flex items-center">
              <span
                className="hover:text-teal-500 relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={(e) => e.preventDefault()}
              >
                Audio
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
              <span className="ml-2 bg-black text-white text-xs p-1 rounded opacity-100 transition-opacity duration-200 shadow-lg shadow-gradient">
                Coming Soon
              </span>
            </li>
          </ul>
        )}
      </div>

      {/* Contact Us Link */}
      {/* <div className="mb-8">
        <a
          href="#contact-us"
          className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
        >
          CONTACT US
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
        </a>
      </div> */}
    </div>
  );
}
