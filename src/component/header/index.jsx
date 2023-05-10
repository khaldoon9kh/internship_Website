import profileImg from '../../img/profileImg.png'; // import your logo image file

import "./index.css";

function Header() {
  return (
    <div className="headerMainCont">
     <div className="profileImgCont">
        <img src={profileImg} alt="Logo" className="profileImg" />
    </div>
    </div>
  );
}

export default Header;
