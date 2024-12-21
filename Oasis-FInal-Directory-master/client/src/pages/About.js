// src/App.js
import React from 'react';
import ProfileCard from '../Components/ProfileCard';
// import image2 from '../Img/pexels-thirdman-5327656-removebg-preview.png';
// import image1 from '../Img/1711468277929-removebg-preview.png'
// import Nav from '../Components/navbar'
import Navbar from '../Components/navbar';
import Footer from '../Components/footer' 



function App() {
    return (
      <div>
        <Navbar/>
        <div><h1 style={{fontSize:'90px', textAlign:'center'}}className='ourservices'><b>Our Services</b></h1></div><br></br>
        <div style={{paddingLeft:'200px',paddingRight:'210px'}}><p style={{fontSize:'25px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Oasis, where we offer a comprehensive range of medical services tailored to meet your healthcare needs. From general medical consultations and specialist referrals to preventive health screenings and chronic disease management, our platform connects you with experienced healthcare professionals ready to provide personalized care. <br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Whether you're preparing for surgery, seeking mental health support, or need pediatric care for your children, our team is here to ensure you receive quality care conveniently through our advanced telemedicine options. Join us today to experience healthcare that prioritizes your well-being and empowers you to take control of your health journey.</p></div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href='/our-services/doctors' style={{ textDecoration:'none' }}> <ProfileCard
               specialty="Doctors"
               imageUrl= "https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png"
               /></a>
           <a href='/our-services/equipments' style={{ textDecoration:'none' }}> <ProfileCard 
                specialty="Ortho Resourses"
                imageUrl="https://media.licdn.com/dms/image/sync/D4D27AQHvkaRUOQr_BQ/articleshare-shrink_800/0/1711468277929?e=2147483647&v=beta&t=ZK3Q7sobdUcYNOuV6adPZjKfMIlqJ_V5Bp9QAn3qf8c"
                /></a>
        </div>
        {/* <Footer/> */}
        </div>
    );
}

export default App;

