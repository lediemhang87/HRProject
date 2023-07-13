import {useEffect} from 'react'
import { Route, Routes } from "react-router-dom"
import Signin from './pages/signin-page/signin';
import Dashboard from './pages/dashboard-page/dashboard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.scss'
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.css';
import SuperAdminNotification from './pages/super-admin-panel/Notification';
import SuperAdminManageCustomer from './pages/super-admin-panel/ManageCustomer';
import SuperAdminAccountManagers from './pages/super-admin-panel/AccountManagers';
import SuperAdminAccountManagerRoles from './pages/super-admin-panel/AccountManagerRoles';
import SuperAdminSetWebsitePricing from './pages/super-admin-panel/SetWebsitePricing';
import SuperAdminSetPaymentGateway from './pages/super-admin-panel/SetPaymentGateway';

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className="relative z-0 bg-white">
    <Toaster />
   
      <Routes>
          <Route path="/" element={<Signin />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/superadminpanel/notification" element={<SuperAdminNotification/>} />
          <Route path="/superadminpanel/manage-customer" element={<SuperAdminManageCustomer/>} />
          <Route path="/superadminpanel/account-manager" element={<SuperAdminAccountManagers/>} />
          <Route path="/superadminpanel/account-manage-roles" element={<SuperAdminAccountManagerRoles/>} />
          <Route path="/superadminpanel/website-pricing" element={<SuperAdminSetWebsitePricing/>} />
          <Route path="/superadminpanel/payment-gateway" element={<SuperAdminSetPaymentGateway/>} />
          
      </Routes>
    </div>
  )
}

export default App
