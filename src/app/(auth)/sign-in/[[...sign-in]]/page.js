'use client';

import React, { useState } from "react";
import Image from "next/image";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useConfig } from "@/components/config-provider";

export default function Page() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { 
    logoPath, 
    logoCirclePath, 
    backgroundImg, 
    orgName, 
    primaryColor, 
    secondaryColor, 
    tagline,
    showResearcherTagline,
    deploymentType,
    backgroundColor,
    textColor
  } = useConfig();

  // Determine if we're in the KPR environment
  const isKpr = deploymentType === 'kpr';

  // Clerk appearance configuration for Nexus
  const clerkAppearance = {
    elements: {
      formButtonPrimary: {
        backgroundColor: primaryColor,
        '&:hover': {
          backgroundColor: secondaryColor
        }
      },
      headerTitle: {
        color: textColor
      },
      card: 'shadow-xl rounded-xl',
      footerActionLink: {
        color: primaryColor,
        '&:hover': {
          color: secondaryColor
        }
      },
      identityPreview: {
        borderColor: primaryColor
      },
      formFieldInput: 'rounded-md',
      formFieldAction: {
        color: secondaryColor
      },
      footer: 'hidden',
      formButtonSecondary: 'hidden',
      formFieldAction__signUp: 'hidden',
      formFieldAction__signIn: 'hidden',
      formFieldAction__forgotPassword: 'hidden',
    }
  };

  // KPR Environment
  if (isKpr) {
    return (
      <div className="w-full min-h-screen relative overflow-hidden">
        <Image
          src={backgroundImg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="-z-10"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 -z-10"></div>

        <div className="flex flex-col lg:flex-row w-full min-h-screen z-10 text-white items-center justify-center px-4 lg:px-[80px]">
          <div className="flex flex-col justify-between items-center my-8 lg:my-0 lg:mr-8">
            <div className="w-full mb-8 lg:mb-0">
              <Image src={logoPath} alt={orgName} width={250} height={80} />
            </div>
            <div className="w-full flex justify-center items-center gap-6 text-2xl lg:text-4xl mt-4 lg:mt-0">
              <Image
                src={logoCirclePath}
                alt="Logo Circle"
                width={48}
                height={48}
                className="bg-cover object-fill"
              />
              <p className="text-white">Navigate Labs</p>
            </div>
          </div>
          
          <div className="w-full max-w-md flex px-4 lg:px-12 gap-2 flex-col relative py-12">
            <div 
              className="absolute w-full h-full top-0 -z-10 left-0 opacity-30 blur-3xl rounded-xl"
              style={{ backgroundColor: primaryColor }}
            ></div>
            
                <h1 className="text-4xl lg:text-5xl text-white font-semibold mb-4">
                  Welcome
                </h1>
                <h2 className="text-2xl lg:text-3xl text-white mb-6">
                  {tagline}
                </h2>
            <div className="bg-white/10 p-4 rounded-lg mb-6">
              <p className="text-white text-center">
                This platform is invite-only. Please contact your administrator for access.
              </p>
            </div>
                <SignIn
                  path="/sign-in"
                  routing="path"
                  signInOptions={{
                    allowedIdentifiers: ["email"],
                oauthProviders: ["google", "github"],
                  }}
              appearance={clerkAppearance}
                />
          </div>
        </div>
        
        {showResearcherTagline && (
          <div className="absolute bottom-10 left-4 lg:bottom-20 lg:left-[120px] px-4">
            <h2 className="text-3xl lg:text-5xl text-white font-bold">
              All-In-One AI Platform For
            </h2>
            <h2 className="text-3xl lg:text-5xl font-bold" style={{ background: 'linear-gradient(90deg, #FFD600 10%, #47C2A4 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              RESEARCHERS
            </h2>
          </div>
        )}
      </div>
    );
  }
  
  // Nexus Environment - Matching screenshots exactly
  return (
    <div 
      className="w-full min-h-screen relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Decorative elements */}
      <div className="absolute top-[-5%] left-[5%] w-[150px] h-[250px] rounded-[40px] opacity-20 -z-0" 
           style={{ backgroundColor: 'rgba(178, 212, 240, 0.8)' }}></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 -z-0" 
           style={{ backgroundColor: 'rgba(157, 202, 235, 0.8)' }}></div>
      
      {/* Mobile layout - stacked */}
      <div className="md:hidden w-full min-h-screen flex flex-col">
        {/* Logo header */}
        <div className="pt-12 pb-8 px-6">
          <div className="flex items-center gap-3">
            <Image
              src={logoCirclePath}
              alt="Navigate Labs"
              width={42} 
              height={42}
            />
            <span style={{ color: textColor }} className="text-xl font-medium">Navigate Labs</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col px-6">
          <div className="text-center mb-8">
            <h1 
              className="text-5xl font-bold leading-tight"
              style={{ color: textColor }}
            >
              Welcome
            </h1>
            <h2 
              className="text-3xl font-bold leading-tight mt-2"
              style={{ color: textColor }}
            >
              {tagline}
            </h2>
            
            <p className="text-gray-600 text-sm mt-4 px-4">
              This platform is invite-only. Please contact your administrator for access.
            </p>
          </div>
          
          {/* Sign-in form */}
          <div className="w-full">
            <SignIn
              path="/sign-in"
              routing="path"
              signInOptions={{
                allowedIdentifiers: ["email"],
                oauthProviders: ["google", "github"],
              }}
              appearance={clerkAppearance}
            />
          </div>
          
          {/* Footer */}
          <div className="mt-auto pb-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Navigate Labs</p>
            <p>Powered by Nexus AI Platform</p>
          </div>
        </div>
      </div>
      
      {/* Desktop layout - side by side */}
      <div className="hidden md:block w-full min-h-screen">
        {/* Logo header */}
        <div className="absolute top-6 left-12 flex items-center gap-3 z-10">
          <Image
            src={logoCirclePath}
            alt="Navigate Labs"
            width={42}
            height={42}
          />
          <span style={{ color: textColor }} className="text-xl font-medium">Navigate Labs</span>
        </div>
        
        {/* Content container */}
        <div className="w-full min-h-screen flex items-center px-20">
          {/* Left side - Welcome text */}
          <div className="w-1/2 pr-12">
            <div className="max-w-md">
              <h1 
                className="text-6xl font-bold leading-tight"
                style={{ color: textColor }}
              >
                Welcome
              </h1>
              <h2 
                className="text-5xl font-bold leading-tight mt-2"
                style={{ color: textColor }}
              >
                {tagline}
              </h2>
              
              <p className="text-gray-600 text-lg mt-8 max-w-md">
                Access your advanced AI platform with a secure login. Unleash the power of AI models and analytics with Nexus.
              </p>
            </div>
          </div>
          
          {/* Right side - Sign-in form */}
          <div className="w-1/2 flex justify-end">
            <div className="w-full max-w-md">
              <SignIn
                path="/sign-in"
                routing="path"
                signInOptions={{
                  allowedIdentifiers: ["email"],
                  oauthProviders: ["google", "github"],
                }}
                appearance={clerkAppearance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 