import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { Container, Row, Col } from "react-bootstrap"
import DashboardRectangle from "../../components/dashboard/dashboard-rectangle"
import DashboardMixedChartDiv from "../../components/dashboard/dashboard-mixedchart-div"
import DashboardMyToDoItems from "../../components/dashboard/dashboard-mytodoitems"
import DashboardTotalRevenue from "../../components/dashboard/dashboard-totalrevenue"
import DashboardTable from "../../components/dashboard/dashboard-table"
import DashboardLocation from "../../components/dashboard/dashboard-location"
import './dashboard-style.scss'
import DashboardLatestTransaction from "../../components/dashboard/dashboard-latest-transaction"
import DashboardUserLog from "../../components/dashboard/dashboard-userLog"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import DashboardSystemStatus from "../../components/dashboard/dashboard-system-status"
import DashboardCalendar from "../../components/dashboard/dashboard-calendar"

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPhoneMode, setIsPhoneMode] = useState(false);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const employees = [ 'Liam Risher', 'Oliver Noah', 'Donald Benjamin', 'Elijah James', 'William Risher', 'Jane Doe', 'John Doe']

    const activeProjects = [
        { projectName: 'Batman', projectLead: 0, process: 100, assignee: [0, 4, 5, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Bender Project', projectLead: 1, process: 30, assignee: [0, 5, 6], status: 'pending', due: '09/24/2021' },
        { projectName: 'Bigfish', projectLead: 2, process: 76, assignee: [0, 5, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Canary', projectLead: 3, process: 40, assignee: [0, 5, 6], status: 'completed', due: '09/24/2021' },
        { projectName: 'Casanova', projectLead: 4, process: 53, assignee: [0, 5, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 6', projectLead: 0, process: 53, assignee: [1, 3, 5], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 7', projectLead: 1, process: 30, assignee: [2, 4, 6], status: 'pending', due: '09/24/2021' },
        { projectName: 'Example 8', projectLead: 2, process: 30, assignee: [0, 3, 5], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 9', projectLead: 3, process: 40, assignee: [1, 4, 6], status: 'completed', due: '09/24/2021' },
        { projectName: 'Example 10', projectLead: 4, process: 53, assignee: [2, 3, 5], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 11', projectLead: 0, process: 53, assignee: [0, 1, 3], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 12', projectLead: 1, process: 30, assignee: [2, 4, 6], status: 'pending', due: '09/24/2021' },
        { projectName: 'Example 13', projectLead: 2, process: 30, assignee: [0, 1, 5], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 14', projectLead: 3, process: 40, assignee: [2, 3, 4], status: 'completed', due: '09/24/2021' },
        { projectName: 'Example 15', projectLead: 4, process: 53, assignee: [1, 4, 5], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 16', projectLead: 0, process: 53, assignee: [0, 2, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 17', projectLead: 1, process: 30, assignee: [1, 3, 5], status: 'pending', due: '09/24/2021' },
        { projectName: 'Example 18', projectLead: 2, process: 30, assignee: [2, 4, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 19', projectLead: 3, process: 40, assignee: [0, 3, 5], status: 'completed', due: '09/24/2021' },
        { projectName: 'Example 20', projectLead: 4, process: 53, assignee: [1, 4, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 21', projectLead: 0, process: 53, assignee: [2, 3, 5], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 22', projectLead: 1, process: 30, assignee: [0, 1, 3], status: 'pending', due: '09/24/2021' },
        { projectName: 'Example 23', projectLead: 2, process: 30, assignee: [2, 4, 6], status: 'inprogress', due: '09/24/2021' },
        { projectName: 'Example 24', projectLead: 3, process: 40, assignee: [0, 1, 5], status: 'completed', due: '09/24/2021' },
        { projectName: 'Example 25', projectLead: 4, process: 53, assignee: [2, 3, 5], status: 'inprogress', due: '09/24/2021' },
      ];

    const latestTransaction = [
        {source: 'Hydratech Soft.', date: '09/24/2023', amount: 5.99, txnType: 'Sub', status: 'Completed'},
        {source: 'Locus & Locus',date: '09/24/2023', amount: 5.99, txnType: 'Sub', status: 'Failed'},
        {source: 'XYZ Intl.', date: '09/24/2021', amount: 10.99, txnType: 'Sub', status: 'Completed'},
        {source: 'Lendsqr Ltd', date: '09/25/2021', amount: 10.99, txnType: 'Sub', status: 'Completed'},
        {source: 'Esya Inc', date: '09/24/2021', amount: 5.99, txnType: 'Sub', status: 'Completed'},
        {source: 'Cynergy Tech.', date: '09/24/2021', amount: 5.99, txnType: 'Sub', status: 'Completed'},
        {source: 'Flutterwave', date: '09/24/2021', amount: 5.99, txnType: 'Sub', status: 'Failed'},
       
    ]

    const userLogs = [
        {employeeId: '1001', employeeName: 'Ricky Antony', role: 'Web Designer', email:'abc@gmail.com', contact:'+234 802345 094', lastLogged: '08/09/2023 10:02', action: 'Checked User Account', status: 'Active'},
        {employeeId: '1002', employeeName: 'Ricky Antony', role: 'Web Designer', email:'abc@gmail.com', contact:'+234 802345 094', lastLogged: '08/10/2023 12:01', action: 'Top up wallet', status: 'Pending'},
        {employeeId: '1003', employeeName: 'Ricky Antony', role: 'Web Designer', email:'abc@gmail.com', contact:'+234 802345 094', lastLogged: '08/09/2023 12:02', action: 'Sent Notification', status: 'Active'},
        {employeeId: '1004', employeeName: 'Ricky Antony', role: 'Web Designer', email:'abc@gmail.com', contact:'+234 802345 094', lastLogged: '09/09/2023 9:03', action: 'Copied Tx Ref', status: 'Active'},
        {employeeId: '1005', employeeName: 'Ricky Antony', role: 'Web Designer', email:'abc@gmail.com', contact:'+234 802345 094', lastLogged: '08/09/2023 12:10', action: 'Suspended User', status: 'Pending'},
    ]

    const status = {
        totalUptime: 20,
        totalDowntime: 2,
        serverDowntime: 1,
        apiCalls: 2,
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
                            <Sidebar activeItem="home"/>
                        </Col>
                        
                    }
                    <Col lg={10}>
                        <Row>
                            <Col lg={9}>
                                <DashboardRectangle/>
                                <Row>
                                    
                                    <Col lg={8}> <DashboardMixedChartDiv/> </Col>  {/* Job Chart */}
                                    <Col lg={4}> <DashboardMyToDoItems/> </Col>
                                </Row>
                            </Col>
                            <Col lg={3}> <DashboardTotalRevenue/> </Col>
                        </Row>
                        <Row >
                            <Col lg={6}>
                                <div className="active-projects">
                                    <div className="title-div">
                                        <div className="active-project-title"> Active Projects </div>
                                        <div className="export-report"> <FontAwesomeIcon icon={faFileExport}/> Export Report </div>
                                    </div>
                                    <div className="dashboard-table">
                                        <DashboardTable employees={employees} activeProjects={activeProjects}/>
                                    </div>    
                                </div>
                                
                            </Col>
                            <Col lg={6}>
                                <DashboardLocation />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={5}>
                                
                                <DashboardLatestTransaction transactions={latestTransaction} />
                                   
                                    
                                
                            </Col>
                            <Col lg={3}>
                            <DashboardSystemStatus status={status}/>
                            </Col>
                            <Col lg={4}> 
                                <DashboardCalendar/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                
                                <DashboardUserLog logs={userLogs}/>
                                
                                
                            </Col>
                            
                        </Row>
                    </Col>
                    
                </Row>
                
                
                
            </Container>
            
            
            

        </div>
    )
}

export default Dashboard