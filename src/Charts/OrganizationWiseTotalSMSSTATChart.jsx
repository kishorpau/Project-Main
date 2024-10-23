import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const OrganizationWiseTotalSMSSTATChart = () => {
  const [series] = useState([
    {
      name: "Pending SMS",
      data: [44, 55, 41, 67, 22],
    },
    {
      name: "Sent SMS",
      data: [13, 23, 20, 8, 13],
    },
    {
      name: "Waiting SMS",
      data: [11, 17, 15, 15, 21],
    },
    {
      name: "Cancelled SMS",
      data: [21, 7, 25, 13, 22],
    },
  ]);

  const [options] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Health Post 1",
        "Health Post 2",
        "Health Post 3",
        "Health Post 4",
        "Health Post 5",
      ],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#FFEB3B", "#4CAF50", "#64B5F6", "#F44336"],
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

export default OrganizationWiseTotalSMSSTATChart;
