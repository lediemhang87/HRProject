import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug, faPlugCircleBolt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import SetPaymentGateWayTable from "../../components/super-admin-panel/set-payment-gateway-table";
const SuperAdminSetPaymentGateway: React.FC = () => {
    const customers = [
        {sn: 1, name: 'Flutterwave', apiKey: 'asasdasdas', service: 'Payment', status: 'Activated' },
        {sn: 2, name: 'Paystack', apiKey: '124afasfer3rgrhg', service: 'Payment', status: 'Activated'},
        {sn: 3, name: 'Paystack', apiKey: 'wehr39rhjwrs', service: 'Payment', status: 'Deactivated'},
        {sn: 4, name: 'Flutterwave', apiKey: '123sjfhuefu', service: 'Payment', status: 'Deactivated'},
        
    ]
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPhoneMode, setIsPhoneMode] = useState(false);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = (): void => {
        setIsPhoneMode(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <div>
            <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar}/>
            <Container fluid className="default-background-color">
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="paymentGateway"/>
                        </Col>
                        
                    }
                    <Col lg={10}> 
                        <div className="border bg-white p-4 rounded">
                            <div className="text-xl fw-semibold border-bottom p-2 mb-4"> All Customer </div>
                            <SetPaymentGateWayTable paymentSettings={customers}/>
                        </div>
                        <div className="mt-8 "> 
                            <div className="d-flex justify-content-center mb-10 "> 
                                <div className=" background-darkblue vertical-align d-flex text-white w-25 height-80 mr-20 p-4 rounded">
                                    <div className="mr-auto text-left"> 4 <br/> Total API List</div>
                                    <FontAwesomeIcon className='height-30'icon={faPlug}/>
                                </div>

                                <div className="background-green vertical-align d-flex text-white w-25 height-80 p-4 rounded">
                                    <div className="mr-auto text-left"> 5 <br/> API Connected </div>
                                    
                                    <FontAwesomeIcon className='height-30' icon={faPlugCircleBolt}/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className=" bg-danger vertical-align d-flex text-white w-25 height-80 p-4 rounded">
                                    <div className="mr-auto text-left"> 5 <br/> API Pending Connection </div>
                                    <FontAwesomeIcon className='height-30' icon={faTriangleExclamation}/>
                                </div>
                            </div>
                            
                        </div>
                       
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminSetPaymentGateway