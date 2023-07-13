import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import AccountManagerRolesTable from "../../components/super-admin-panel/account-managers-roles-table";

const SuperAdminAccountManagerRoles: React.FC = () => {
    const managers = [
        {sn: 1, accountManagerRole: 'Technical Support', function: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], dateUpdated: '03/09/2020' },
        {sn: 2, accountManagerRole: 'Admin', function: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History'], dateUpdated: '03/09/2020' },
        {sn: 3, accountManagerRole: 'Customer', function: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History'], dateUpdated: '03/09/2020' },
        {sn: 4, accountManagerRole: 'Developer', function: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History'], dateUpdated: '03/09/2020' },  
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
                            <Sidebar activeItem="accountManagerRoles"/>
                        </Col>
                        
                    }
                    
                        
                    <Col className='poppins' lg={10}>
                        <div className="fw-semibold mb-4"> Managers </div>
                        <div className="bg-white rounded border">
                            <div className="fw-semibold border-bottom p-4 d-flex vertical-align "> 
                                <div className="mr-auto"> Account Managers  </div>
                                <div className=" background-orange rounded p-2"> + Add New Manager Role </div>
                            </div>
                            <div className="p-4">
                                <AccountManagerRolesTable  roles={managers}/> 
                            </div>
                        </div>    
                    </Col>
                        
                        
                    
                    
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminAccountManagerRoles