import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import AccountManagerTable from "../../components/super-admin-panel/account-managers-table";
const SuperAdminAccountManagers: React.FC = () => {

    const accountManagers = [
        {sn: 1, accountManager: 'Olufunke Wasiu', dateAdded: '03/09/2020', role: 'Technical Support'},
        {sn: 2, accountManager: 'Adedapo Deborah', dateAdded: '03/09/2020', role: 'Admin'},
        {sn: 3, accountManager: 'Olorunde Seun', dateAdded: '03/09/2020', role: 'Customer Support'},
        {sn: 4, accountManager: 'Emmanuel Alayande', dateAdded: '03/09/2020', role: 'Developer'}
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
                            <Sidebar activeItem="accountManager"/>
                        </Col>
                        
                    }
                    <Col className='poppins' lg={10}>
                        
                                <AccountManagerTable  managersData={accountManagers}/> 
                            
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminAccountManagers