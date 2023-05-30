import React, { useState, useEffect } from 'react';
import './App.css';
import {app} from './firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import HeaderLogin from "../src/component/headerLogin";
import LoginPage from "../src/container/login";
// import WelcomePage from "../src/container/welcom";
import SideBar from '../src/component/navSidebar' 
import Header from '../src/component/header';
import UserSelector from '../src/container/userSelector'
import ProfileForm from "../src/container/profileForm";
import JobOffers from "../src/container/jobOffers";
import CoordinatorDashboard from "../src/container/coordinatorDashboard";
import AnnouncPage from "../src/container/announcmentPage";
import CoordinatorMessage from "../src/container/coordinatorMessage";
import Applicationstatus from "../src/container/applicationStatus";
import AdminPanel from "../src/container/adminPanel";
import InternSelector from "./container/internSelector";
import CareerDashboard from "./container/career-Dashboard";
import AdminDashboard from "../src/container/adminDashboard";
import ApplicationStart from '../src/container/applicationStart';
import InternshipDetailsContainer from "./container/coordInternDetCont";
import CareerInternDetailsContainer from "./container/careerinternDetCont";
import LoadingComp from './container/loadingComp';
import LogOut from './container/logOut';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const [logedIn, setLogedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userType, setUserType] = useState(null)
  
  useEffect(() => {
    const fetchAuthToken = localStorage.getItem('authToken');
    const fetchLoggedIn = localStorage.getItem('logedIn');
    // console.log("this is authToken", authToken )
    const getUserTypeById = async (userId) => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // console.log("User Type:", userData.type);
          localStorage.setItem('userType', userData.type);
          // localStorage.setItem('intern1', userData.intern1);
          // localStorage.setItem('intern2', userData.intern2);
          setUserType(userData.type)
          return userData.type; // Return the user type
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.log("Error retrieving user type:", error);
        return null;
      }
    };
    if (fetchAuthToken) {
      getUserTypeById(fetchAuthToken);
      setAuthToken(fetchAuthToken);
      // Authentication token exists in localStorage, do something with it
      setLogedIn(fetchLoggedIn)
      setLoading(false);
    } else {
      // Authentication token does not exist in localStorage
      setLogedIn(false)
    }
  }, [])


  if (!logedIn){
    return(
      <Router>
        <div className="wrapper_notLogged">
        <HeaderLogin/>
        <Routes>
          <Route path="/" element={<UserSelector />} />
          <Route path="/login/:userType" element={<LoginPage />} />
        </Routes>
        </div>
      </Router>
    )
  }else{
    if (loading || userType === null || authToken === null) {
      // Show a loading indicator while the check is in progress
      return (
        <div className="wrapper_Loading">
          <LoadingComp />
        </div>
      );
    }else{
      return (  
        <Router>
          <div className="wrapper_Logedin">
              <div className="headerWrapper">
                <Header/>
              </div>
            <div className="content">
              <div className="mainContent">
              <SideBar userType={userType} authToken={authToken}/>
              <Routes>
                {
                  <Route
                    path="/dashboard"
                    element={
                      userType === "admin" 
                      ? 
                      <AdminDashboard /> 
                      :
                      userType === "student"
                      ?
                      <ProfileForm />
                      : 
                      userType === "careerCenter"
                      ?
                      <CareerDashboard />
                      :
                      userType === "coordinator"
                      ?
                      <CoordinatorDashboard />
                      :
                      null
                    }
                  />
                }
                {/* <Route
                  path="/profile"
                  element={<ProfileForm />}
                /> */}
                <Route path="/jobOffers" element={<JobOffers />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/announcment" element={<AnnouncPage />} />
                <Route path="/coordinatorMessage" element={<CoordinatorMessage />} />
                <Route path="/applicationStatus" element={<Applicationstatus />} />
                <Route path="/adminPanel" element={<AdminPanel />} />
                <Route path="/internSelector" element={<InternSelector />} />
                <Route path="/jobOffers" element={<JobOffers/>} />
                <Route path="/profileForm" element={<ProfileForm />} />
                <Route path="/coorDash" element={<CoordinatorDashboard />} />
                <Route path="/careerdashboard" element={<CareerDashboard />} />
                <Route path="/internapply/:internType" element={<ApplicationStart />} />
                <Route path="/careerintern/:id/:internType" element={<CareerInternDetailsContainer />} />
                <Route path="/interndetails/:id/:internType" element={<InternshipDetailsContainer />} />
                <Route path="/" element={<UserSelector />} />
                <Route path="/login/:userType" element={<LoginPage />} />
                <Route path="/logout" element={<LogOut />} />
                {/* <Route path="/welcome" element={<WelcomePage />} /> */}
              </Routes>
              </div>
            </div>
          </div>
        </Router> 
      );
    }
  }
  
}

export default App;
