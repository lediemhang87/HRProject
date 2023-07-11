import { useState } from 'react'
import MixedChart from './dashboard-mixchart'
import { Container, Row, Col } from "react-bootstrap"
import '../styles.scss'
const DashboardMixedChartDiv: React.FC = () => {
    
    const yearChart = {
        label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        bar: [75,80,73,100,50,100,82,75,95,35,75,100],
        solidLine: [45, 65, 60, 75, 50, 55, 45, 55, 75, 45, 50, 42],
        dashLine: [28, 25, 45, 27, 25,30, 23, 45, 32, 23, 30, 24]
    }

    const monthChart = {
        label: Array.from({ length: 31 }, (_, i) => String(i + 1)),
        bar: [75, 80, 73, 100, 50, 100, 82, 75, 95, 35, 75, 100, 65, 70, 85, 90, 50, 95, 78, 60, 55, 75, 88, 73, 80, 92, 68, 75, 80, 85, 90],
        solidLine: [45, 65, 60, 75, 50, 55, 45, 55, 75, 45, 50, 42, 40, 50, 65, 70, 35, 72, 58, 40, 30, 45, 55, 48, 52, 62, 38, 50, 55, 58, 65],
        dashLine: [28, 25, 45, 27, 25, 30, 23, 45, 32, 23, 30, 24, 20, 25, 38, 42, 18, 42, 35, 20, 15, 28, 30, 25, 32, 38, 22, 30, 32, 35, 40]
      };

    const weekChart = {
        label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        bar: [75, 80, 73, 100, 50, 100, 82],
        solidLine: [45, 65, 60, 75, 50, 55, 45],
        dashLine: [28, 25, 45, 27, 25, 30, 23]
      };

    const [chartType, setChartType] = useState(weekChart);

    const handleChartType = (type: String)=> {
        if (type == 'week'){
            setChartType(weekChart)
        }
        else if (type == 'month'){
            setChartType(monthChart)
        }
        else if (type == 'year'){
            setChartType(yearChart)
        }
    }

    const activDiv = (type: string) => {
        if (type == 'week'){
            return chartType.label.length == 7
        }
        else if (type == 'month'){
            return chartType.label.length == 31
        }
        else if (type == 'year'){
            return chartType.label.length == 12
        }
    };
    return(
        <div className='chart-div'>
            
                <div className='mixed-chart' style={{borderStartStartRadius: '10px', borderStartEndRadius: '10px'}}>
                    <div className='title'>
                        <div className='title-div'>
                            Job Chart
                        </div>
                        
                        <div className='buttons ms-auto font-size-12'> 
                            <div  className={`job-chart-button  ${activDiv('week') ? 'active' : ''}`}  onClick={() => handleChartType('week')}> Week </div>
                            <div  className={`job-chart-button ${activDiv('month') ? 'active' : ''}`}  onClick={() => handleChartType('month')}> Month </div>
                            <div  className={`job-chart-button ${activDiv('year') ? 'active' : ''}`}  onClick={() => handleChartType('year')}> Year </div>
                        </div>

                    </div>
                    <div className='chart' >
                        <MixedChart chartType  = {chartType}/> 
                    </div>
                    
                </div>
                
                <div className='table-div'>
                        <div className='column-div' style={{borderEndStartRadius: '10px'}}>
                            <div className='number'>12,721</div>
                            <div className='description'>Numbers of Users</div>
                        </div>
                        <div className='column-div'>
                            <div className='number'>721</div>
                            <div className='description'>Numbers of Companies</div>
                        </div>
                    
                        <div className='column-div'>
                            <div className='number'>$250,523</div>
                            <div className='description'>Revenue</div>
                        </div>
                        <div className='column-div' style={{borderRight: '1px solid gray', borderEndEndRadius:'10px'}}>
                            <div className='number'>12,350</div>
                            <div className='description'>Total Job Posts</div>
                        </div>
                </div>
                    
            
        </div>
    )
}

export default DashboardMixedChartDiv