"use client";

import React from "react";
import { ReactTyped } from "react-typed";
import styles from "./AIPlatformComponent.module.css";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

const AIPlatformComponent = () => {
  return (
    <div className="flex relative min-h-screen bg-[#e9f6fe] gap-6 justify-center items-start pt-8">
      {/* Left Side */}
      <div className="relative flex flex-col gap-4 w-2/4 h-screen pr-10 items-end justify-center">
        <div className="relative w-[400px] h-[120px]">
          <Image
            src="/logo.png"
            alt="Navigate Labs Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-[400px] h-[400px] relative">
          <Image
            src="/Variant.svg"
            alt="Navigate Labs Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="relative mt-6 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-black text-center">
            All-In-One AI Platform For <br />
            <span className={`ml-2 ${styles.gradientText}`}>
              <ReactTyped
                strings={[
                  "SOFTWARE TEAMS",
                  "DEVELOPERS",
                  "RESEARCHERS",
                  "DATA SCIENTISTS",
                  "ML ENGINEERS",
                ]}
                typeSpeed={30}
                backSpeed={30}
                loop={true}
                showCursor={false}
              />
            </span>
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col w-2/4 items-center justify-center mt-16">
        <div className="w-[350px] h-[200px] relative">
          <Image
            src="/kpriet.png"
            alt="AI Platform Feature Image"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center ml-6 m-2 mb-4 gap-2">
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
