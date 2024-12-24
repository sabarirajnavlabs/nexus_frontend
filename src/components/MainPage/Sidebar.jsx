"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ProductSideNavbar({ section, setsection }) {
  const { theme } = useTheme();
  const [showDIY, setShowDIY] = useState(true);
  const [showModels, setShowModels] = useState(true);
  const [showWhatsNew, setShowWhatsNew] = useState(true);
  const [showDashboard, setShowDashboard] = useState(true);

  const toggleDIY = () => setShowDIY(!showDIY);
  const toggleModels = () => setShowModels(!showModels);
  const toggleWhatsNew = () => setShowWhatsNew(!showWhatsNew);
  const toggleDashboard = () => setShowDashboard(!showDashboard);

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
        <button
          onClick={() => setsection("whatsnew")}
          className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
        >
          Whats New
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
        </button>
      </div>

      {/* DIY Dropdown */}
      <div className="mb-8">
        <button
          onClick={toggleDIY}
          className={`flex items-center justify-between w-full relative p-0 rounded transition duration-300 ease-in-out group ${
            showDIY ? "font-bold" : "hover:text-teal-500"
          }`}
        >
          IDE Hub
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
                onClick={() => setsection("vscode")}
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
              >
                VS Code Editor
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setsection("jupyter")}
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
              >
                Jupyter Lab
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Models Dropdown */}
      <div className="mb-8">
        <button
          onClick={toggleModels}
          className={`flex items-center justify-between w-full relative p-0 rounded transition duration-300 ease-in-out group ${
            showModels ? "font-bold" : "hover:text-teal-500"
          }`}
        >
          Models
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
            <li className="relative flex items-center">
              <span
                className="hover:text-teal-500 relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={() => setsection("multimodel")}
              >
                Multi Modal
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
              {/* <span className="ml-2  text-xs p-1 ">Coming Soon</span> */}
            </li>
            <li>
              <span
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={() => setsection("textmodel")}
              >
                Text
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
              {/* <span className="ml-2  text-xs p-1 ">Coming Soon</span> */}
            </li>

            {/* Additional items for Models */}
            <li className="relative flex items-center">
              <span
                className="hover:text-teal-500 relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={() => setsection("imagemodel")}
              >
                Images
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
              {/* <span className="ml-2 text-xs p-1">Coming Soon</span> */}
            </li>
          </ul>
        )}
      </div>

      <div className="mb-8">
        <button
          onClick={() => setsection("chatpage")}
          className={`flex items-center justify-between w-full relative p-0 rounded transition duration-300 ease-in-out group ${
            showModels ? "font-bold" : "hover:text-teal-500"
          }`}
        >
          Playground
        </button>
      </div>

      {/* Dashboard */}
      <div className="mb-8">
        <button
          onClick={toggleDashboard}
          className={`flex items-center justify-between w-full relative p-0 rounded transition duration-300 ease-in-out group ${
            showModels ? "font-bold" : "hover:text-teal-500"
          }`}
        >
          Dashboard
          <span
            className={`transform transition-transform ${
              showModels ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>
        {showDashboard && (
          <ul className="mt-4 space-y-2 pl-0">
            <li className="relative flex items-center">
              <span
                className="hover:text-teal-500 relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={() => setsection("usage")}
              >
                Usage Report
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
            </li>
            <li>
              <span
                className="hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                onClick={() => setsection("analytics")}
              >
                Analytics
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
