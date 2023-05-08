import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

function UserSelector() {
  
  return (
    <div className="user-selector">
      <div className='usersContain'>
        <h1>Select User Type</h1>
        <div className="button-container">
          <Link to="/login?type=admin" className="button admin-button">
            Admin
          </Link>
          <Link to="/login?type=student" className="button student-button">
            Student
          </Link>
          <Link to="/login?type=internship-coordinator" className="button coordinator-button">
            Internship Coordinator
          </Link>
          <Link to="/login?type=career-center" className="button center-button">
            Career Center
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserSelector;
