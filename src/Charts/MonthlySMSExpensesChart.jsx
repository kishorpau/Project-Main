import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const MonthlySMSExpensesChart = () => {
  const [selectedYear, setSelectedYear] = useState("2081");
  const [series] = useState([
    {
      name: "Cost",
      data: [450, 720, 890, 670, 320, 410, 560, 230, 540, 620, 300, 100],
    },
  ]);

  const [options] = useState({
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
        colors: {
          ranges: [
            {
              from: 0,
              to: 1000,
              color: "#02282b",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} SMS`,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [
        "श्रावण",
        "भदौ",
        "असोज",
        "कार्तिक",
        "मंसिर",
        "पुस",
        "माघ",
        "फाल्गुन",
        "चैत",
        "बैशाख",
        "जेठ",
        "असार",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: (val) => `${val} SMS`,
      },
    },
  });

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        sx={{ minWidth: 80, position: "relative", left: "90%" }}
      >
        <InputLabel id="fiscal-year-select-label">Fiscal Year</InputLabel>
        <Select
          labelId="fiscal-year-select-label"
          value={selectedYear}
          onChange={handleYearChange}
          label="fiscal Year"
          size="small"
        >
          <MenuItem value="2081">2081</MenuItem>
          <MenuItem value="2080">2080</MenuItem>
          <MenuItem value="2079">2079</MenuItem>
          <MenuItem value="2078">2078</MenuItem>
          <MenuItem value="2077">2077</MenuItem>
        </Select>
      </FormControl>
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

export default MonthlySMSExpensesChart;
