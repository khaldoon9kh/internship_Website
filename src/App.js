import './App.css';
import HeaderLogin from "../src/component/headerLogin";
import LoginPage from "../src/container/login";
import WelcomePage from "../src/container/welcom";
import SideBar from '../src/component/navSidebar' 
import Header from '../src/component/header';
import UserSelector from '../src/container/userSelector'
import ProfileForm from "../src/container/profileForm";
import CoordinatorDashboard from "../src/container/coordinatorDashboard";
import AnnouncPage from "../src/container/announcmentPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  const authToken = localStorage.getItem('authToken');


  // if (authToken) {
    return (  
      <Router>
        <div className="wrapper">
          <div className="sidebar">
            <SideBar/>
          </div>
          <div className="content">
            <Header/>
            <Routes>
              <Route path="/" element={<AnnouncPage />} />
              {/* <Route path="/login/:userType" element={<LoginPage />} /> */}
              {/* <Route path="/welcome" element={<WelcomePage />} /> */}
            </Routes>
          </div>
        </div>
      </Router> 
    );
  // } else {
  //   return(
  //     <Router>
  //       <HeaderLogin/>
  //       <Routes>
  //         <Route path="/" element={<UserSelector />} />
  //         <Route path="/login/:userType" element={<LoginPage />} />
  //       </Routes>
  //     </Router>
  //   )
  //   // Authentication token does not exist in localStorage
  // }
  
}

export default App;
