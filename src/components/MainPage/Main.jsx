"use client";
import React, { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import image from "/public/Main/image.png";
import Image from "next/image";
import "./main.css";

const NexusAI = () => {
  const [cpu, setCpu] = useState(0.2);
  const [gpu, setGpu] = useState(0.2);
  const [storage, setStorage] = useState(16);

  return (
    <>
      <div className="bg-[#181818] mt-[-20px] text-white  p-2">
        <div className="flex flex-col bg-[#1e1e1e] md:flex-row justify-between items-center pl-4 md:pl-8  rounded-lg shadow-lg border border-[#333333]">
          <div className="md:w-1/2 md:mt-6 md:mb-6 ">
            <h1 className="text-3xl font-bold">NEXUS AI</h1>
            <p className="mt-2 text-gray-400">
              We offer state-of-the-art AI hardware and software to our
              customers through a simple internet browser. Purpose-built
              solutions and services enable users to harness the power of
              Generative AI with a wide range of open-source and proprietary AI
              models available as APIs. AI builders and developers can
              prototype, annotate, experiment, fine-tune, and deploy
              enterprise-grade AI applications using an extensive selection of
              GPUs, CPUs, and other accelerators offered through our cloud
              platform.
            </p>
            <button className="mt-4 px-4 py-2  bg-teal-500 hover:bg-teal-400 rounded text-black">
              Start with US!!
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src={image}
              alt="AI Classroom"
              className="rounded-lg max-h-[320px]"
            />
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#1e1e1e] shadow-lg border  rounded-lg  border-[#333333]">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            Do It Yourself (DIY)
          </h2>
          <hr className=" m-auto border border-teal-500 mt-4 mb-10" />
          <div className=" rounded-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <h3 className="text-lg font-semibold text-white">VS Code</h3>
            </div>
            <div className="flex gap-10 ">
              <div className="mb-6 flex-grow">
                <label htmlFor="cpuSlider" className="block text-gray-400 mb-2">
                  CPU
                </label>
                <div className="flex gap-10 justify-center items-center">
                  <div className="w-[100%]">
                    <input
                      type="range"
                      id="cpuSlider"
                      min="0"
                      max="1"
                      step="0.01"
                      value={cpu}
                      onChange={(e) => setCpu(e.target.value)}
                      className="slider"
                    />
                    <div className="flex justify-between text-gray-400 mt-2 ">
                      <span>0</span>
                      <span>0.25</span>
                      <span>0.5</span>
                      <span>0.75</span>
                      <span>1</span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-center mt-2 inline-block border min-w-[50px] border-gray-400 p-2">
                    {cpu}
                  </div>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <label htmlFor="gpuSlider" className="block text-gray-400 mb-2">
                  GPU
                </label>
                <div className="flex gap-10 justify-center items-center">
                  <div className="w-[100%]">
                    <input
                      type="range"
                      id="gpuSlider"
                      min="0"
                      max="1"
                      step="0.01"
                      value={gpu}
                      onChange={(e) => setGpu(e.target.value)}
                      className="slider"
                    />
                    <div className="flex justify-between text-gray-400 mt-2 ">
                      <span>0</span>
                      <span>0.25</span>
                      <span>0.5</span>
                      <span>0.75</span>
                      <span>1</span>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 mt-2 inline-block border min-w-[50px] border-gray-400 p-2">
                    {gpu}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between  items-center ">
                <div>
                  <label
                    htmlFor="storageSlider"
                    className="block pt-10 pb-6 mb-2 text-2xl"
                  >
                    Storage (GB)
                  </label>
                  <div className="flex justify-left gap-10 items-center">
                    <input
                      type="range"
                      id="storageSlider"
                      min="0"
                      max="20"
                      step="1"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-[50%]"
                    />

                    <div className="flex justify-center items-center">
                      <span>Value: {storage} GB </span>
                      <span> | $0.5 /hr</span>
                    </div>
                  </div>

                  <p className=" text-sm mt-1 py-2">
                    <ExclamationCircleIcon className="h-4 w-4 inline-block mr-1 text-yellow-400" />
                    You can not reduce the storage opted once you create the
                    instance. You can increase it.
                  </p>
                </div>
                <button className="mt-16 max-w-[200px]  max-h-[50px] px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded text-black font-semibold w-full">
                  LAUNCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#181818] text-gray-200 p-6 rounded-lg">
        <div className="border-b border-teal-500 pb-4 mb-4">
          <h1 className="text-teal-400 text-2xl font-semibold">Information</h1>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Model Overview</h2>
          <h3 className="text-lg font-semibold mb-2">Description:</h3>
          <p className="mb-4">
            We offer state of the art AI hardware and software to our customers
            through a simple internet browser. Our solutions and services enable
            users to harness the power of Generative AI with a wide range of
            open-source and proprietary AI models available as APIs. AI builders
            and developers can prototype, annotate, experiment, fine-tune, and
            deploy enterprise-grade AI applications using an extensive selection
            of GPUs, CPUs, and other accelerators offered through our cloud
            platform. AI-powered coding assistants and developer productivity
            tools empower users with the latest and greatest AI technology
            stack. Can’t wait to witness what you can imagine and build on our
            platform.
          </p>

          <h3 className="text-lg font-semibold mb-2">Begin Your Journey</h3>
          <h4 className="text-lg font-semibold mb-2">
            Extensive Selection of Hardware
          </h4>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Harness the power of a wide range of NAVIGATE LABS GPUs, CPUs, and
              custom accelerators tailored for unique performance and cost
              optimization needs.
            </li>
            <li>1-click Web Browser Access</li>
            <li>
              Gain immediate access to powerful experimentation capabilities
              through VSCode, JupyterLab, and AI-enabled coding assistants, all
              from your web browser.
            </li>
            <li>Wide Range of Model Availability</li>
            <li>
              Explore and integrate models from top providers like OpenAI,
              Anthropic, Amazon, AI21Labs, Cohere, and more, available through
              API access.
            </li>
            <li>Prebuilt Industry Solutions</li>
            <li>
              Jumpstart your AI projects with industry-leading prebuilt
              solutions, enabling the development of end-to-end real-world AI
              applications.
            </li>
            <li>State-of-the-Art Foundational Model Fine-Tuning</li>
            <li>
              Leverage advanced fine-tuning techniques like PEFT and LoRA, and
              deploy models with a variety of cost-optimized inference options.
            </li>
            <li>AI-Powered Coding Assistants</li>
            <li>
              Boost developer productivity with AI-powered coding assistants
              that integrate seamlessly into your development workflow.
            </li>
            <li>Customizable AI Experimentation Platform</li>
            <li>
              Prototype, annotate, experiment, and fine-tune AI models on a
              customizable platform equipped with the latest AI technology
              stack.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NexusAI;
