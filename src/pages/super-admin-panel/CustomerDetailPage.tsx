import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import customersData from '../../data/customerDetail.json';
import NavBar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import CustomerDetailTransactionTable from '../../components/super-admin-panel/customer-detail-transaction-table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDollarSign, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
    sn: number,
    date: string,
    amount: number,
    purpose: string
}

interface Customer {
  sn: number;
  companyName: string;
  balance: number;
  dateCreated: string;
  lastLogin: string;
  currentPackage: string;
  fundOrDebit: string;
  customerID: string;
  firstName: string;
  lastName: string;
  companySub: string;
  email: string;
  phoneNumber: string;
  noOfEmployee: number;
  accountStatus: string;
  nextBilling: string;
  naira: number;
  usd: number;
  gbp: number;
  virtualAccountNo: string;
  transactionHistory: Transaction[]
}

interface RouteParams {
  customerID: string;
  [key: string]: string | undefined;
}

const CustomerDetailsPage: React.FC = () => {
  const { customerID } = useParams<RouteParams>();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPhoneMode, setIsPhoneMode] = useState(false);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  useEffect(() => {
    const fetchCustomerDetails = () => {
      const selectedCustomer = customersData.find(
        (customer) => customer.customerID === customerID
      );

      if (selectedCustomer) {
        setCustomer(selectedCustomer);
      } else {
        console.error(`Customer with ID ${customerID} not found.`);
      }

      const handleResize = (): void => {
        setIsPhoneMode(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    };

    fetchCustomerDetails();
  }, [customerID]);

  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  return (
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
                            <Row>
                                <Col lg={6}>
                                    <div className="text-xl fw-semibold border-bottom pb-3 mb-4"> {customer.companyName} </div>
                                    <div className='text-xl fw-semibold mb-4'> Profile Details </div>
                                        <div className='background-lightgrey p-4 rounded'>
                                            <Row className='mb-4'>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> First Name  </div>
                                                <div> {customer.firstName} </div>

                                                </Col>
                                                <Col lg={4}>  
                                                
                                                <div className='fw-semibold mb-4'> Last Name  </div>
                                                <div> {customer.lastName} </div>
                                                
                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Company Name </div>
                                                <div> {customer.companyName} </div>

                                                </Col>
                                            </Row>

                                            <Row >
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Customer ID  </div>
                                                <div> {customer.customerID} </div>

                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Company Sub  </div>
                                                <div> {customer.companySub} </div>
                                                
                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Date Created </div>
                                                <div> {customer.dateCreated} </div>

                                                </Col>
                                            </Row>
                                            
                                        </div>
                                        <div className='text-xl fw-semibold mb-4 mt-4'> Contact Information </div>
                                        <div className='background-lightgrey p-4 rounded'>
                                            <Row className='mb-4'>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Email  </div>
                                                <div> {customer.email} </div>

                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Phone Number  </div>
                                                <div> {customer.phoneNumber} </div>
                                                
                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> No. of Employee </div>
                                                <div> {customer.noOfEmployee} </div>

                                                </Col>
                                            </Row>

                                            <Row >
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Account Status  </div>
                                                <div className={`btn ${customer.accountStatus == 'Active' ? 'btn-success' : 'btn-danger'}`}> {customer.accountStatus} </div>

                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Subscription Type  </div>
                                                <div> {customer.currentPackage} </div>
                                                
                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Next Billing </div>
                                                <div> {customer.nextBilling} </div>

                                                </Col>
                                            </Row>
                                            
                                        </div>
                                        <div className='text-xl fw-semibold mb-4 mt-4'> Wallet & Balances </div>
                                        <div className='background-lightgrey p-4 rounded'>
                                            <Row className='mb-4'>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Naira  </div>
                                                <div> {customer.naira} </div>

                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> USD  </div>
                                                <div> {customer.usd} </div>
                                                
                                                </Col>
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> GBP </div>
                                                <div> {customer.gbp} </div>

                                                </Col>
                                            </Row>

                                            <Row >
                                                <Col lg={4}> 
                                                
                                                <div className='fw-semibold mb-4'> Virtual Account No.  </div>
                                                <div> {customer.virtualAccountNo} </div>

                                                </Col>
                                               
                                            </Row>
                                            
                                        </div>

                                        
                                    
                                </Col>
                                <Col lg={6}>
                            
                                    <div className="text-xl fw-semibold border-bottom pb-3 mb-4"> Transaction History </div>
                                    <div> <CustomerDetailTransactionTable transactions={customer.transactionHistory}/> </div>
                                </Col>
                            </Row>
                        </div>
                    
                
                        
                        
                       
                    </Col>
                </Row>
            </Container>
     
    </div>
  );
};

export default CustomerDetailsPage;
