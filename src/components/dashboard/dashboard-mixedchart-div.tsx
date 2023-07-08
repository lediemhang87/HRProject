
import MixedChart from './dashboard-mixchart'
import { Container, Row, Col } from "react-bootstrap"
import '../styles.scss'
const DashboardMixedChartDiv: React.FC = () => {
    return(
        <div className='chart-div'>
            
                <div className='mixed-chart' style={{borderStartStartRadius: '10px', borderStartEndRadius: '10px'}}>
                    <div className='title'>
                        <div className='title-div'>
                            Job Chart
                        </div>
                        
                        <div className='buttons ms-auto'> 
                        <div className='button active'> Week </div>
                        <div className='button'> Month </div>
                        <div className='button'> Year </div>
                        <div className='button'> All </div>
                    </div>

                    </div>
                    <div className='chart' >
                        <MixedChart /> 
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