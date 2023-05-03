import uniLogo from '../../img/uni_logo.png'; // import your logo image file
import "./index.css";

function HeaderLogin() {
  return (
    <div className="headerLogin">
      <img src={uniLogo} alt="Logo" className="uniLogo" />
      <div>
        <h2> Üsküdar Üniversitesi </h2>
        <h3>Internship Information System</h3>
      </div>
    </div>
  );
}

export default HeaderLogin;
