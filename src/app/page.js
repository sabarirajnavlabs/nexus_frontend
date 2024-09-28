"use client";
import NexusAI from "@/components/MainPage/Main";
import ProductSideNavbar from "@/components/MainPage/Sidebar";
import NavBar from "@/components/constants/Navbar";
import React from "react";
import { useTheme } from "next-themes";
import Footer from "@/components/constants/Fotter";

const Page = () => {
  const { theme } = useTheme(); // Get current theme

  return (
    <div
      className={
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }
    >
      <NavBar />
      <div
        className={`pt-24 flex p-8 ${
          theme === "dark" ? "bg-[#181818]" : "bg-gray-200"
        }`}
      >
        <ProductSideNavbar />

        <div className="p-8 max-w-[85%]">
          <NexusAI />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
