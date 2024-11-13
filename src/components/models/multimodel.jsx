"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./main.css";
import { useTheme } from "next-themes";

const TextModel = () => {
  const { theme } = useTheme();
  const [showIframe, setShowIframe] = useState(true);
  const [iframeUrl, setIframeUrl] = useState("");

  const handleOpenIframe = (url) => {
    setIframeUrl(url);
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
    setIframeUrl("");
  };

  const data = [
    {
      id: 1,
      image1: "/models/logos/openai-logomark.svg",
      image2: "/models/logos/openai-white-logomark.svg",
      title: "Open AI",
      description:
        "A fast, inexpensive model for simple tasks like text summarization and classification.",
      tags: ["GPT-4o"],
    },
    {
      id: 2,
      image1: "/models/logos/Anthropic_Icon_12.jpeg",
      image2: "/models/logos/Anthropic_Symbol_10.png",
      title: "Anthropic",
      description:
        "A sophisticated model for dialogue and creative content generation.",
      tags: ["Claude 3 Haiku"],
    },
    {
      id: 3,
      image1: "/models/logos/meta.svg",
      image2: "/models/logos/meta.svg",
      title: "Meta",
      description:
        "Ideal for limited computational power and resources, edge devices, and faster training times.",
      tags: ["Llama 3.2 11B"],
    },
  ];

  return (
    <>
      {showIframe && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-full h-full bg-black rounded-md flex p-5">
            {/* Left Sidebar */}
            <div className="w-[250px] h-full bg-black p-4 rounded-md">
              <h1 className="text-2xl font-bold text-white">Sidebar Content</h1>
              <ul className="mt-4 text-white">
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </ul>
            </div>

            {/* Right Gray Area */}
            <div className="flex-1 h-full bg-white opacity-10 p-4 rounded-md">
              {/* You can add content here if needed */}
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
          theme === "dark" ? " text-white" : " text-black mt-[-20px] p-2"
        }
      >
        <div
          className={`flex flex-col md:flex-row justify-between items-center pl-4 md:pl-8 rounded-lg shadow-lg border ${
            theme === "dark" ? "border-[#333333]" : "border-gray-300"
          }`}
        >
          <div className="md:w-1/2 md:mt-6 md:mb-6">
            <h1 className="text-3xl font-bold">Multi Modal</h1>
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
          className={`my-12 ${
            theme === "dark" ? " text-white" : " text-black"
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
                      onClick={() => {
                        handleOpenIframe("https://www.google.com");
                      }}
                    >
                      {tag}
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
