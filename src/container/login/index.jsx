import React, { useState } from 'react';
import { ReactComponent as Logo } from "../../svgs/logo.svg";
import { ReactComponent as LoginImg } from "../../svgs/loginPic.svg";
import "./index.css";
import {app} from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username,password)
    // Handle login logic here
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }


  return (
    <div className='mainConainer'>
      <div className='formBody'>
        <div className='formside'>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label for="username">
                Student Number:
              </label>
                <input id='username' type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="input-group">
              <label for="password">
                Password:
              </label>
                <input type="password" value={password} onChange={handlePasswordChange} />
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
