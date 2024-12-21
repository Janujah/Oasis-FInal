import React from 'react';
import ContactForm from '../Components/contactUs';
import Navbar from '../Components/technav';
// import Footer from '../Components/footer'

function ContactPage() {
    return (
        <div>
            <Navbar /><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <h1 style={{ textAlign: 'center', fontWeight: '800', color: '#0e0737', fontSize: '80px' }}>Contact Us</h1>
            <ContactForm />
            {/* <Footer/> */}
        </div>
    );
}

export default ContactPage;