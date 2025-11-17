import React from "react";
import ReactApexChart from "react-apexcharts";

const KiachowOrderVolume: React.FC = () => {
  const series = [
    {
      name: "Orders",
      data: [50, 75, 90, 120, 150, 180, 200, 230, 260, 300, 320, 350], // sample order counts
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#3B82F6"], // blue for orders
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}`,
      style: {
        colors: ["#111"],
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
        text: "Number of Orders",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} orders`,
      },
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default KiachowOrderVolume;
