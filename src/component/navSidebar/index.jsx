import { ReactComponent as NotificationLogo } from "../../svgs/notification-status.svg";
import { ReactComponent as MailLogo } from "../../svgs/message-notif.svg";
import { ReactComponent as NotLogo } from "../../svgs/notification.svg";
import { ReactComponent as ProfileLogo } from "../../svgs/profile.svg";
import { ReactComponent as JobCenter } from "../../svgs/briefcase-1944.svg";
import { ReactComponent as LogoutLogo } from "../../svgs/logOut.svg";
import uniLogo from '../../img/uni_logo.png';
import "./index.css";

function SideBar() {
  return (
    <div className="sideMainCont">
      <div className="logo">
        <img src={uniLogo} alt="My Image" className="my-image" />
      </div>

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
     <div className="navbar-container">
    <JobCenter/>
    <a href="/" className="navbar-link">Career center</a>
    </div>
     <div className="navbar-container">
    <NotLogo/>
    <a href="/" className="navbar-link">Notification</a>
    </div>
    <div className="specail">
     <div className="navbar-container">
    <LogoutLogo/>
    <a href="/" className="navbar-link">Log out</a>
    </div>
    </div>
    </div>
  );
}

export default SideBar;
