import { useState } from 'react'
import Logo from '../assets/Navbar/ReactHQ logo.png'
import ProfilePic from '../assets/dashboard/employees/profileThree.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faGear, faBars } from '@fortawesome/free-solid-svg-icons'

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

    const toggleDropdown = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <Navbar expand="lg" className='nav-bar'>
          <Container fluid>

            <Navbar.Brand href="#">
              <div className='brand'>
                {isPhoneMode && ( <FontAwesomeIcon className="icon" icon={faBars} onClick={toggleSidebar} />)}
                
                <img className='logo' src={Logo} alt="ReactHQLogo" />
              </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            
            <Navbar.Collapse id="navbarScroll">

              <Form className='nav-bar-search' >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="input me-2 "
                  aria-label="Search"
                />
              </Form>

              <Nav
                className="profile ms-auto align-items-center"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                
                <Nav.Link className='d-flex align-items-center' href="#action1">
                  <img className='profilePic' src={ProfilePic} alt="profilePic" /> 
                  <p> Babatunde Samuel </p>
                </Nav.Link>
                
                <Nav.Link href="#action2">
                  <FontAwesomeIcon className='icon' icon={faGear} />                
                </Nav.Link>

                <Nav.Link href="#action3">
                  <FontAwesomeIcon className='icon white' icon={faBell}/>
                </Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavBar