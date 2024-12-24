// "use client";
// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import Cookies from "js-cookie";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const UsageReport = () => {
//   const { theme } = useTheme();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [orgName, setOrgName] = useState("testing");
//   const endpoint = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${endpoint}/${orgName}/logs`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Token: Cookies.get("__session") || "",
//           },
//         });
//         const data = await response.json();
//         setData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint, orgName]);

//   function calculateActiveTime(start, end) {
//     return Math.floor((end - start) / (1000 * 60)); // return in minutes
//   }

//   const getWeekStartDate = (date) => {
//     const dayIndex = date.getDay();
//     const startDate = new Date(date);
//     startDate.setDate(date.getDate() - dayIndex);
//     return startDate.toISOString().slice(0, 10);
//   };

//   const aggregateData = (data, timeFrame) => {
//     return data.reduce((acc, item) => {
//       const startTime = new Date(item.start_time);
//       const endTime = new Date(item.end_time);
//       let key;
//       switch (timeFrame) {
//         case "daily":
//           key = startTime.toISOString().slice(0, 10);
//           break;
//         case "weekly":
//           key = getWeekStartDate(startTime);
//           break;
//         case "monthly":
//           key = `${startTime.getFullYear()}-${String(
//             startTime.getMonth() + 1
//           ).padStart(2, "0")}`;
//           break;
//       }
//       if (!acc[key]) {
//         acc[key] = {};
//       }
//       acc[key][item.app_type] =
//         (acc[key][item.app_type] || 0) +
//         calculateActiveTime(startTime.getTime(), endTime.getTime());
//       return acc;
//     }, {});
//   };

//   const dailyData = aggregateData(data, "daily");
//   const weeklyData = aggregateData(data, "weekly");
//   const monthlyData = aggregateData(data, "monthly");

//   const createChartData = (data, label, isSplit = false) => {
//     if (!isSplit) {
//       return {
//         labels: Object.keys(data),
//         datasets: [
//           {
//             label: label,
//             data: Object.keys(data).map((key) =>
//               Object.values(data[key]).reduce((a, b) => a + b, 0)
//             ),
//             borderColor: "rgb(53, 162, 235)",
//             backgroundColor: "rgba(53, 162, 235, 0.5)",
//           },
//         ],
//       };
//     } else {
//       return {
//         labels: Object.keys(data),
//         datasets: [
//           {
//             label: "Jupyter Notebook (minutes)",
//             data: Object.keys(data).map(
//               (key) => data[key]["JupyterLab"] || 0
//             ),
//             borderColor: "rgb(255, 99, 132)",
//             backgroundColor: "rgba(255, 99, 132, 0.5)",
//           },
//           {
//             label: "VSCode (minutes)",
//             data: Object.keys(data).map((key) => data[key]["CodeEditor"] || 0),
//             borderColor: "rgb(54, 162, 235)",
//             backgroundColor: "rgba(54, 162, 235, 0.5)",
//           },
//         ],
//       };
//     }
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Utilization Time",
//       },
//     },
//     maintainAspectRatio: false, // Control aspect ratio
//   };

//   return (
//     <div
//       className={`flex flex-col gap-28 justify-center items-center p-4 ${
//         theme === "dark" ? "bg-[#121212]" : "bg-white"
//       } ml-16 w-full h-full`}
//     >
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div style={{ width: "94.7%", height: "300px" }}>
//             <Line
//               data={createChartData(
//                 dailyData,
//                 "Daily Utilization Time (minutes)"
//               )}
//               options={options}
//             />
//           </div>
//           <div style={{ width: "94.7%", height: "300px" }}>
//             <Line
//               data={createChartData(
//                 weeklyData,
//                 "Weekly Utilization Time by Application",
//                 true
//               )}
//               options={{
//                 ...options,
//                 title: {
//                   ...options.title,
//                   text: "Weekly Utilization Time by Application",
//                 },
//               }}
//             />
//           </div>
//           <div style={{ width: "94.7%", height: "300px" }}>
//             <Line
//               data={createChartData(
//                 monthlyData,
//                 "Monthly Utilization Time (minutes)"
//               )}
//               options={options}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UsageReport;


"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        const result = await response.json();
        setData(result);
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

  const getWeekStartDate = (date) => {
    const dayIndex = date.getDay();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - dayIndex);
    return startDate.toISOString().slice(0, 10);
  };

  const aggregateData = (logs, timeFrame) => {
    return logs.reduce((acc, log) => {
      const startTime = new Date(log.start_time);
      const endTime = new Date(log.end_time);
      let key;
      switch (timeFrame) {
        case "daily":
          key = startTime.toISOString().slice(0, 10);
          break;
        case "weekly":
          key = getWeekStartDate(startTime);
          break;
        case "monthly":
          key = `${startTime.getFullYear()}-${String(
            startTime.getMonth() + 1
          ).padStart(2, "0")}`;
          break;
      }
      if (!acc[key]) {
        acc[key] = {};
      }
      acc[key][log.app_type] =
        (acc[key][log.app_type] || 0) +
        calculateActiveTime(startTime.getTime(), endTime.getTime());
      return acc;
    }, {});
  };

  const dailyData = aggregateData(data, "daily");
  const weeklyData = aggregateData(data, "weekly");
  const monthlyData = aggregateData(data, "monthly");

  const createChartData = (aggregatedData, label, isSplit = false) => {
    if (!isSplit) {
      return {
        labels: Object.keys(aggregatedData),
        datasets: [
          {
            label: label,
            data: Object.keys(aggregatedData).map((key) =>
              Object.values(aggregatedData[key]).reduce((a, b) => a + b, 0)
            ),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
    } else {
      const appTypes = Object.values(aggregatedData).flatMap(Object.keys);
      const uniqueAppTypes = [...new Set(appTypes)];
      return {
        labels: Object.keys(aggregatedData),
        datasets: uniqueAppTypes.map((appType) => ({
          label: `${appType} (minutes)`,
          data: Object.keys(aggregatedData).map(
            (key) => aggregatedData[key][appType] || 0
          ),
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        })),
      };
    }
  };

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
    maintainAspectRatio: false,
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
            <Bar
              data={createChartData(
                dailyData,
                "Daily Utilization Time (minutes)"
              )}
              options={options}
            />
          </div>
          <div style={{ width: "94.7%", height: "300px" }}>
            <Bar
              data={createChartData(
                weeklyData,
                "Weekly Utilization Time by Application",
                true
              )}
              options={{
                ...options,
                title: {
                  ...options.title,
                  text: "Weekly Utilization Time by Application",
                },
              }}
            />
          </div>
          <div style={{ width: "94.7%", height: "300px" }}>
            <Bar
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
