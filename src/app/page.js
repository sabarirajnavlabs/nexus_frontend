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
import UsageReport from "@/components/Dashboard/usage";
import ChatPage from "@/components/Dashboard/ChatPage";
import Profile from "@/components/profile/profile";

const Page = () => {
  const { theme } = useTheme();
  const [showSection, setShowSection] = useState("whatsnew");
  const [model, setModel] = useState(null);

  return (
    <div
      className={
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }
    >
      <NavBar setsection={setShowSection} />
      <div
        className={`pt-[84px] flex p-8 pl-0 ${
          theme === "dark" ? "bg-[#181818]" : "bg-gray-200"
        }`}
      >
        <ProductSideNavbar section={showSection} setsection={setShowSection} />

        <div className="p-4 max-w-[85%]">
          {showSection === "vscode" ? (
            <Vscode />
          ) : showSection === "jupyter" ? (
            <JupyterNotebook />
          ) : showSection === "textmodel" ? (
            <TextModel
              section={showSection}
              setSection={setShowSection}
              model={model}
              setModel={setModel}
            />
          ) : showSection === "imagemodel" ? (
            <ImagesModel />
          ) : showSection === "multimodel" ? (
            <MultiModel />
          ) : // ) : showSection === "audiomodel" ? (
          // <AudioModel />
          showSection === "whatsnew" ? (
            <WhatsNew />
          ) : showSection === "usage" ? (
            <UsageReport />
          ) : showSection === "chatpage" ? (
            <ChatPage model={model} />
          ) : showSection === "profile" ? (
            <Profile />
          ) : null}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
