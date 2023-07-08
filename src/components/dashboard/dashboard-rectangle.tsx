import SliderBlue from '../../assets/dashboard/sliders/slider-blue.png'
import SliderDarkBlue from '../../assets/dashboard/sliders/slider-darkblue.png'
import SliderRed from '../../assets/dashboard/sliders/slider-red.png'
import SliderGreen from '../../assets/dashboard/sliders/slider-green.png'
import MixedChart from './dashboard-mixchart'
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faBuilding, faUser, faStore } from '@fortawesome/free-solid-svg-icons'

const DashboardRectangle: React.FC = () => {
    return(
        <div>
        <Row>
            <Col lg={3}>
                <div className="rectangle">
                    <div className=" rectangle-content">
                        <div className="">
                            <p className='rectangle-title '> Total Payroll Disbursed </p>
                            <h1 className="rectangle-number"> $12,000,000 </h1>
                        </div>
                        
                        <FontAwesomeIcon className='icon-right green' icon={faDollarSign}/>
                    </div>
                    

                    <img className='slider-img' src={SliderGreen}/>
                </div>
            </Col>
            <Col lg={3}> 
                <div className="rectangle">
                    <div className="d-flex rectangle-content">
                        <div className="">
                            <p className='rectangle-title '> Total Companies </p>
                            <h1 className="rectangle-number"> 5000 </h1>
                        </div>
                        
                        <FontAwesomeIcon className='icon-right blue' icon={faBuilding}/>
                    </div>
                    <img className='slider-img' src={SliderDarkBlue}/>
                </div>
            </Col>
            <Col lg={3}>
                <div className="rectangle">
                    <div className="d-flex rectangle-content">
                        <div className="">
                            <p className='rectangle-title '> Total Users </p>
                            <h1 className="rectangle-number"> 10,000 </h1>
                        </div>
                        <FontAwesomeIcon className='icon-right blue' icon={faUser}/>
                    </div>
                    <img  className='slider-img' src={SliderBlue}/>
                </div>
            </Col>
            <Col lg={3}>
                <div className="rectangle">
                    <div className="d-flex rectangle-content">
                        <div className="">
                            <p className='rectangle-title '> Total Sales </p>
                            <h1 className="rectangle-number"> $12,000,000 </h1>
                        </div>
                        <FontAwesomeIcon className='icon-right red' icon={faStore}/>
                    </div>
                    <img className='slider-img' src={SliderRed}/>
                </div>
            </Col>
        </Row>
        
    </div>
    )

}

export default DashboardRectangle