import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col, Button } from "react-bootstrap";
import SavedNotifTable from "../../components/notifications/saved-notif-table";
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
        <div>
            <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar}/>
            <Container fluid className="default-background-color"> 
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="superAdminPanel"/>
                        </Col>
                        
                    }
                    <Col lg={10}> 
                    <div className="poppins">

                    
                        <div className="font-size-20 font-weight-600 margin-bottom-20"> Notifications  </div>
                        
                        <div className="border background-white">
                            <div className="border-bottom font-size-18 font-weight-600"> Set Notifications </div>
                            <div>
                                <Row>
                                    <Col lg={5}>
                                        <div className="margin-top-20 margin-bottom-10 font-weight-500"> Select Page/Location to Display Notification* </div>
                                        <select className='width-100 border'>
                                            <option> 1 </option>
                                            <option> 2 </option>
                                        </select>
                                    </Col>
                                    <Col lg={1}> </Col>
                                    <Col lg={5}>
                                        <div className="margin-top-20 margin-bottom-10 font-weight-500"> Enter Notification Title* </div>
                                        <select className='width-100 border'> 
                                            <option> 1 </option>
                                            <option> 2 </option>
                                        </select>
                                    </Col>
                                    <Col lg={1}> </Col>
                                </Row>
                                <Row>
                                    <Col lg={11}>
                                        <div className="margin-top-20 margin-bottom-10 font-weight-500" > Type Message  </div>
                                        <input className="border width-100" placeholder="Type message"/>
                                    </Col>
                                    <Col lg={1}> </Col>
                                    
                                </Row>
                                <Row>
                                    <div className="d-flex text-align-center">
                                        <div className="margin-top-20">
                                            <button className="green-button button"> Save </button>
                                            <button className="red-button button"> Cancel </button>
                                        </div>
                                    </div>
                                    
                                </Row>
                            </div>

                        </div>

                        <div className="margin-top-50">
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