"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";

const TextModel = () => {
  const { theme } = useTheme();
  const [description, setDescription] = useState("Text Model");
  const [iframeUrl, setIframeUrl] = useState("");
  const [showIframe, setShowIframe] = useState(false);

  const data = [
    {
      id: 1,
      image1: "/models/logos/openai-logomark.svg",
      image2: "/models/logos/openai-white-logomark.svg",
      title: "Open AI",
      description:
        "A fast, inexpensive model for simple tasks like text summarization and classification.",
      tags: [
        {
          name: "GPT 3.5 Turbo",
        },
      ],
      link: "https://openai.com",
    },
    {
      id: 2,
      image1: "/models/logos/Anthropic_Icon_12.jpeg",
      image2: "/models/logos/Anthropic_Symbol_10.png",
      title: "Anthropic",
      description:
        "A sophisticated model for dialogue and creative content generation.",
      tags: [
        {
          name: "Anthropic Claude v2",
          url: "http://ec2-54-83-251-69.compute-1.amazonaws.com/?model=bedrock-claude-sonnet-v1",
        },
      ],
    },
    {
      id: 3,
      image1: "/models/logos/meta.svg",
      image2: "/models/logos/meta.svg",
      title: "Meta",
      description:
        "Ideal for limited computational power and resources, edge devices, and faster training times.",
      tags: [
        {
          name: "Llama 3 8B",
          url: "http://ec2-54-83-251-69.compute-1.amazonaws.com/?model=bedrock-llama-3",
        },
      ],
    },
    {
      id: 4,
      image1: "/models/logos/amazon.png",
      image2: "/models/logos/amazon.png",
      title: "Amazon",
      description:
        "A light weight efficient model ideal for English-language tasks, including like summarization and copywriting.",
      tags: [{ name: "Titan Text Lite", url: "#" }],
    },
  ];

  const handleOpenIframe = (url) => {
    setIframeUrl(url);
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
    setIframeUrl("");
  };

  return (
    <>
      {/* {showIframe && (
        <div className="absolute top-0 left-0 w-full h-full z-50">
          <iframe
            src={iframeUrl}
            frameBorder="0"
            style={{ width: "100%", height: "100%" }}
          ></iframe>
          <button
            className="absolute top-5 right-5 w-9 h-9 z-50 p-2 pt-1 text-xl bg-white rounded-full justify-center items-center"
            onClick={handleCloseIframe}
          >
            &times;
          </button>
        </div>
      )} */}
      {showIframe && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative gap-10 w-screen h-screen bg-black rounded-md flex flex-col items-center justify-center p-5">
            {/* Top Bar */}
            <div className="w-[90%] h-[10%] bg-white opacity-50 rounded-t-md"></div>

            {/* Main Content Area */}
            <div className="w-[90%] h-[80%] flex gap-6 overflow-hidden">
              {/* Left and Right Sections */}
              <div className="w-[40%] h-full flex-shrink-0 flex flex-col gap-4 rounded-md">
                <div className="relative gap-2 p-1 w-full h-[10%] flex items-end justify-start border-[#7e7e7e] border-b-[1px] text-white">
                  <h1 className="text-md rounded-2xl bg-white bg-opacity-10 p-1 px-4">
                    Preview
                  </h1>
                  <h1 className="text-md p-1 px-4 rounded-2xl">JSON</h1>
                </div>
                <div className="w-full h-[60%] bg-white bg-opacity-10 flex items-start justify-start rounded-md border-[#7e7e7e] border-[1px]"></div>
                <input
                  className="w-full h-[30%] bg-white bg-opacity-10 rounded-md border-[#7e7e7e] border-[1px] p-2 text-start"
                  placeholder="Type Text Here..."
                  style={{ display: "block", height: "auto" }} // Ensures the input isn't centered
                />
              </div>

              <div className="w-[57%] h-full pl-4 border-[#7e7e7e] border-l-[1px] flex-shrink-0 flex flex-col gap-6 rounded-md">
                <div className="w-full p-1 gap-2 h-[10%] flex items-end justify-start text-white border-[#7e7e7e] border-b-[1px]">
                  <h1 className="text-md rounded-2xl bg-white bg-opacity-10 p-1 px-4">
                    Python
                  </h1>
                  <h1 className="text-md rounded-2xl p-1 px-4">Langchain</h1>
                  <h1 className="text-md rounded-2xl p-1 px-4">Node</h1>
                </div>
                <div className="w-full h-[90%] bg-white bg-opacity-10 rounded-md border-[#7e7e7e] border-[1px] flex items-center justify-center"></div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-5 right-5 w-9 h-9 z-50 p-2 text-xl bg-white rounded-full flex items-center justify-center"
            onClick={handleCloseIframe}
          >
            &times;
          </button>
        </div>
      )}

      <div
        className={
          theme === "dark" ? "text-white" : "text-black mt-[-20px] p-2"
        }
      >
        <div
          className={`flex flex-col md:flex-row justify-between items-center pl-4 md:pl-8 rounded-lg shadow-lg border ${
            theme === "dark" ? "border-[#333333]" : "border-gray-300"
          }`}
        >
          <div className="md:w-1/2 md:mt-6 md:mb-6">
            <h1 className="text-3xl font-bold">Text Model</h1>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Your gateway to harnessing the power of leading text models from
              top AI providers. Whether you&apos;re building intelligent
              chatbots, automating workflows, or generating high-quality
              content, our platform offers access to state-of-the-art text
              models like OpenAI GPT-4o, Amazon Titan, Anthropic Claude, and
              Meta Llama, Mistral etc. With Nexus, you can explore the best in
              conversational AI, text generation, and advanced natural language
              processing, all in one place. Unlock the potential of these
              foundational models to create innovative, AI-powered applications
              that push the boundaries of what&apos;s possible in text
              automation. Let Nexus power your next big idea!
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
        <section
          id="ai-products"
          className={`${
            theme === "dark" ? "text-white" : " text-black"
          } px-4 py-8 rounded-md`}
        >
          <h2 className="text-3xl font-semibold  mb-4">Base Models</h2>
          <p className="text-lg  mb-8">
            You can build and scale generative AI applications using foundation
            models from leading AI model providers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((card, index) => (
              <div key={index} className=" rounded-lg shadow-md">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={theme === "dark" ? card.image2 : card.image1}
                    objectFit="contain"
                    fill
                    alt="AI Product"
                  />
                </div>

                <h3 className="text-xl font-semibold  mb-2 ml-4">
                  {card.title}
                </h3>
                <p className="text-sm font-light mb-4 ml-4">
                  {card.description}
                </p>
                <div className={`flex gap-2 ml-4 mb-4`}>
                  {card.tags.map((tag, index) => (
                    <button
                      key={index}
                      className={` ${
                        theme === "dark"
                          ? "bg-white text-black"
                          : "bg-[#0C0C0C] text-white"
                      } text- px-2 py-1 rounded-2xl font-bold`}
                      onClick={() => handleOpenIframe(tag.url)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default TextModel;
