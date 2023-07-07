import {useEffect} from 'react'
import { Route, Routes } from "react-router-dom"
import Signin from './pages/signin-page/signin';
import Dashboard from './pages/dashboard-page/dashboard';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.css';


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

          
      </Routes>
    </div>
  )
}

export default App
