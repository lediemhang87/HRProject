import React, { useEffect, useRef , useState} from 'react';
import Chart from 'chart.js';

const SalesChart:React.FC = () => {
  const chart = {
    label: ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07' ],
    data: [70, 60, 90, 50, 90, 120, 70],
  } 
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {

        const data = {
          labels: chart.label,
          datasets: [
            
            {
              type: 'line',
              label: 'Line Dataset',
              backgroundColor: 'transparent',
              borderColor: '#0E9F6E',
              borderWidth: 2,
              data: chart.data , 
            },
            
          ],
        };

        const options = {
          scales: {
            xAxes: [{
              gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }
            }],
            yAxes: [
              {
                ticks: {
                  stepSize: 40,
                  beginAtZero: true,
                  max: 240,
                },
              },
            ],
          },
          legend: {
            display: false, // Hide the legend
          },
          maintainAspectRatio: false,
        };

        new Chart(ctx, {
          type: 'line',
          data: data,
          options: options,
        });
      }
    }
  }, [chart]);

  return <canvas ref={chartRef}/>;
};

export default SalesChart;
