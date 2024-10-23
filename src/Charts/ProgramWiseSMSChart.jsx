import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ProgramWiseSMSChart = () => {
  const colors = ["#024950", "#024950", "#024950", "#024950"];

  const [series] = useState([
    {
      name: "SMS",
      data: [21, 22, 10, 28],
    },
  ]);

  const [options] = useState({
    chart: {
      height: 350,
      type: "bar",
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["khop", "poshan", "ANC", "FP"],
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ProgramWiseSMSChart;
