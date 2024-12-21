import React from 'react';
import Navbar from '../Components/navbar'
import Home from '../Components/home'
import About from './About'
import ContactUs from './contactus'
import Footer from '../Components/footer' 
import '../CSS/home.css'


function landingpage() {
  return (
    <div>
      <Navbar/>
     
      {/* <Home id='home'/><br/> */}
      <Home id='home'></Home>
      <About id='about'/>
      <ContactUs id='cu'/>
      {/* <Footer/> */}
    </div>
  )
}

export default landingpage;
