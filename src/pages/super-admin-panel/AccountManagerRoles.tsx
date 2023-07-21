import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import AccountManagerRolesTable from "../../components/super-admin-panel/account-managers-roles-table";

const SuperAdminAccountManagerRoles: React.FC = () => {
    const managers = [
        {sn: 1, accountManagerRole: 'Technical Support', roleFunction: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], dateUpdated: '03/09/2020' },
        {sn: 2, accountManagerRole: 'Admin', roleFunction: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History'], dateUpdated: '03/09/2020' },
        {sn: 3, accountManagerRole: 'Customer', roleFunction: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History'], dateUpdated: '03/09/2020' },
        {sn: 4, accountManagerRole: 'Developer', roleFunction: 'Check user info and resolve queries', roles: ['Manage Customers', 'Manage Resellers', 'Payment History'], dateUpdated: '03/09/2020' },  
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
        <div className="default-background-color" >
            <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar}/>
            <Container fluid >
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="accountManagerRoles"/>
                        </Col>
                        
                    }
                        
                    <Col className='poppins' lg={10}>
                       
                        <AccountManagerRolesTable  rolesData={managers}/> 
                               
                    </Col>
                        
                        
                    
                    
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminAccountManagerRoles