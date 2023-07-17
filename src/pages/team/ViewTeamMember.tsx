import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TeamsViewTeamMember from '../../components/teams/teams-viewTeamMembers';

const ViewTeamMember: React.FC = () => {

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


  return (
    <div className="default-background-color">
      <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar} />
      <Container fluid>
        <Row>
          {(!isPhoneMode || isSidebarOpen) && (
            <Col lg={2}>
              <Sidebar activeItem="viewTeamMember" />
            </Col>
          )}
          <Col lg={10}>
           <TeamsViewTeamMember/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewTeamMember;
