import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loginpic from './loginimg.jpeg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAt3kfWkLusGRXSCV79-TlLI4jR6Yd8zKY",
  authDomain: "pixelpalette-15071565.firebaseapp.com",
  projectId: "pixelpalette-15071565",
  storageBucket: "pixelpalette-15071565.appspot.com",
  messagingSenderId: "367454578156",
  appId: "1:367454578156:web:84b93f8f33f2c305ed8cc9",
  measurementId: "G-HD66J80HNY"
};

const app = initializeApp(firebaseConfig);

function FirebaseAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      localStorage.setItem('pixelpalette', user.email)

    } catch (error) {
      console.log(error)
      handleError(error);
    }
  };

  const handleError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        setError('Invalid Email');
        break;
        case 'auth/missing-password':
        setError('Please fill in your Password');
        break;
        case 'auth/invalid-login-credentials':
          setError('Incorrect password or email. Please try again.');
          break;
      case 'auth/too-many-requests':
        setError(' Please try again at a later time');
          break;
        
      case 'auth/wrong-password':
        setError('Incorrect password or email. Please try again.');
        break;
        case 'auth/network-request-failed':
        setError('Offline');
        break;

      default:
        
    }
  };
  return (
    <div>
     
     
      {user ? (
        <div className='welcome'>
          <p>Welcome, {user.email}!</p>
         <Link to='/gallery'> <button >Proceed to Dashboard</button></Link>
        </div>
      ) : (

        <div className='login'>
          <img src={Loginpic} className='loginpic'/>
                    <div className='contactform'> 
                    <h1>Login to <span>PixelPalette</span></h1>
                    {error && <p className="error">{error}</p>}
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <div className='btn'>
          <Link to="/signup"><button>Sign Up</button></Link>  
          <button onClick={handleSignIn}>Sign In</button>
          </div>
          </div>
         
        </div>
      )}
    </div>
  );
}

export default FirebaseAuth;
