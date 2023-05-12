import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

function InternSelector() {
  
  return (
    <div className="internSelectorMainCont">
      <div className='intenrContain'>
        <div className='intenrSelectorHeader'>
          <h1>Please select which internship to apply for:</h1>
        </div>
        <div 
          classname='internSelectorSeparator'
          style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
        >
        </div>
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
