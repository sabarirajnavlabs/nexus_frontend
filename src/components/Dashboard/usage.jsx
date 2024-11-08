"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

const UsageReport = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [orgName, setOrgName] = useState("testing");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nsh6zxrxlj.execute-api.us-east-1.amazonaws.com/testing/${orgName}/logs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Token: Cookies.get("__session") || "",
            },
          }
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [orgName]);

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    if (hostname === "localhost" || subdomain === "dev") {
      setOrgName("testing");
    } else {
      setOrgName(subdomain);
    }
  }, []);

  console.log(data);

  return (
    <div
      className={`flex justify-center items-center p-4 ${
        theme === "dark" ? "bg-[#121212]" : "bg-white"
      } ml-16`}
    >
      <table
        className={`w-full text-sm ${
          theme === "dark" ? "text-white" : "text-gray-900"
        } shadow-lg rounded-lg`}
      >
        <thead>
          <tr
            className={`${
              theme === "dark" ? "bg-[#333333]" : "bg-gray-200"
            } uppercase`}
          >
            <th className="py-3 px-6">Session ID</th>
            <th className="py-3 px-6">App Type</th>
            <th className="py-3 px-6">Start Time</th>
            <th className="py-3 px-6">End Time</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  theme === "dark" ? "bg-[#1e1e1e]" : "bg-white"
                } border-b`}
              >
                <td className="py-4 px-6">{item.session_id}</td>
                <td className="py-4 px-6">{item.app_type}</td>
                <td className="py-4 px-6">{item.start_time}</td>
                <td className="py-4 px-6">{item.end_time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsageReport;
