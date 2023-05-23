import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CalendarSVG } from "../../svgs/calendar.svg";
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
          <Link to={"/applicationStatus"} className="internButton firstInternButton">
            <div className='internButtonHeader'>
              <h1>Summer Practice 1 </h1>
            </div>
            <div className="buttonSeparator">
            </div>
            <div className='internButtonBody'>
              <div className='internButtonBody-details'>
                <div className='internDetailsCont'>
                  <h2>Company:</h2>
                  <h3>Facebook</h3>
                </div>
                <div className='internDetailsCont'>
                  <h2>Application Date:</h2>
                  <h3>12/12/2021</h3>
                </div>
              </div>
              <div className='internButtonBody-status'>
                <div className='internStatusCont'>
                  <p>
                    Awaiting Coordinator Approval 
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link className="internButton SecondInternButton">
            <div className='internButtonHeader'>
              <h1>Summer Practice 2</h1>
            </div>
            <div className="buttonSeparator">
            </div>
            <div className='internButtonBody'>
            <div className='internButtonBody-status'>
                <div className='internStatusCont'>
                  <p>
                    Apply Now 
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternSelector;
