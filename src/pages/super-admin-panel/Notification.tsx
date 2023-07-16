import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SavedNotifTable from '../../components/super-admin-panel/saved-notif-table';

interface Notification {
  sn: number;
  page: string;
  title: string;
  message: string;
}

const SuperAdminNotification: React.FC = () => {
  const initialNotification: Notification[] = [
    { sn: 1, page: 'Landing Page Header', title: 'Landing Page notification', message: 'We have just raised $1mil' },
    { sn: 2, page: 'HR Center Dasboard Admin', title: 'HR Dashboard notification', message: 'We have just raised $1mil' },
    { sn: 3, page: 'Login Page', title: 'Login Page notification', message: 'We have just raised $1mil' },
    { sn: 4, page: 'OTP', title: 'OTP Notificaion', message: 'We have just raised $1mil' },
    { sn: 5, page: 'Dashboard', title: 'Dashboard notification', message: 'We have just raised $1mil' },
    { sn: 6, page: 'Notification', title: 'Notifcation', message: 'We have just raised $1mil' },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [page, setPage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>(initialNotification);
  const [editableSn, setEditableSn] = useState<number | null>(null);
  const [editedNotif, setEditedNotif] = useState<Partial<Notification>>({});

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

  const handleSaveNotification = (): void => {
    if (!page || !notificationTitle || !message) {
      alert('Please fill in all the required fields.');
      return;
    }

    const newNotification: Notification = {
      sn: notifications.length + 1,
      page,
      title: notificationTitle,
      message,
    };

    setNotifications([...notifications, newNotification]);
    setPage('');
    setNotificationTitle('');
    setMessage('');
  };

  const handleEditNotification = (sn: number, updatedNotif: Partial<Notification>): void => {
    const updatedNotifications = notifications.map((notif) => (notif.sn === sn ? { ...notif, ...updatedNotif } : notif));
    setNotifications(updatedNotifications);
    setEditableSn(null);
    setEditedNotif({});
  };

  const handleDeleteNotification = (sn: number): void => {
    const updatedNotifications = notifications.filter((notif) => notif.sn !== sn);
    setNotifications(updatedNotifications);
    setEditableSn(null);
    setEditedNotif({});
  };

  return (
    <div className="default-background-color">
      <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar} />
      <Container fluid>
        <Row>
          {(!isPhoneMode || isSidebarOpen) && (
            <Col lg={2}>
              <Sidebar activeItem="superAdminPanel" />
            </Col>
          )}
          <Col lg={10}>
            <div className="poppins">
              <div className="text-xl fw-semibold mb-2">Notifications</div>

              <div className="bg-white rounded border mb-8">
                <div className="fw-semibold border-bottom p-4 d-flex vertical-align">Set Notifications</div>
                <div className="p-4">
                  <Row>
                    <Col lg={5}>
                      <div className="mb-2 fw-semibold">Select Page/Location to Display Notification*</div>
                      <select
                        className="w-100 border"
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Landing Page Header">Landing Page Header</option>
                        <option value="HR Center Dasboard Admin">HR Center Dashboard Admin</option>
                        <option value="Login Page">Login Page</option>
                        <option value="OTP">OTP</option>
                        <option value="Dashboard">Dashboard</option>
                        <option value="Notification">Notification</option>
                      </select>
                    </Col>
                    <Col lg={1}></Col>
                    <Col lg={5}>
                      <div>
                        <div className="mb-2 fw-semibold">Enter Notification Title*</div>
                        <input
                          className="w-100 border p-2"
                          placeholder="Notification title"
                          value={notificationTitle}
                          onChange={(e) => setNotificationTitle(e.target.value)}
                          required
                        />
                      </div>
                    </Col>
                    <Col lg={1}></Col>
                  </Row>
                  <Row>
                    <Col lg={11}>
                      <div className="mt-4 mb-2 fw-semibold">Type Message*</div>
                      <input
                        className="w-100 border p-2"
                        placeholder="Type message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </Col>
                    <Col lg={1}></Col>
                  </Row>
                  <Row>
                    <div className="d-flex">
                      <div className="mt-4">
                        <button className="btn btn-success mr-5" onClick={handleSaveNotification}>
                          Save
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setPage('');
                            setNotificationTitle('');
                            setMessage('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>

              <div className="mt-5">
                <SavedNotifTable
                  notifs={notifications}
                  onEdit={handleEditNotification}
                  onDelete={handleDeleteNotification}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SuperAdminNotification;
