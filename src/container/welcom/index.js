import React from 'react';

function WelcomePage() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        console.log(authToken)
        // Authentication token exists in localStorage, do something with it
      } else {
        // Authentication token does not exist in localStorage
      }
  return (
    <div>
      <h1>Welcome!</h1>
      <p>You are now logged in.</p>
    </div>
  );
}

export default WelcomePage;
