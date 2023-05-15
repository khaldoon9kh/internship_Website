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
      <div className='loginFormBody'>
        <div className='formRightSide'>
          <form className='loginformCont' onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="errorPopup">
                <h4>
                  {errorMessage}
                </h4>
              </div>
            )}
            <div className="input-group">
              <label for="username">
                Email:
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
        <div className='LogInSeparator'>
        </div>
        <div className='formLeftSide'>
          <h1>
            To login to the system, you must use your OBS  email and password.
          </h1>
          <br></br>
          <h3>
            Your Automation Username: Your School Number <br/>
            Password: Your name’s first letter as capital, Your Turkish ID number and * sign. (A12345678901*)
          </h3>
        </div>
      </div>
    </div>
   
  );
}

export default LoginPage;
