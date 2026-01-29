"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartsSection = () => {
  // Data for the bar chart
  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Vendors",
        data: [150, 180, 220, 200, 170, 190, 250], // Sample data
        backgroundColor: "#2A98FF",
        borderRadius: 8,
        barThickness: 90,
      },
    ],
  };

  // Bar Chart Options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }, // Disabling tooltip as per design
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
        ticks: {
          stepSize: 50,
          color: "#1F1F1F", // Y-axis text color
        },
        grid: {
          color: "#DBDBDB", // Grid line color
          drawBorder: false,
          borderDash: [5, 5], // Dashed grid lines
        },
      },
      x: {
        grid: { display: true },
        ticks: {
          color: "#1F1F1F", // X-axis text color
        },
      },
    },
  };

  // ✅ JSX Layout
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Bar Chart */}
      <div className="rounded-xl shadow-sm p-5 border border-[#DBDBDB] bg-[#FEFEFE]">
        <div
          className="pb-5"
        >
          <h3 className="text-black text-xl font-normal">
            Active Drivers Trend (Last 7 Days)
          </h3>
        </div>
        <div className="h-64">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
