import React from 'react';
import backgroundImage from '../Technicians/wp10189408-orthopedic-wallpapers.jpg'; 
import Nav from '../Components/technav'

function LandingPage() {
  return (
    <div className="docbackground" style={{ 
      backgroundImage: `url(${backgroundImage})`,
      height: '100vh',  
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',  
      flexDirection: 'column',  
      // justifyContent: 'center',  
      alignItems: 'flex-start',  
      // paddingLeft: '5%'  
    }}>
      <Nav/>
      <div>
        <h1 style={{ 
          fontSize: '80px',  
          color: 'white',  
          marginTop: '250px',
          marginLeft:'40px'  
        }}><b>
          Welcome to <br></br>Our world<br/><span style={{color:'white'}}>Oasis</span>
          </b></h1>
        <p style={{
          fontSize: '24px',  
          color: 'black'  
        }}></p>
      </div>
    </div>
  );
}

export default LandingPage;
