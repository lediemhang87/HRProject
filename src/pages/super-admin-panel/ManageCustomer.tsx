import { useState, useEffect } from "react";
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import ManageCustomerAllCustomerTable from "../../components/super-admin-panel/manage-customers-all-customer-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDollarSign, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const SuperAdminManageCustomer: React.FC = () => {
    const customers = [
        {sn: 1, companyName: 'Gladpay Inc', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Essential', fundOrDebit: 'fund-or-debit'},
        {sn: 2, companyName: 'adazbio', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Perform', fundOrDebit: 'fund-or-debit'},
        {sn: 3, companyName: 'showsmani', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Perform', fundOrDebit: 'fund-or-debit'},
        {sn: 4, companyName: 'letzo', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Boost', fundOrDebit: 'fund-or-debit'},
        {sn: 5, companyName: 'seyinbez', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Perform', fundOrDebit: 'fund-or-debit'},
        {sn: 6, companyName: 'adazbio', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Perform', fundOrDebit: 'fund-or-debit'},
        {sn: 7, companyName: 'showsmani', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Perform', fundOrDebit: 'fund-or-debit'},
        {sn: 8, companyName: 'letzo', balance: 100000, dateCreated: '12/03/2020', lastLogin: '12/03/2020', currentPackage: 'Boost', fundOrDebit: 'fund-or-debit'}
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
            <Container fluid className="default-background-color poppins">
                <Row>
                    {(!isPhoneMode  || isSidebarOpen) &&
                        <Col lg={2} >
                            <Sidebar activeItem="manageCustomer"/>
                        </Col>
                        
                    }
                    <Col lg={10}> 
                        <div className="border bg-white p-4 rounded">
                            <div className="text-xl fw-semibold border-bottom p-2 mb-4"> All Customer </div>
                            <ManageCustomerAllCustomerTable customers={customers}/>
                        </div>
                        <div className="mt-8 "> 
                            <div className="d-flex justify-content-center mb-10 "> 
                                <div className=" background-darkblue vertical-align d-flex text-white w-25 height-80 mr-20 p-4 rounded">
                                    <div className="mr-auto text-left"> 400 <br/> Total No. Of Customers</div>
                                    <FontAwesomeIcon className='height-30'icon={faUsers}/>
                                </div>

                                <div className="background-green vertical-align d-flex text-white w-25 height-80 p-4 rounded">
                                    <div className="mr-auto text-left"> $5,000,345 <br/> Total Wallet Balance </div>
                                    
                                    <FontAwesomeIcon className='height-30' icon={faDollarSign}/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-danger vertical-align d-flex w-25 height-80 p-4">
                                    <div className="mr-auto text-left"> 350 <br/> Total Active </div>
                                    <FontAwesomeIcon className='height-30' icon={faThumbsUp}/>
                                </div>
                            </div>
                            
                        </div>
                       
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default SuperAdminManageCustomer