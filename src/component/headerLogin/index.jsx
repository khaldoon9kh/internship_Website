import uniLogo from '../../img/uni_logo.png'; // import your logo image file
import "./index.css";

function HeaderLogin() {
  return (
    <div className="headerLogin">
      <img src={uniLogo} alt="Logo" className="uniLogo" />
      <h2> IMS </h2>
    </div>
  );
}

export default HeaderLogin;
