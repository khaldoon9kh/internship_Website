import './App.css';
import HeaderLogin from "../src/component/headerLogin";
import LoginPage from "../src/container/login";
import WelcomePage from "../src/container/welcom";
import SideBar from '../src/component/navSidebar' 
import Header from '../src/component/header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    // <Router>
    //   <HeaderLogin/>
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/welcome" element={<WelcomePage />} />
    //   </Routes>
    // </Router>
    <Router>
      <div className="wrapper">
        <div className="sidebar">
          <SideBar/>
        </div>
        <div className="content">
          <Header/>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            {/* <Route path="/welcome" element={<WelcomePage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
      
  );
}

export default App;
