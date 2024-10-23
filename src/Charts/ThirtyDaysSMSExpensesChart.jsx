import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ThirtyDaysSMSExpensesChart = () => {
  const [series] = useState([
    {
      name: "SMS",
      data: [
        10, 41, 35, 51, 49, 62, 69, 91, 148, 10, 41, 35, 51, 49, 62, 69, 91,
        148, 10, 41, 35, 51, 49, 62, 69, 91, 148, 28, 29, 30,
      ],
    },
  ]);

  const [options] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      colors: "#024950",
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ThirtyDaysSMSExpensesChart;
