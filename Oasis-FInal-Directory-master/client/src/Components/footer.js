import React from 'react';
import '../CSS/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Contact Us: janujahsivarattinam@gmail.com</p>
                <p>Phone: +94 077 306 8569</p>
                <ul className="footer-links">
                    <li><a href="/ourservices">Our Services</a></li>
                    <li><a href="/doctors">Doctors</a></li>
                    <li><a href="/equipment">Ortho Resourses</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Oasis. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
