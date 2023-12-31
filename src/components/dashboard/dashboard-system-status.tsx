import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js';
import '../styles3.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';


const DoughnutChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const todayStatus = {
    totalUptime: 20,
    totalDowntime: 2,
    serverDowntime: 1,
    apiCalls: 2,
  };

  const thisMonthStatus = {
    totalUptime: 10,
    totalDowntime: 8,
    serverDowntime: 2,
    apiCalls: 4,
  };

  const thisQuarterStatus = {
    totalUptime: 15,
    totalDowntime: 7,
    serverDowntime: 1,
    apiCalls: 1,
  };

  const [status, setStatus] = useState(todayStatus);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case 'option1':
        setStatus(todayStatus);
        break;
      case 'option2':
        setStatus(thisMonthStatus);
        break;
      case 'option3':
        setStatus(thisQuarterStatus);
        break;
      default:
        setStatus(todayStatus);
    }
  };

  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
        gradient.addColorStop(0, 'rgba(111, 201, 184, 0.6)'); // Start color
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        const { totalUptime, totalDowntime, serverDowntime, apiCalls } = status;

        const data = {
          labels: ['Total Uptime', 'Total Downtime', 'Server DownTime', 'API'],
          datasets: [
            {
              data: [totalUptime, totalDowntime, serverDowntime, apiCalls],

              backgroundColor: [
                '#0D99FF',
                '#3AC977',
                'rgb(255, 82, 82)',
                '#F3723F',
              ],
              borderColor: 'black',
              borderWidth:  2,
            },
          ],
        };

        const options = {
          cutoutPercentage: 90,
          legend: {
            display: false, // Hide the legend
          },
          maintainAspectRatio: true,
        };

        new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: options,
        });
      }
    }
  }, [status]);

  return (
    <div className='system-status'>
        <div className='title-div'> 
            <div className='title'> System Status </div> 
            <div className='selection'> 
                <select id="mySelect"  onChange={handleStatusChange}>
                    <option value="option1">Today</option>
                    <option value="option2">This Month</option>
                    <option value="option3">This quarter</option>
                </select>
                    
            </div>
        </div>
        <div>
            
        </div>
        <div className='chart-div'>
            <div className='chart-label'> <div className='title-number'> 24 </div> <div> Hrs System Status </div> </div>
            <div className='chart'> <canvas ref={chartRef} /> </div>
        </div>
        <div className='legend-div'>
            <div> 
                <Row>
                    <Col lg={8}>
                        <FontAwesomeIcon className='fa' icon={faSquare} color='#0D99FF'/> 
                        Total Uptime
                    </Col>
                    <Col lg={4}> {status.totalUptime} hrs</Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <FontAwesomeIcon className='fa' icon={faSquare} color='#3AC977'/> 
                        Total Downtime
                    </Col>
                    <Col lg={4}> {status.totalDowntime} hrs</Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <FontAwesomeIcon className='fa' icon={faSquare} color='rgb(255, 82, 82)'/> 
                        Server Downtime
                    </Col>
                    <Col lg={4}> {status.serverDowntime} hrs</Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <FontAwesomeIcon className='fa' icon={faSquare} color='#F3723F'/> 
                        API Calls
                    </Col>
                    <Col lg={4}> {status.apiCalls} hrs</Col>
                </Row>
            </div>
        </div>
    </div>

  )
};

export default DoughnutChartComponent;

