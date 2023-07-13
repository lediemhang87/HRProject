import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import SetFeaturesTable from "../../components/super-admin-panel/set-features-table";
const SuperAdminSetWebsitePricing: React.FC = () => {

    const features = [
        { sn: 1, planName: 'Essential', features: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], dateUpdated: '03/09/2920'},
        { sn: 2, planName: 'Premium', features: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], dateUpdated: '03/09/2920'},
        { sn: 3, planName: 'Boost', features: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], dateUpdated: '03/09/2920'},
        { sn: 4, planName: 'Perform', features: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], dateUpdated: '03/09/2920'},
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
                            <Sidebar activeItem="websitePricing"/>
                        </Col>
                        
                    }
                    <Col className='poppins' lg={10}>
                        <div className="fw-semibold mb-4"> Set Website Prices & Features </div>
                        <div className="bg-white rounded border mb-8">
                            <div className="fw-semibold border-bottom p-4 d-flex vertical-align "> 
                                <div className="mr-auto"> Set Default Prices  </div>
                                <div className=" background-orange rounded p-2"> + Add New Pricing </div>
                            </div>
                            <div className="p-4">
                                <div className="fw-semibold mb-10"> Plans Pricing <span className="text-danger">*</span></div>

                                <div className="d-flex justify-content-center mb-6">
                                    <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Name"/>
                                    <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Price"/>
                                    <select className=' w-25 mr-16 border rounded p-3' placeholder="Frequency">
                                        <option> 1 </option>
                                        <option> 2 </option>
                                    </select>
                                    <button className=" background-orange p-3 rounded text-white"> Save </button>
                                </div>

                                <div className="d-flex justify-content-center mb-6">
                                    <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Name"/>
                                    <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Price"/>
                                    <select className=' w-25 mr-16 border rounded p-3' placeholder="Frequency">
                                        <option> 1 </option>
                                        <option> 2 </option>
                                    </select>
                                    <button className=" background-orange p-3 rounded text-white"> Save </button>
                                </div>

                                <div className="d-flex justify-content-center mb-6">
                                    <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Name"/>
                                    <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Price"/>
                                    <select className=' w-25 mr-16 border rounded p-3' placeholder="Frequency">
                                        <option> 1 </option>
                                        <option> 2 </option>
                                    </select>
                                    <button className=" background-orange p-3 rounded text-white"> Save </button>
                                </div>
                            </div>

                            
                        </div>

                        <div className="bg-white rounded border">
                            <div className="fw-semibold border-bottom p-4 d-flex vertical-align "> 
                                <div className="mr-auto"> Set Features  </div>
                            </div>
                            <div className="p-4">
                                <SetFeaturesTable features={features} />    
                            </div>
                            
                        </div>    
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminSetWebsitePricing