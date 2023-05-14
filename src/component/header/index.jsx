import profileImg from '../../img/profileImg.png'; // import your logo image file

import "./index.css";

function Header() {

  const fetchUserID = localStorage.getItem('userType');
  console.log(fetchUserID)
  return (
    <div className="headerMainCont">
     <div className="profileImgCont">
        <h3>{fetchUserID}</h3>
        <img src={profileImg} alt="Logo" className="profileImg" />
    </div>
    </div>
  );
}

export default Header;
