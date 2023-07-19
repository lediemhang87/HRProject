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
        <div className="default-background-color">
            <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar}/>
            <Container fluid >
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="websitePricing"/>
                        </Col>
                        
                    }
                    <Col className='poppins' lg={10}>
                        

                        
                                <SetFeaturesTable features={features} />    
                            
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminSetWebsitePricing