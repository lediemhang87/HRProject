import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const MixedChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
        gradient.addColorStop(0, 'rgba(111,201,184,0.6)'); // Start color
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

        const data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              type: 'bar',
              label: 'Bar Dataset',
              backgroundColor: 'black',
              barPercentage: 0.1,
              categoryPercentage: 0.8, 
              data: [75,80,73,100,50,100,82,75,95,35,75,100],
            },
            {
              type: 'line',
              label: 'Line Dataset',
              backgroundColor: gradient,
              borderColor: 'rgba(111,201,184)',
              borderWidth: 1,
              data: [45, 65, 60, 75, 50, 55, 45, 55, 75, 45, 50, 42], // Adjusted values to start from the same y-value
              tension: 0,
            },
            {
                type: 'line',
                label: 'Red Dashed Line',
                borderColor: 'rgba(255, 99, 99, 1)', // Red color
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderDash: [5, 5], // Make the line dashed with a pattern
                data: [28, 25, 45, 27, 25,30, 23, 45, 32, 23, 30, 24], // Example data for the red dashed line
              },
          ],
        };

        const options = {
          scales: {
            
            yAxes: [
              {
                ticks: {
                    stepSize: 25,
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

export default MixedChartComponent;
