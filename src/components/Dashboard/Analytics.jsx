"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UsageReport = () => {
  const { theme } = useTheme();
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

  function calculateActiveTime(start, end) {
    return Math.floor((end - start) / (1000 * 60)); // return in minutes
  }

  // Helper to get the start date of the week
  const getWeekStartDate = (date) => {
    const dayIndex = date.getDay(); // get the day of the week (0 for Sunday)
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - dayIndex); // set to the previous Sunday
    return startDate.toISOString().slice(0, 10); // return as YYYY-MM-DD
  };

  const aggregateData = (data, timeFrame) => {
    return data.reduce((acc, item) => {
      const startTime = new Date(item.start_time);
      const endTime = new Date(item.end_time);
      let key;
      switch (timeFrame) {
        case "daily":
          key = startTime.toISOString().slice(0, 10);
          break;
        case "weekly":
          key = getWeekStartDate(startTime);
          break;
        case "monthly":
          key = `${startTime.getFullYear()}-${startTime.getMonth() + 1}`;
          break;
      }
      const sessionDuration = calculateActiveTime(
        startTime.getTime(),
        endTime.getTime()
      );
      if (acc[key]) {
        acc[key] += sessionDuration;
      } else {
        acc[key] = sessionDuration;
      }
      return acc;
    }, {});
  };

  const dailyData = aggregateData(data, "daily");
  const weeklyData = aggregateData(data, "weekly");
  const monthlyData = aggregateData(data, "monthly");

  const createChartData = (data, label) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: label,
        data: Object.values(data),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Utilization Time",
      },
    },
    maintainAspectRatio: false, // Control aspect ratio
  };

  return (
    <div
      className={`flex flex-col gap-28 justify-center items-center p-4 ${
        theme === "dark" ? "bg-[#121212]" : "bg-white"
      } ml-16 w-full h-full`}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ width: "94.7%", height: "300px" }}>
            <Line
              data={createChartData(
                dailyData,
                "Daily Utilization Time (minutes)"
              )}
              options={options}
            />
          </div>
          <div style={{ width: "94.7%", height: "300px" }}>
            <Line
              data={createChartData(
                weeklyData,
                "Weekly Utilization Time (minutes)"
              )}
              options={options}
            />
          </div>
          <div style={{ width: "94.7%", height: "300px" }}>
            <Line
              data={createChartData(
                monthlyData,
                "Monthly Utilization Time (minutes)"
              )}
              options={options}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UsageReport;
