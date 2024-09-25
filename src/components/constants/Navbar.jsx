"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logoImage from "/public/Navbar/logo-circle.png";
import Image from "next/image";
import { useAuth } from "@clerk/clerk-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();

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

  return (
    <nav
      className={`bg-[#1e1e1e] p-4 z-50 fixed top-0 left-4 right-4 flex items-center justify-between rounded-lg shadow-lg transition-all duration-300 ${
        isScrolled ? "bg-opacity-70 backdrop-blur-md" : "bg-opacity-100"
      } space-x-4`}
    >
      <div className="flex gap-4 basis-1/2 md:basis-1/4 items-center ml-5">
        <Image src={logoImage} alt="logo" className="w-12 h-12" />
        <span className="text-white text-md lg:text-lg font-semibold">
          NAVIGATE LABS
        </span>
      </div>

      <div className="basis-1/2 md:basis-1/4 flex flex-row-reverse">
        {isMenuOpen ? (
          <FaTimes
            className="text-white text-2xl mr-5 cursor-pointer"
            onClick={toggleMenu}
          />
        ) : (
          <FaBars
            className="text-white text-2xl mr-5 cursor-pointer"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Popup Menu */}
      {isMenuOpen && (
        <div
          className={`absolute top-[80px] right-4 bg-[#0E0E0E] rounded-lg shadow-lg p-4 space-y-2 w-48 transition-all duration-300 ${
            isScrolled ? "bg-opacity-70 backdrop-blur-md" : "bg-opacity-100"
          }`}
        >
          <button className="w-full text-left text-white hover:text-teal-500 hover:font-bold relative p-2 rounded transition duration-300 ease-in-out group">
            Settings
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </button>
          <button
            className="w-full text-left text-white hover:text-teal-500 hover:font-bold relative p-2 rounded transition duration-300 ease-in-out group"
            onClick={signOut}
          >
            Logout
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
