import profileImg from '../../img/profileImg.png'; // import your logo image file
import uniLogo from '../../img/uni_logo.png';
import "./index.css";

function Header() {

  const fetchUserID = localStorage.getItem('userType');
  // console.log(fetchUserID)
  return (
    <div className="headerMainCont">
      <div className="logoCont">
          <img src={uniLogo} alt="Logo" className="logo-image" />
          <div className="logoHeader">
            <h3>Uskudar University</h3>
            <h4>Internship Information System</h4>
          </div>
        </div>
     <div className="profileImgCont">
        <h3>{fetchUserID}</h3>
        <img src={profileImg} alt="Logo" className="profileImg" />
    </div>
    </div>
  );
}

export default Header;
