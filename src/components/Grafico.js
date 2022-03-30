/** @format */

import React from "react";
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
import { Line } from "react-chartjs-2";
const Grafico = ({ dataModal }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: true,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "History 7 day",
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        /*    y1: {
             type: 'bar',
             display: true,
             position: 'left',
             grid: {
               drawOnChartArea: true,
             },
           }, */
      },
    },
  };

  const labels =
    dataModal && dataModal?.sparkline_in_7d.price.length > 0
      ? dataModal?.sparkline_in_7d?.price.map((ddata) =>
          ddata.toLocaleString(2)
        )
      : [];
  const datas =
    dataModal && dataModal?.sparkline_in_7d.price.length > 0
      ? dataModal?.sparkline_in_7d?.price.map((ddata) => ddata)
      : [];
  const data = {
    labels,
    datas,
    datasets: [
      {
        label: "",
        fill: true,
        labels: labels,
        data: datas,
        //data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "#f7931a",
        backgroundColor: "#f7931a",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Grafico;
