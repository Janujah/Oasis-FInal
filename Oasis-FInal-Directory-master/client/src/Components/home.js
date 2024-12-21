import React from 'react';
import backgroundImage from './pexels-tima-miroshnichenko-5452196.jpg'; 

function LandingPage() {
  return (
    <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="white-overlay">
        <div className="content">
          <h1>Welcome to Our world<span style={{color:'#AB9551',fontSize:'80px' }}> Oasis</span></h1>
          <p>Explore and discover our services.</p>
        </div>

      </div>
      {/* <Footer/> */}

      
    </div>
  );
}

export default LandingPage;

