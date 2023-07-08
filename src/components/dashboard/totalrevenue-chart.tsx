import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const TotalRevenueChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
        gradient.addColorStop(0, 'rgb(180, 180, 180,0.5)'); // Start color
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

        const data = {
          labels: ['May', 'June', 'July', 'Aug', 'Sep', 'Oct'],
          datasets: [
            
            {
              type: 'line',
              label: 'Line Dataset',
              backgroundColor: gradient,
              borderColor: '#0D99FF',
              borderWidth: 1,
              data: [620, 680, 600, 700, 620, 710], 
              tension: 0,
            },
            
          ],
        };

        const options = {
          scales: {
            
            yAxes: [
              {
                ticks: {
                  stepSize: 200,
                  beginAtZero: true,
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
          type: 'bar',
          data: data,
          options: options,
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default TotalRevenueChart;
