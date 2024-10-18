import Chart from 'react-apexcharts';

const DonutChart = () => {
  const options = {
    chart: {
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series = [44, 55, 41, 17, 15]; // Data for the donut chart

  return (
    <div>
      <Chart options={options} series={series} type="donut" width="380" />
    </div>
  );
};

export default DonutChart;