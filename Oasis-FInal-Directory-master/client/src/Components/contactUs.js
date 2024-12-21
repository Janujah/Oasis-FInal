import React, { useState } from 'react';
import '../CSS/contactUs.css'

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [result, setResult] = React.useState("");


  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3a5acfc4-8c08-43ee-8ac7-0e2c015c58b9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));    
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent!');
    };

    return (
        <form onSubmit={onSubmit} className='form'>
            <div>
                <img src="https://i0.wp.com/practis.com/wp-content/uploads/2022/12/shutterstock_1753066349.jpeg?fit=1000%2C667&ssl=1" style={{height:'350px', marginTop:'105px'}}></img>
            </div>
            <div style={{marginTop:'96px'}}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="message" >Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{height:'100px'}}
                    required
                />
            </div>
            <button type="submit" className='button'>Send</button>
            </div>
            <span>{result}</span>
        </form>
    );
}

export default ContactForm;
