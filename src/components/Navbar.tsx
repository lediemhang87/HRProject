import { useState } from 'react'
import Logo from '../assets/Navbar/ReactHQ logo.png'
import ProfilePic from '../assets/dashboard/employees/profileThree.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faGear, faBars, faMessage, faCheckCircle, faFlag, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
// import { faBell, faGear } from '@fortawesome/free-solid-svg-icons


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './styles.scss'
interface NavBarProps {
  isPhoneMode: boolean;
  toggleSidebar: () => void;
}

function NavBar({ isPhoneMode, toggleSidebar }: NavBarProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const notificationData = [
      {
          id: 1,
          type: "comment",
          message: `Your payment of $5,000,00 has been received.`,
          date: "20 minutes ago",
      },
      {
          id: 2,
          type: "completed",
          message: "Well done! You have completed your todo list for today!",
          date: "Yesterday",
      },
      {
          id: 3,
          type: "uncompleted",
          message: "Your task is overdue for 13 hours and 25 minutes",
          date: "08 February 2023"
      },
      {
          id: 4,
          type: "add",
          message: "Mr. Wike sent you your payday slip for the month of February",
          date: "10 February 2023"
      }
    ]
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = (): void => {
      setShowNotifications(!showNotifications);
    };



    return (
        <Navbar expand="lg" className='nav-bar poppins mb-4'>
          <Container fluid>
            <Navbar.Brand href="">
              <div className=' vertical-align'>
                {isPhoneMode && ( <FontAwesomeIcon className=" ml-2 border pt-2 pl-3 pr-3 pb-2 rounded cursor-pointer" icon={faBars} onClick={toggleSidebar} />)}
                
                <Link to='/dashboard'> <img className='height-50' src={Logo} alt="ReactHQLogo" /> </Link>
              </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            
            <Navbar.Collapse id="navbarScroll">

              <Form className='nav-bar-search' >
                
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="border rounded ml-16"
                    aria-label="Search"
                  />
          
              </Form>

              <Nav
                className="ms-auto align-items-center"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                
                <Nav.Link className='d-flex align-items-center' href="#">
                  <img className='height-50 mr-4' src={ProfilePic} alt="profilePic" /> 
                  <p> Babatunde Samuel </p>
                </Nav.Link>
                
                <Nav.Link href="/settings">
                  <FontAwesomeIcon className='text-orange' icon={faGear} />                
                </Nav.Link>

                <Nav.Link href="#notifications">
                  <FontAwesomeIcon className='text-orange background-lightorange p-3 rounded-circle' icon={faBell} onClick={toggleNotifications}/>
                </Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
          {showNotifications &&
          <div className={` notification-popup ${showNotifications ? '' : 'show'}`}>
            {notificationData.map((item, index) => (
              <div className='notification-popup-item pt-3 pb-3 border-bottom d-flex vertical-align ' key={index}> 
                <div className='p-3'> 
                  {item.type === 'comment' && <FontAwesomeIcon className="notification-icon text-primary" icon={faMessage} />}
                  {item.type === 'completed' && <FontAwesomeIcon className="notification-icon text-success " icon={faCheckCircle} />}
                  {item.type === 'uncompleted' && <FontAwesomeIcon className="notification-icon text-danger" icon={faFlag} />}
                  {item.type === 'add' && <FontAwesomeIcon className="notification-icon text-warning" icon={faCirclePlus} />}
                  </div>
                <div >
                  <div> {item.message}  </div>
                  <div className='text-secondary text-xs'> {item.date} </div>
                </div>
              </div>
            ))}
            
          </div>}
      
        </Navbar>
      );
}

export default NavBar