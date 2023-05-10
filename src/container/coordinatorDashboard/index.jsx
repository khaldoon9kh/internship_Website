import React, { useState } from 'react';
import "./index.css";


function CoordinatorDashboard() {
  return(
    <div className='coordinator-dashboeard-outerContainer'>
     <div className='coordinator-dashboeard-mainContainer'>
        <h2>Internship applications coming from internship coordinator</h2>

        <div  className='coordinator-dashboeard-internshipCells'>
          <div class="flex-container1">
            <div className='internshipInfo'>
              <h4 className='internship-name'>Software Internship</h4>
              <h6 className='internship-dateSent'>date sent 
                <time className='dateTime' datetime="DD-MM-YY"> 4/3/23</time>
              </h6>
            </div>
            <div className='file-download-icon'>
              <button>D</button>
            </div>
            <div class = "vertical-line" className='vertical-line'>
              {/* VErtival Line */}
            </div>
            <div className='intern-info'>
              <h4>Internship  application coming from  :  </h4> 
              <h3 className='intern-name'>Ameer AbuGharbiah</h3>
            </div>
            <div className='sgk-button-container'>
              <button className='sgk-button'>Issue SGK </button>
            </div>
          </div>
          
        </div>
        <div className='coordinator-dashboeard-internshipCells'>
          {/* <div class="flex-container">
            <div>1
              <h4 className='internship-name'>Software Internship</h4>
              <h6 className='internship-dateSent'>date sent</h6>
            </div>
            <div>2</div>
            <div>3</div>
          </div> */}
        </div>
      
        <div className='coordinator-dashboeard-internshipCells'></div>
        <div className='coordinator-dashboeard-internshipCells'></div>
     
     </div>
    </div>
  )
}

export default CoordinatorDashboard;
