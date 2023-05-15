
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
          <NavLink
            to="/profileForm"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <NotificationLogo/>
            Application status
          </NavLink>
          <NavLink
            to="/profileForm"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <MailLogo/>
            Mail
          </NavLink>
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
          <NavLink
            to="/profileForm"
            className={({ isActive, isPending }) =>
              isPending ? "navbar-container" : isActive ? "navbar-container" : ""
            }
            // className="navbar-container"
          >
            <NotLogo/>
            Notification
          </NavLink>
          <NavLink
            to="/profileForm"
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
