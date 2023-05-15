
import { ReactComponent as NotificationLogo } from "../../svgs/notification-status.svg";
import { ReactComponent as MailLogo } from "../../svgs/message-notif.svg";
import { ReactComponent as NotLogo } from "../../svgs/notification.svg";
import { ReactComponent as ProfileLogo } from "../../svgs/profile.svg";
import { ReactComponent as JobCenter } from "../../svgs/briefcase-1944.svg";
import { ReactComponent as LogoutLogo } from "../../svgs/logOut.svg";
import {app} from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import "./index.css";

function SideBar({userType, authToken}) {
  // const [userType, setUserType] = useState(userType)
  console.log("userType", userType)
  const navigate = useNavigate();
  function signOut() {
    getAuth.signOut().then(() => {
      // Sign-out successful.
      localStorage.removeItem('authToken');
      navigate('/');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  if (userType === null) {
    return <div>Loading...</div>;
  }
  else{
    return (
      <div className="sideMainCont">
        <div className="navItemsCont-top">
          <div className="navbar-container">
            <ProfileLogo/>
            <a href="/" className="navbar-link">Profile</a>
          </div>
          <div className="navbar-container">
            <NotificationLogo/>
            <a href="/" className="navbar-link">Application status</a>
          </div>
          <div className="navbar-container">
            <MailLogo/>
            <a href="/" className="navbar-link">Mail</a>
          </div>
          <div 
            className="navbar-container"
          >
            
            <p className="navbar-link">Career center</p>
          </div>
          <NavLink
            to="/jobOffers"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <JobCenter/>
            Career center
          </NavLink>
          <div className="navbar-container">
            <NotLogo/>
            <a href="/" className="navbar-link">Notification</a>
          </div>
        </div>
        <div className="navItemsCont-down">
          <div 
            className="navbar-container"
          >
            <LogoutLogo/>
            <a href="/" className="navbar-link">Log out</a>
          </div>
        </div>
      </div>
    );

  }
}

export default SideBar;
