import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

function InternSelector() {
  
  return (
    <div className="internSelectorMainCont">
      <div className='intenrContain'>
        <h1 className='intenrSelectorHeader'>Select User Type</h1>
        <div className="intenrButtonContainer">
          <Link to="/login/admin" className="button firstInternButton">
            Admin
          </Link>
          <Link to="/login/student" className="button SecondInternButton">
            Student
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternSelector;
