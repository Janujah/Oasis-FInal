// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../CSS/login.module.css';
// import logo from '../Components/logo.png';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userdata = { email, password };
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('https://oasis-final-directory.onrtender.com/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password })
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`${response.status}: ${errorMessage}`);
//       }

//       const data = await response.json();
//       localStorage.setItem('auth-token', data.token); // Store the received token in local storage
//       setLoading(false);
//       navigateRoleBased(data.Role); // Assuming 'Role' is a property of the returned JSON
//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//       console.error('Login error:', err.message);
//     }
//   };

//   const navigateRoleBased = (Role) => {
//     switch (Role) {
//       case 'Doctor':
//         navigate('/Doctors');
//         break;
//       case 'Ortho_technician':
//         navigate('/Technicians');
//         break;
//       case 'consumers':
//         navigate('/');
//         break;
//       case 'Admin':
//         navigate('/Admin/users');
//         break;
//       default:
//         setError('Unauthorized role or unknown role.');
//         break;
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <img src={logo} alt="Company Logo" className={styles.logo} />
//         <h3 className={styles.heading}>Login</h3>
//         <p className={styles.welcomeBack}>Welcome back! Please login to your account.</p>

//         {error && <div className={styles.error}>{error}</div>}

//         <div className={styles.inputGroup}>
//           <label htmlFor='email'>Email</label>
//           <input
//             type='email'
//             id='email'
//             placeholder='Enter your Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor='password'>Password</label>
//           <input
//             type='password'
//             id='password'
//             placeholder='Enter your Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button className={styles.loginButton} type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         <div className={styles.registerLink}>
//           If you don't have an account <a href='/signup' style={{ color: '#0e0737', textDecoration: 'none' }}>Sign up</a>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/login.module.css';
import logo from '../Components/logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userdata = { email, password };
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://oasis-final-directory.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      localStorage.setItem('auth-token', data.token); // Store the received token in local storage
      setLoading(false);
      navigateRoleBased(data.Role); // Assuming 'Role' is a property of the returned JSON
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error('Login error:', err.message);
    }
  };

  const navigateRoleBased = (Role) => {
    switch (Role) {
      case 'Doctor':
        navigate('/Doctors');
        break;
      case 'Ortho_technician':
        navigate('/Technicians');
        break;
      case 'consumers':
        navigate('/');
        break;
      case 'Admin':
        navigate('/Admin/users');
        break;
      default:
        setError('Unauthorized role or unknown role.');
        break;
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <h3 className={styles.heading}>Login</h3>
        <p className={styles.welcomeBack}>Welcome back! Please login to your account.</p>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* <div className={styles.forgotPassword}>
          <a href='/forgot-password'>Forgot password?</a>
        </div> */}
        <button className={styles.loginButton} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className={styles.registerLink}>
          If you don't have an account <a href='/signup' style={{ color: '#0e0737', textDecoration: 'none' }}>Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;