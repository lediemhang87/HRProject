
import '../styles2.scss'
import { useState } from 'react'
import TotalRevenueChart from './totalrevenue-chart'
import { Row, Col } from 'react-bootstrap'
const DashboardTotalRevenue: React.FC = () => {
    const yearChart = {
        label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dashLine: [28, 25, 45, 27, 25,30, 23, 45, 32, 23, 30, 24]
    }
    
    const monthChart = {
        label: Array.from({ length: 31 }, (_, i) => String(i + 1)),
        dashLine: [28, 25, 45, 27, 25, 30, 23, 45, 32, 23, 30, 24, 20, 25, 38, 42, 18, 42, 35, 20, 15, 28, 30, 25, 32, 38, 22, 30, 32, 35, 40]
    };
    
    const weekChart = {
        label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dashLine: [28, 25, 45, 27, 25, 30, 23]
    };

    const dayChart = {
        label: ['00:00', '06:00', '12:00', '18:00'],
        dashLine: [28, 25, 45, 27]
    };

    const [chartType, setChartType] = useState(yearChart);

    const handleChartType = (type: String)=> {
        if (type == 'day'){
        setChartType(dayChart)
        }
        else if (type == 'week'){
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
        if (type == 'day'){
            return chartType.label.length == 4
        }
        else if (type == 'week'){
            return chartType.label.length == 7
        }
        else if (type == 'month'){
            return chartType.label.length == 31
        }
        else if (type == 'year'){
            return chartType.label.length == 12
        }
        return false
    };
    
    return(
        <div className='totalRevenue'>
            <div className='title'> Total Revenue (All-time) </div>
            <div className='revenue-number'> $6,743.00 </div>
            <div className='time-period'> 
                <Row>
                    <Col> <div className={`cursor-pointer ${activDiv('day') ? 'active' : ''}`} onClick={() => handleChartType('day')}> Day </div></Col>
                    <Col> <div className={`cursor-pointer ${activDiv('week') ? 'active' : ''}`} onClick={() => handleChartType('week')}> Week </div></Col>
                    <Col> <div className={`cursor-pointer ${activDiv('month') ? 'active' : ''}`} onClick={() => handleChartType('month')}> Month </div></Col>
                    <Col> <div className={`cursor-pointer ${activDiv('year') ? 'active' : ''}`} onClick={() => handleChartType('year')}> Year </div></Col>
                </Row> 
                <br/>
            </div>
            <div className='chart'>
                <TotalRevenueChart chartType={chartType}/>

            </div>

        </div>

    )
}
export default DashboardTotalRevenue