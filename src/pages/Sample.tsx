import { useState, useEffect } from "react";
import NavBar from "../components/Navbar"
import Sidebar from "../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
const Sample: React.FC = () => {
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
            <Container fluid>
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="manageCustomer"/>
                        </Col>
                        
                    }
                    <Col lg={10}> Sample </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Sample