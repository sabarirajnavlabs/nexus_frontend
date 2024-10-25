"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logoImage from "/public/Navbar/logo-circle.png";
import Image from "next/image";
import { useAuth } from "@clerk/clerk-react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const deletecookies = () => {
    Cookies.remove("storedVSCUrl");
    Cookies.remove("storedJPNUrl");
    localStorage.removeItem("vscInstanceTimestamp");
    localStorage.removeItem("jpnInstanceTimestamp");
  };

  return (
    <nav
      className={`p-4 z-50 fixed top-0 left-0 right-0 flex items-center justify-between transition-all duration-300 ${
        theme === "dark"
          ? "bg-black text-white shadow-gray-600 shadow-md"
          : "bg-white text-black shadow-lg"
      } ${
        isScrolled ? "bg-opacity-70 backdrop-blur-md" : "bg-opacity-100"
      } space-x-4`}
    >
      <div className="flex gap-4 basis-1/2 md:basis-1/4 items-center ml-5">
        <Image src={logoImage} alt="logo" className="w-12 h-12" />
        <span className="text-md lg:text-lg font-semibold">NAVIGATE LABS</span>
      </div>

      <div className="flex">
        <div className="basis-1/2 md:basis-1/4 flex flex-row-reverse">
          {isMenuOpen ? (
            <FaTimes className="cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        {/* Popup Menu */}
        {isMenuOpen && (
          <div
            className={`absolute top-[80px] right-4 rounded-lg shadow-lg p-4 space-y-2 w-48 transition-all duration-300 ${
              isScrolled ? "bg-opacity-70 backdrop-blur-md" : "bg-opacity-100"
            } ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
          >
            <button className="w-full text-left hover:text-teal-500 hover:font-bold relative p-2 rounded transition duration-300 ease-in-out group">
              Settings
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </button>
            <button
              className="w-full text-left hover:text-teal-500 hover:font-bold relative p-2 rounded transition duration-300 ease-in-out group"
              // onClick={signOut}
              onClick={() => {
                deletecookies();
                signOut();
              }}
            >
              Logout
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </button>
          </div>
        )}

        <div className="flex items-center ml-4">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm">
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="toggle-checkbox hidden"
              id="toggle"
            />
            <div className="toggle-label bg-gray-200 rounded-full w-12 h-6 flex items-center p-1 transition-all duration-300">
              <div
                className={`toggle-dot w-4 h-4 rounded-full transition-transform duration-300 ${
                  theme === "dark"
                    ? "transform translate-x-6 bg-black"
                    : "bg-white"
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
