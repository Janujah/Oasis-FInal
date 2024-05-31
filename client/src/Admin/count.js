import React, { useEffect, useState } from 'react';
import Navbar from '../Components/nav-admin';
// import './AdminDashboard.css'; 

function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    doctors: 0,
    technicians: 0,
    consumers: 0,
    payments: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://oasis-final-directory.onrender.com/count/users'),
          fetch('http://oasis-final-directory.onrender.com/count/doctors'),
          fetch('http://oasis-final-directory.onrender.com/count/technicians'),
          fetch('http://oasis-final-directory.onrender.com/count/consumers'),
          fetch('http://oasis-final-directory.onrender.com/count/payments'),
        ]);

        // Check for non-OK responses
        for (const response of responses) {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }

        // Parse JSON bodies
        const data = await Promise.all(responses.map(res => res.json()));

        setCounts({
          users: data[0].count,
          doctors: data[1].count,
          technicians: data[2].count,
          consumers: data[3].count,
          payments: data[4].count,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="counts-container">
        <div className="count-card">
          <p style={{fontSize:'30px', color:'white'}}>{counts.users}</p>
          <h3 style={{fontSize:'30px', color:'white'}}>Users</h3>
        </div>
        <div className="count-card">
          <p style={{fontSize:'30px', color:'white'}}>{counts.doctors}</p>
          <h3 style={{fontSize:'30px', color:'white'}}>Doctors</h3>
        </div>
        <div className="count-card">
          <p style={{fontSize:'30px', color:'white'}}>{counts.technicians}</p>
          <h3 style={{fontSize:'30px', color:'white'}}>Ortho Resources</h3>
        </div>
        <div className="count-card">
          <p style={{fontSize:'30px', color:'white'}}>{counts.consumers}</p>
          <h3 style={{fontSize:'30px', color:'white'}}>Consumers</h3>
        </div>
        <div className="count-card">
          <p style={{fontSize:'30px', color:'white'}}>{counts.payments}</p>
          <h3 style={{fontSize:'30px', color:'white'}}>Payments</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
