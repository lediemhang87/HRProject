import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import SalesChartDiv from "../../components/sales-report/sales-chart-div";
import SalesReportLatestSubscription from "../../components/sales-report/sales-report-latest-subscription";
import SalesReportTransactionTable from "../../components/sales-report/sales-preport-transaction-table";
import TopProducts from "../../components/sales-report/top-products";
const SalesReport: React.FC = () => {
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
            <Container fluid>
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="salesReport"/>
                        </Col>       
                    }
                    <Col lg={9}> 
                        <SalesChartDiv/>
                        <Row>
                            <Col lg={4}>
                                <SalesReportLatestSubscription/>
                            </Col>
                            <Col lg={8}>
                                <TopProducts/>
                            </Col>
                        </Row>
                        <SalesReportTransactionTable/>
                        
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
export default SalesReport