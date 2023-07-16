import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col, Button } from "react-bootstrap";
import SavedNotifTable from "../../components/super-admin-panel/saved-notif-table";
const SuperAdminNotification: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPhoneMode, setIsPhoneMode] = useState(false);

    const notifications = [
        {sn: 1, page: 'Landing Page Header', message: 'We have just raised $1mil'},
        {sn: 2, page: 'HR Center Dasboard Admin', message: 'We have just raised $1mil'},
        {sn: 3, page: 'Login Page', message: 'We have just raised $1mil'},
        {sn: 4, page: 'OTP', message: 'We have just raised $1mil'},
        {sn: 5, page: 'Dashboard', message: 'We have just raised $1mil'},
        {sn: 6, page: 'Notification', message: 'We have just raised $1mil'},
        {sn: 7, page: 'Landing Page Header', message: 'We have just raised $1mil'},
        {sn: 8, page: 'HR Center Dasboard Admin', message: 'We have just raised $1mil'},
        {sn: 9, page: 'Login Page', message: 'We have just raised $1mil'},
        {sn: 10, page: 'OTP', message: 'We have just raised $1mil'},
        {sn: 11, page: 'Dashboard', message: 'We have just raised $1mil'},
        {sn: 12, page: 'Notification', message: 'We have just raised $1mil'},
       
    ]

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
                            <Sidebar activeItem="superAdminPanel"/>
                        </Col>
                        
                    }
                    <Col lg={10}> 
                    <div className="poppins">

                    
                        <div className="text-xl fw-semibold mb-2"> Notifications  </div>
                        
                        <div className="bg-white rounded border mb-8">
                            <div className="fw-semibold border-bottom p-4 d-flex vertical-align "> Set Notifications </div>
                            <div className="p-4">
                                <Row>
                                    <Col lg={5}>
                                        <div className=" mb-2 fw-semibold"> Select Page/Location to Display Notification* </div>
                                        <select className='w-100 border'>
                                            <option> 1 </option>
                                            <option> 2 </option>
                                        </select>
                                    </Col>
                                    <Col lg={1}> </Col>
                                    <Col lg={5}>
                                        <div className="mt-4 mb-2 fw-semibold"> Enter Notification Title* </div>
                                        <input className="w-100 border p-2" placeholder="Notification title"/>
                                    </Col>
                                    <Col lg={1}> </Col>
                                </Row>
                                <Row>
                                    <Col lg={11}>
                                        <div className="mt-4 mb-2 fw-semibold" > Type Message  </div>
                                        <input className="w-100 border p-2" placeholder="Type message"/>
                                    </Col>
                                    <Col lg={1}> </Col>
                                    
                                </Row>
                                <Row>
                                    <div className="d-flex">
                                        <div className="mt-4">
                                            <button className="btn btn-success mr-5"> Save </button>
                                            <button className="btn btn-danger"> Cancel </button>
                                        </div>
                                    </div>
                                    
                                </Row>
                            </div>

                        </div>

                        <div className="mt-5">
                            <SavedNotifTable notifs={notifications}/>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminNotification