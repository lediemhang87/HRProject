
import '../styles2.scss'
import TotalRevenueChart from './totalrevenue-chart'
import { Row, Col } from 'react-bootstrap'
const DashboardTotalRevenue: React.FC = () => {
    return(
        <div className='totalRevenue'>
            <div className='title'> Total Revenue (All-time) </div>
            <div className='revenue-number'> $6,743.00 </div>
            <div className='time-period'> 
                <Row>
                    <Col> <div className='active'> Day </div></Col>
                    <Col> <div className=''> Week </div></Col>
                    <Col> <div className=''> Month </div></Col>
                    <Col> <div className=''> Year </div></Col>
                </Row> 
                <br/>
            </div>
            <div className='chart'>
                <TotalRevenueChart/>
            </div>

        </div>

    )
}
export default DashboardTotalRevenue