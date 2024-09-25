"use client";
import NexusAI from "@/components/MainPage/Main";
import ProductSideNavbar from "@/components/MainPage/Sidebar";
import Footer from "@/components/constants/Fotter";
import NavBar from "@/components/constants/Navbar";
import React from "react";

const Page = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-24 bg-[#181818] flex text-white p-8 ">
        <ProductSideNavbar />

        <div className=" text-white p-8 max-w-[85%]">
          <NexusAI />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
