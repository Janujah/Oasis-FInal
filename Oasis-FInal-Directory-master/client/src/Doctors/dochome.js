import React from 'react';
import backgroundImage from '../Doctors/young-handsome-physician-medical-robe-with-stethoscope.jpg'; 

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
      justifyContent: 'center',  
      alignItems: 'flex-start',  
      paddingLeft: '5%'  
    }}>
      <div>
        <h1 style={{ 
          fontSize: '80px',  
          color: '#110942',  
          marginTop: '100px'  
        }}><b>
          Welcome to Our world <br/><span style={{color:'#a58218'}}>Oasis</span>
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
