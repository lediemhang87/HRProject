import {useEffect} from 'react'
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Toaster } from "react-hot-toast";
import Signin from './pages/signin-page/signin';

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className="relative z-0 bg-white">
    <Toaster />
   
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element={<Signin />}/>
          
      </Routes>
    </div>
  )
}

export default App
