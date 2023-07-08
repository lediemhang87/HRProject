import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { Container, Row, Col } from "react-bootstrap"
import DashboardRectangle from "../../components/dashboard/dashboard-rectangle"
import DashboardMixedChartDiv from "../../components/dashboard/dashboard-mixedchart-div"
import DashboardMyToDoItems from "../../components/dashboard/dashboard-mytodoitems"
import DashboardTotalRevenue from "../../components/dashboard/dashboard-totalrevenue"
import './dashboard-style.scss'
const Dashboard: React.FC = () => {
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
        <div className="dashboard">
            <Navbar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar}/>
            <Container fluid>
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar />
                        </Col>
                    }
                    <Col lg={10}>
                        <Row>
                            <Col lg={9}>
                                <DashboardRectangle/>
                                <Row>
                                    <Col lg={8}> <DashboardMixedChartDiv/> </Col>
                                    <Col lg={4}> <DashboardMyToDoItems/> </Col>
                                </Row>
                            </Col>
                            <Col lg={3}> <DashboardTotalRevenue/> </Col>
                        </Row>
                    </Col>
                    


                </Row>
                
            </Container>
            
            
            

        </div>
    )
}

export default Dashboard