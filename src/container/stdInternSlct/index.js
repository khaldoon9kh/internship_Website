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
          <Link className="internButton firstInternButton">
            <div className='internButtonHeader'>
              <h1>Summer Practice 1 </h1>
            </div>
            <div className="buttonSeparator">
            </div>
            <div className='internButtonBody'>
              <p>First Internship Description</p>
            </div>
          </Link>
          <Link className="internButton SecondInternButton">
            <div className='internButtonHeader'>
              <h1>Summer Practice 2</h1>
            </div>
            <div className="buttonSeparator">
            </div>
            <div className='internButtonBody'>
              <p>Second Internship Description</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternSelector;
