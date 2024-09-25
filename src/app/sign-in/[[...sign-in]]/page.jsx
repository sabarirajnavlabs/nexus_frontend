"use client";
import React, { useState } from "react";
import Image from "next/image";
import kprietlogo from "/public/SignIn/kprietlogo.png";
import logoCircle from "/public/Navbar/logo-circle.png";
import backgroundImg from "/public/SignIn/kprietbg.jpg";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function Page() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] relative overflow-hidden">
      <Image
        src={backgroundImg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 -z-10"></div>

      <div className="flex w-[100vw] text-white h-[100vh] z-10 items-center pl-[80px]">
        <div className="flex flex-col justify-between items-center m-5 p-5">
          <div className="w-full">
            <Image src={kprietlogo} alt="MIT Logo" />
          </div>
          <div className="w-full flex justify-center items-center gap-6 text-4xl">
            <Image
              src={logoCircle}
              alt="Logo Circle"
              className="bg-cover object-fill"
            />
            <p className="text-white">Navigate Labs</p>
          </div>
        </div>
        <div className="min-w-28 flex px-[84px] gap-2 flex-col relative h-[100vh] justify-center">
          <div className="absolute w-[100vw] h-[100vh] top-0 -z-10 left-0 bg-[#208970] opacity-30 blur-3xl"></div>
          {isRegistering ? (
            <>
              <h1 className="text-[64px] text-white font-semibold mb-4">
                Register
              </h1>
              <h1 className="text-[48px] text-white py-[10px] font-semibold mb-6">
                AI Center of Excellence
              </h1>
              <SignUp
                path="/sign-up"
                routing="path"
                signUpOptions={{
                  allowedIdentifiers: ["email"],
                }}
              />

              <button
                onClick={() => setIsRegistering(false)}
                className="text-[#76d0bb] font-semibold flex items-center gap-2 mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
            </>
          ) : (
            <>
              <h1 className="text-[64px] text-white font-semibold mb-4">
                Welcome
              </h1>
              <h1 className="text-[48px] text-white py-[10px] font-semibold mb-6">
                AI Center of Excellence
              </h1>
              <SignIn
                path="/sign-in"
                routing="path"
                signInOptions={{
                  allowedIdentifiers: ["email"],
                  oauthProviders: [],
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
