import React, { useState, useEffect } from 'react';
import './App.css';
import HeaderLogin from "../src/component/headerLogin";
import LoginPage from "../src/container/login";
import WelcomePage from "../src/container/welcom";
import SideBar from '../src/component/navSidebar' 
import Header from '../src/component/header';
import UserSelector from '../src/container/userSelector'
import ProfileForm from "../src/container/profileForm";
import CoordinatorDashboard from "../src/container/coordinatorDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  // const [loading, setLoading] = useState(true);
  const [logedIn, setLogedIn] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log("this is authToken", authToken )
    if (authToken) {
      // Authentication token exists in localStorage, do something with it
      setLogedIn(true)
    } else {
      // Authentication token does not exist in localStorage
      setLogedIn(false)
    }
    // setLoading(false);
  }, [])


  // if (loading) {
  //   // Show a loading indicator while the check is in progress
  //   return <div>Loading...</div>;
  // }

  if (logedIn) {
    return (  
      <Router>
        <div className="wrapper">
          <div className="sidebar">
            <SideBar/>
          </div>
          <div className="content">
            <Header/>
            <Routes>
              <Route
                path="/profile"
                element={<ProfileForm />}
              />
              {/* <Route path="/login/:userType" element={<LoginPage />} /> */}
              {/* <Route path="/welcome" element={<WelcomePage />} /> */}
            </Routes>
          </div>
        </div>
      </Router> 
    );
  } else {
    return(
      <Router>
        <HeaderLogin/>
        <Routes>
          <Route path="/" element={<UserSelector />} />
          <Route path="/login/:userType" element={<LoginPage />} />
        </Routes>
      </Router>
    )
    // Authentication token does not exist in localStorage
  }
  
}

export default App;
