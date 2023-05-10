import { ReactComponent as NotificationLogo } from "../../svgs/notification-status.svg";
import { ReactComponent as MailLogo } from "../../svgs/message-notif.svg";
import { ReactComponent as NotLogo } from "../../svgs/notification.svg";
import { ReactComponent as profileLogo } from "../../svgs/profile.svg";
import { ReactComponent as homepageLogo } from "../../svgs/homepage.svg";
import { ReactComponent as logoutLogo } from "../../svgs/log out.svg";
import myImage from '../../img/logo.png';
import "./index.css";

function SideBar() {
  return (
    <div className="sideMainCont">
      <div className="logo">
      <img src={myImage} alt="My Image" className="my-image" />


      </div>
     <div className="navbar-container">
    <svg className="navbar-icon" />
    <homepageLogo/>
    <a href="/" className="navbar-link">Homepage</a>
    </div>
     <div className="navbar-container">
    <svg className="navbar-icon" />
    <homepageLogo/>
    <a href="/" className="navbar-link">Profile</a>
    </div>
     <div className="navbar-container">
    <svg className="navbar-icon" />
    <NotificationLogo/>
    <a href="/" className="navbar-link">Application status</a>
    </div>
     <div className="navbar-container">
    <svg className="navbar-icon" />
    <MailLogo/>
    <a href="/" className="navbar-link">Mail</a>
    </div>
     <div className="navbar-container">
    <svg className="navbar-icon" />
    
    <a href="/" className="navbar-link">Career center</a>
    </div>
     <div className="navbar-container">
    <svg className="navbar-icon" />
    <NotLogo/>
    <a href="/" className="navbar-link">Notification</a>
    </div>
    <div className="specail">
     <div className="navbar-container">
    <svg className="navbar-icon" />
    <logoutLogo/>
    <a href="/" className="navbar-link">Log out</a>
    </div>
    </div>
    </div>
  );
}

export default SideBar;
