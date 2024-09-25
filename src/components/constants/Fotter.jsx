"use client";
import React, { useRef } from "react";
import Logo from "/public/Fotter/logo1.png";
import Image from "next/image";
import {FaLinkedin} from "react-icons/fa";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <div >
        {/*  primary footer */}
        <motion.div
          ref={ref1}
          className="w-full bg-[#0C0C0C] h-max px-6 md:px-[30px] lg:px-[200px] py-[32px] md:py-[80px] "
          initial="hidden"
          animate={isInView1 ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          variants={variants}
        >
          <div className="w-[120px] h-[36px] md:w-[193px] md:h-[58px] relative mb-[32px]">
            <Image
              src={Logo}
              layout="fill"
              alt="Image"
              className="-translate-y-[25%]"
            />
          </div>

          <div className="md:hidden -mt-4 pb-[32px]">
            <p className="text-[16px] font-ssp text-white font-semibold mb-[12px]">
              Contact Us
            </p>
            <p className="text-[14px] font-ssp text-white mb-[5px]">
              navigatelabs@navigatelabs.org
            </p>
            <p className="text-[14px] font-ssp text-white">+91 93444 78648</p>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div className="md:hidden pb-5 basis-1/2">
              <p className="text-[16px] font-ssp text-white font-semibold mb-[15px]">
                Follows us on
              </p>
              <a
                href="https://www.linkedin.com/in/navigate-labs-1b18a1320/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-[28px] h-[28px] md:w-[44px] md:h-[44px] bg-[#36DBB3] rounded-md text-white flex items-center justify-center hover:shadow-lg">
                  <FaLinkedin size={30} className="p-[5px] md:p-0" />
                </div>
              </a>
            </div>

            {/* basis 2 */}
            <div className="basis-2/10 mb-10 md:mb-0">
              <p className="text-[16px] md:text-[20px] font-ssp text-white font-semibold mb-[20px]">
                Company
              </p>
              <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                About Our Company
              </p>
              <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                Services
              </p>
              <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                Core Offerings
              </p>
              <p className="text-[14px] md:text-[16px] font-ssp text-white">
                Contact Us
              </p>
            </div>

            {/* basis 3 */}
            <div className="basis-2/10 mb-10 md:mb-0">
              <p className="text-[16px] md:text-[20px] font-ssp text-white font-semibold mb-[20px]">
                Services
              </p>
              <a href="/services/university">
                <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                  University
                </p>
              </a>
              <a href="/services/schools">
                <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                  Schools
                </p>
              </a>
              <a href="/services/corporates">
                <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                  Corporates
                </p>
              </a>
              <a href="/services/everyone">
                <p className="text-[14px] md:text-[16px] font-ssp text-white">
                  Everyone
                </p>
              </a>
            </div>

            {/* basis 4 */}
            <div className="basis-3/10 mb-[32px] md:mb-0">
              <p className="text-[16px] md:text-[20px] font-ssp text-white font-semibold mb-[20px]">
                Products
              </p>
              <a href="/products/ai-innovation-lab">
                <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                  Nexus AI
                </p>
              </a>
              <a href="/products/smart-assessment-tool">
                <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                  Elevate AI
                </p>
              </a>
              <a href="/products/academic-ai-assistant">
                <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                  Quest AI
                </p>
              </a>
            </div>

            <div className="basis-3/10 flex flex-col mb-[32px] md:mb-0">
              <div>
                <p className="text-[16px] md:text-[20px] font-ssp text-white font-semibold mb-[20px]">
                  Solutions
                </p>
                {/* <a href="/solutions/agriculture">
                  <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                    Agriculture
                  </p>
                </a> */}
                <a href="/solutions/healthcare">
                  <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                    Health Care
                  </p>
                </a>
                <a href="/solutions/finance">
                  <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                    Finance
                  </p>
                </a>
                {/* <a href="/solutions/fashion">
                  <p className="text-[14px] md:text-[16px] font-ssp text-white mb-[15px]">
                    Fashion
                  </p>
                </a> */}
              </div>
            </div>
          </div>

          {/* flex 2 */}
          <div className="hidden md:flex gap-10 lg:gap-16 flex-col md:flex-row mt-[50px]">
            <div className="basis-1/6">
              <p className="text-[16px] md:text-[20px] font-ssp text-white font-semibold mb-[20px]">
                Contact Us
              </p>
              <p className="text-[16px] font-ssp text-white mb-[15px]">
                navigatelabs@navigatelabs.org
              </p>
              <p className="text-[16px] font-ssp text-white">+91 93444 78648</p>
            </div>

            <div className="hidden md:block basis-2/4 lg:basis-2/6">
              <p className="text-[16px] md:text-[20px] font-ssp text-white font-semibold mb-[15px]">
                Follows us on
              </p>
              <div className="max-w-[300px] grid grid-cols-3 sm:grid-cols-5 gap-[10px]">
                <a
                  href="https://www.linkedin.com/in/navigate-labs-1b18a1320/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-[44px] h-[44px] bg-[#36DBB3] rounded-md text-white flex items-center justify-center hover:shadow-lg">
                    <FaLinkedin size={30} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/*  secondary footer */}
        <div className="w-full h-max px-[20px] lg:px-[200px] py-[20px] bg-black">
          <div className="flex gap-2 justify-between w-[100%] md:grid grid-cols-1 md:grid-cols-3 md:gap-4">
            <p className="text-[10px] md:text-[16px] font-ssp text-white md:font-semibold text-center md:text-left">
              © 2024 Copyright
            </p>
            <p className="text-[10px] md:text-[16px] font-ssp text-white md:font-semibold text-center">
              Privacy Policy
            </p>
            <p className="text-[10px] md:text-[16px] font-ssp text-white md:font-semibold text-center">
              Terms of Use
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
