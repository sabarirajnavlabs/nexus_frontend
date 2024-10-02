"use client";

import React from "react";
import { ReactTyped } from "react-typed";
import styles from "./AIPlatformComponent.module.css";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

const AIPlatformComponent = () => {
  return (
    <div className="flex relative min-h-screen bg-[#e9f6fe] gap-6">
      {/* Left Side */}
      <div className="relative flex flex-col gap-4 w-2/4 h-screen items-start justify-start">
        <div className="p-28 flex flex-col gap-6 pb-0">
          <div className="flex mt-16 gap-4 items-start justify-center">
            <div className="w-[40px] h-[40px] relative">
              <Image
                src="/Navbar/logo-circle.png"
                alt="Navigate Labs Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h1 className="text-3xl font-bold text-black">Navigate Labs</h1>
          </div>
          <div className="flex flex-col gap-4 items-start justify-start bg-transparent">
            <div className="relative w-[500px] h-[300px] bg-[#e9f6fe] overflow-hidden">
              {/* <Image
                src="/intro.gif"
                alt="Animated GIF showcasing platform features"
                fill
                style={{ objectFit: "contain" }}
              /> */}
              <video autoPlay loop muted className="w-full h-full">
                <source
                  src="https://mahesh-mens-touch.s3.ap-south-1.amazonaws.com/intro.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        <div className="relative mt-6 pl-28 items-center justify-center">
          <h1 className="text-3xl font-bold text-black text-center">
            ALL-IN-ONE AI PLATFORM FOR <br />
            <span className={`ml-2 ${styles.gradientText}`}>
              <ReactTyped
                strings={[
                  "SOFTWARE TEAMS",
                  "DEVELOPERS",
                  "RESEARCHERS",
                  "DATA SCIENTISTS",
                  "ML ENGINEERS",
                ]}
                typeSpeed={130}
                backSpeed={80}
                loop={true}
                showCursor={false}
              />
            </span>
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col w-2/4 items-center justify-center mt-4">
        <div className="w-[350px] h-[180px] relative">
          <Image
            src="/kpr.png"
            alt="AI Platform Feature Image"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center ml-6 m-2 gap-2">
          <h1 className="text-3xl font-bold text-black capitalize">
            Artificial Intelligence
          </h1>
          <h3 className="text-2xl font-normal text-black">
            Center of Excellence
          </h3>
        </div>
        <SignIn
          path="/sign-in"
          routing="path"
          signInOptions={{
            allowedIdentifiers: ["email"],
            oauthProviders: [],
          }}
          appearance={{
            elements: {
              footerAction: { display: "none" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AIPlatformComponent;
