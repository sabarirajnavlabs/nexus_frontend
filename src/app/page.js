"use client";
import ProductSideNavbar from "@/components/MainPage/Sidebar";
import NavBar from "@/components/constants/Navbar";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import Footer from "@/components/constants/Fotter";
import Vscode from "@/components/MainPage/vscode";
import JupyterNotebook from "@/components/MainPage/jupyternotebook";
import TextModel from "@/components/models/text";
import ImagesModel from "@/components/models/images";
import MultiModel from "@/components/models/multimodel";
import AudioModel from "@/components/models/audio";
import WhatsNew from "@/components/whatsnew/main";

const Page = () => {
  const { theme } = useTheme();
  const [showSection, setShowSection] = useState("whatsnew");

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
        <ProductSideNavbar section={showSection} setsection={setShowSection} />

        <div className="p-8 max-w-[85%]">
          {showSection === "vscode" ? (
            <Vscode />
          ) : showSection === "jupyter" ? (
            <JupyterNotebook />
          ) : showSection === "textmodel" ? (
            <TextModel />
          ) : showSection === "imagemodel" ? (
            <ImagesModel />
          ) : showSection === "multimodel" ? (
            <MultiModel />
          ) : // ) : showSection === "audiomodel" ? (
          // <AudioModel />
          showSection === "whatsnew" ? (
            <WhatsNew />
          ) : null}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
