import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

function UserSelector() {
  
  return (
    <div className="user-selector">
      <div className='usersContain'>
        <h1 className='selectorHeader'>Select User Type</h1>
        <div className="button-container">
          <Link to="/login/admin" className="button admin-button">
            Admin
          </Link>
          <Link to="/login/student" className="button student-button">
            Student
          </Link>
          <Link to="/login/internship-coordinator" className="button coordinator-button">
            Internship Coordinator
          </Link>
          <Link to="/login/career-center" className="button center-button">
            Career Center
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserSelector;
