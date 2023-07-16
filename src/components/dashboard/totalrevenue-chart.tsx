import React, { useEffect, useRef , useState} from 'react';
import Chart from 'chart.js';
interface ChartProps {
  label: string[],
  dashLine: number[]
}
interface ChartTypeProps{
  chartType : ChartProps
}

const TotalRevenueChart:React.FC<ChartTypeProps> = ({chartType}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
        gradient.addColorStop(0, 'rgb(180, 180, 180,0.5)'); // Start color
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

        const data = {
          labels: chartType.label,
          datasets: [
            
            {
              type: 'line',
              label: 'Line Dataset',
              backgroundColor: gradient,
              borderColor: '#0D99FF',
              borderWidth: 1,
              data: chartType.dashLine, 
              tension: 0,
            },
            
          ],
        };

        const options = {
          scales: {
            
            yAxes: [
              {
                ticks: {
                  stepSize: 20,
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
          type: 'line',
          data: data,
          options: options,
        });
      }
    }
  }, [chartType]);

  return <canvas ref={chartRef} />;
};

export default TotalRevenueChart;
