"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useConfig } from '@/components/config-provider';

const UsageReport = () => {
  const { theme } = useTheme();
  const { backgroundColor } = useConfig();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState("testing");
  const endpoint = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpoint}/${orgName}/logs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: Cookies.get("__session") || "",
          },
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, orgName]);

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    if (hostname === "localhost" || subdomain === "dev") {
      setOrgName("testing");
    } else {
      setOrgName(subdomain);
    }
  }, []);

  function calculateActiveTime(start, end) {
    return Math.floor((end - start) / (1000 * 60)); // return in minutes
  }

  return (
    <div
      className={`flex flex-col justify-center items-center p-4 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      } ml-16`}
      style={{ backgroundColor: backgroundColor }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
                <th className="py-3 px-6">Duration</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    theme === "dark" ? "bg-[#1e1e1e]" : "bg-white"
                  } border-b`}
                >
                  <td className="py-4 px-6">{item.session_id}</td>
                  <td className="py-4 px-6">{item.app_type}</td>
                  <td className="py-4 px-6">
                    {new Date(item.start_time)
                      .toISOString()
                      .slice(0, 16)
                      .replace("T", " ")}
                  </td>
                  <td className="py-4 px-6">
                    {new Date(item.end_time)
                      .toISOString()
                      .slice(0, 16)
                      .replace("T", " ")}
                  </td>
                  <td className="py-4 px-6">
                    {calculateActiveTime(
                      new Date(item.start_time).getTime(),
                      new Date(item.end_time).getTime()
                    )}{" "}
                    mins
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UsageReport;
