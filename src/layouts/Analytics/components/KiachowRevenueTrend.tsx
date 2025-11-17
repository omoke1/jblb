import React from "react";
import ReactApexChart from "react-apexcharts";

const KiachowRevenueTrend: React.FC = () => {
  const series = [
    {
      name: "Kiachow Commission",
      data: [120, 180, 250, 300, 400, 450, 500, 600, 700, 850, 900, 1000], // sample data in $
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#16A34A"], // Kiachow green
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      title: {
        text: "Months",
      },
    },
    yaxis: {
      title: {
        text: "Commission ($)",
      },
      labels: {
        formatter: (val: number) => `$${val}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val}`,
      },
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default KiachowRevenueTrend;
