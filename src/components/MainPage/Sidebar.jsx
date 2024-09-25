"use client";

import React, { useState } from "react";

export default function ProductSideNavbar() {
  const [showDIY, setShowDIY] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  // Toggle DIY dropdown
  const toggleDIY = () => setShowDIY(!showDIY);

  // Toggle Models dropdown
  const toggleModels = () => setShowModels(!showModels);

  // Toggle What's New dropdown
  const toggleWhatsNew = () => setShowWhatsNew(!showWhatsNew);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#181818] relative text-white p-4 w-64 text-left">
      {/* Home Page Link */}
      <div className="sticky top-[100px]">
        <div className="mb-8">
          <a
            href="#home"
            className="text-lg font-semibold text-teal-500 hover:underline"
          >
            Nexus AI
          </a>
          <div className="h-1 w-full bg-teal-500 mt-1"></div>
        </div>

        {/* What's New Dropdown */}
        {/* <div className="mb-8">
          <button
            onClick={toggleWhatsNew}
            className={`flex items-center justify-between w-full text-white relative p-0 rounded transition duration-300 ease-in-out group ${
              showWhatsNew ? "font-bold" : "hover:text-teal-500"
            }`}
          >
            WHATS NEW?
            <span
              className={`transform transition-transform ${
                showWhatsNew ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>
          {showWhatsNew && (
            <ul className="mt-4 space-y-2 pl-0">
              <li>
                <a
                  href="#blogs"
                  className="text-white hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                >
                  BLOGS
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-white hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                >
                  EVENTS
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </a>
              </li>
            </ul>
          )}
        </div> */}

        <div className="mb-8">
          <button
            onClick={toggleDIY}
            className={`flex items-center justify-between w-full text-white relative p-0 rounded transition duration-300 ease-in-out group ${
              showDIY ? "font-bold" : "hover:text-teal-500"
            }`}
          >
            DIY
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
                  className="text-white hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                >
                  VS Code Editor
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </a>
              </li>
              <li>
                <a
                  href="#elevate-ai"
                  className="text-white hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                >
                  Jupyter Lab
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </a>
              </li>
            </ul>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded shadow-lg">
                <button
                  onClick={closeModal}
                  className="text-red-500 float-right"
                >
                  Close
                </button>
                <img
                  src="@/app/whatsnew/WhatsApp Image 2024-09-23 at 17.56.06.jpeg"
                  alt="VS Code"
                  className="max-w-xs"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <button
            onClick={toggleModels}
            className={`flex items-center justify-between w-full text-white relative p-0 rounded transition duration-300 ease-in-out group ${
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
                  className="text-white hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
                  onClick={(e) => e.preventDefault()}
                >
                  Text
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  <span className="ml-2 bg-black text-white text-xs p-1 rounded opacity-100 transition-opacity duration-200 shadow-lg shadow-gradient">
                    Coming Soon
                  </span>
                </span>
              </li>
              <li className="relative flex items-center">
                <span
                  className="text-white relative p-0 rounded transition duration-300 ease-in-out group"
                  onClick={(e) => e.preventDefault()} // Prevent click
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
                  className="text-white relative p-0 rounded transition duration-300 ease-in-out group"
                  onClick={(e) => e.preventDefault()} // Prevent click
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
                  className="text-white relative p-0 rounded transition duration-300 ease-in-out group"
                  onClick={(e) => e.preventDefault()} // Prevent click
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
        <div className="mb-8">
          <a
            href="#contact-us"
            className="text-white hover:text-teal-500 hover:font-bold relative p-0 rounded transition duration-300 ease-in-out group"
          >
            CONTACT US
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
