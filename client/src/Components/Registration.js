import React, { useState } from 'react';
import styles from '../CSS/SignUpPage.module.css';
import logo from '../Components/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



function SignUpPage() {
  const [userName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Role, setUserRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const validateForm = () => {
    let currentErrors = {};
    let formIsValid = true;

    if (!userName.trim()) {
      currentErrors.userName = "Full name is required.";
      formIsValid = false;
    }

    if (!email) {
      currentErrors.email = "Email is required.";
      formIsValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      currentErrors.email = "Email is invalid.";
      formIsValid = false;
    }

    if (!Role) {
      currentErrors.Role = "Role selection is required.";
      formIsValid = false;
    }

    if (password.length < 8) {
      currentErrors.password = "Password must be at least 8 characters long.";
      formIsValid = false;
    }

    if (password !== confirmPassword) {
      currentErrors.confirmPassword = "Passwords do not match.";
      formIsValid = false;
    }

    setErrors(currentErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const userData = {
        userName,
        email,
        Role, 
        password,
        confirmPassword
      };

      fetch('http://localhost:3001/SignUp/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Redirect based on Role
        switch (Role) {
            case 'consumers':
                navigate('/');
                break;
            case 'Doctor':
                navigate('/Doctors');
                break;
            case 'Ortho_technician':
                navigate('/Technicians');
                break;
            // default:
            //     navigate('/');
            //     break;
        }
    })
       .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <img src={logo} alt="Company Logo" className={styles.logo} />
        </div>
        <h3 className={styles.heading}>Sign Up</h3>
        <p style={{ fontSize: '21px' }}>Create your account, it's free and only takes a minute.</p>
        
        <div className={styles.inputGroup}>
          <label htmlFor='fullName'>Full Name</label>
          <input
            type='text'
            id='fullName'
            placeholder='Enter your full name'
            value={userName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.userName && <div className={styles.error}>{errors.userName}</div>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='userRole'>You're here as a</label>
          <select
            id='userRole'
            value={Role}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="">--Please choose an option--</option>
            <option value="consumers">Consumers</option>
            <option value="Doctor">Doctor</option>
            <option value="Ortho_technician">Ortho Technician</option>
          </select>
          {errors.Role && <div className={styles.error}>{errors.Role}</div>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='password'>Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='Create a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeButton}
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.eyeButton}
            >
              {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>

          </div>
          {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
        </div>

        <button className={styles.signUpButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;

