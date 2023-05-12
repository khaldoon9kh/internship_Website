import React, { useState } from 'react';
import { ReactComponent as Logo } from "../../svgs/logo.svg";
import { ReactComponent as LoginImg } from "../../svgs/loginPic.svg";
import "./index.css";
import {app} from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useParams } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { userType } = useParams();
  const navigate = useNavigate();
  console.log(userType)

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(username,password)
    // Handle login logic here
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const userID = userCredential.user.uid;
        console.log(userID)
        localStorage.setItem('authToken', userID);
        navigate('/dashboard');
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        setErrorMessage("Your email or password are incorrect"); // Update error message state
      });
  }


  return (
    <div className='mainConainer'>
      <div className='formBody'>
        <div className='formside'>
          <div className='formHeader'>
            <h3>
              Sign In
            </h3>
            {errorMessage && (
            <div className="errorPopup">
              <h4>
                {errorMessage}
              </h4>
            </div>
          )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label for="username">
                Student Email:
              </label>
                <input 
                  id='username' 
                  type="text" 
                  value={username} 
                  placeholder='user@st.uskudar.edu.tr'
                  onChange={handleUsernameChange} 
                />
            </div>
            <div className="input-group">
              <label for="password">
                Password:
              </label>
                <input 
                  type="password" 
                  placeholder='Use your OBS password'
                  value={password} 
                  onChange={handlePasswordChange} 
                />
            </div>
            <div className="input-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className='picSide'>
          <LoginImg/>
        </div>
      </div>
    </div>
   
  );
}

export default LoginPage;
