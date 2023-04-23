import React, { useState } from 'react';
import { ReactComponent as Logo } from "../../svgs/logo.svg";
import { ReactComponent as LoginImg } from "../../svgs/loginPic.svg";
import "./index.css";

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
    // Handle login logic here
  }

  return (
    <div className='mainConainer'>
      <div className='formBody'>
        <div className='formside'>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type="submit">Login</button>
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
