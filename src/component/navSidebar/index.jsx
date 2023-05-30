import React, { useEffect, useState } from 'react';
import { ReactComponent as NotificationLogo } from "../../svgs/notification-status.svg";
import { ReactComponent as MailLogo } from "../../svgs/message-notif.svg";
import { ReactComponent as NotLogo } from "../../svgs/notification.svg";
import { ReactComponent as ProfileLogo } from "../../svgs/profile.svg";
import { ReactComponent as JobCenter } from "../../svgs/receipt-edit.svg";
import { ReactComponent as LogoutLogo } from "../../svgs/logOut.svg";
import {app} from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import "./index.css";

function SideBar() {
  const [authToken, setAuthToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)
  const [userType, setUserType] = useState(null)
  // console.log("userType", userType)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthToken = localStorage.getItem('authToken');
    const fetchLoggedIn = localStorage.getItem('logedIn');
    const fetchUserType = localStorage.getItem('userType');
    if (fetchAuthToken || fetchLoggedIn || fetchUserType) {
      setAuthToken(fetchAuthToken);
      setLoggedIn(fetchLoggedIn);
      setUserType(fetchUserType);
    }
    else {
      navigate('/');
    }
  }, [])

  if (userType === null) {
    return <div>Loading...</div>;
  }
  else{
    return (
      <div className="sideMainCont">
        <div className="navItemsCont-top">
          { userType === "student"
          ?
            <NavLink
            to="/profileForm"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <ProfileLogo/>
            Profile
          </NavLink>
          :
          null
          }
          {
            userType === "student" || userType === "coordinator" || userType === "careerCenter"
            ?
            <NavLink
              to={
                userType === "student" 
                ? 
                "/internSelector"
                : 
                userType === "coordinator"
                ?
                "/coorDash"
                :
                "/careerdashboard"
              }
              className={({ isActive, isPending }) =>
                isPending ? "navbar-container" : isActive ? "navbar-container" : ""
              }
              // className="navbar-container"
            >
              <NotificationLogo/>
             { userType === "student" 
                ? 
                "Applications status"
                : 
                "Internships Records"
                }
            </NavLink>
            :
            null
          }
          {/* <NavLink
            to="/profileForm"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <MailLogo/>
            Mail
          </NavLink> */}
          <NavLink
            to="/jobOffers"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <JobCenter/>
            Internships Opportunities
          </NavLink>
          {/* <NavLink
            to="/profileForm"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <NotLogo/>
            Notification
          </NavLink> */}
          <NavLink
            to="/logOut"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <LogoutLogo/>
            Log out
          </NavLink>
        </div>
      </div>
    );

  }
}

export default SideBar;
