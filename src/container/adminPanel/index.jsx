import React, { useState } from 'react';
import './index.css'

const AdminPanel = () => {
 

  return (
    <div className="admin-panel-outerContainer">
      <div className='page-info-container'>
        <h2 className='page-info-txt1'>Assign internship & Employee </h2>
        <h4 className='page-info-txt2'>Assign internship coordinator and corresponding internships Assign <br />
            Career Center Employee and corresponding Career Center</h4>
      </div>  
      <div className='assign-internship-container'>
        <h3 className='assign-internship-txt'>Assign Internship</h3>
        <div class="flex-container outer">
          <div class="dropdown" className='select-internship-coordinator'>
            <div class ="felx-conatiner inner">
              <button class="dropbtn">Select Internship Coordinator <i id='arrows' class="arrow up"></i></button>
              
              
            </div>
            <div class="dropdown-content">
              <a>Link 1</a>
              <a>Link 2</a>
              <a>Link 3</a>
            </div>

          </div>
          <div class="hl"></div>
          <button class="dropbtn">Select Internship<i id='arrows' class="arrow up"></i></button>
          <button className="assign-btn">Assign <i id='arrows' class="arrow right"></i></button>
        </div>
      </div>
      <div className='assign-internship-container'>
        <h3 className='assign-internship-txt'>Assign Employee</h3>
        <div class="flex-container outer">
          <div class="dropdown" className='select-internship-coordinator'>
            <div class ="felx-conatiner inner">
              <button class="dropbtn">Select Career Center Employee <i id='arrows' class="arrow up"></i></button>
              
              
            </div>
            <div class="dropdown-content">
              <a>Link 1</a>
              <a>Link 2</a>
              <a>Link 3</a>
            </div>

          </div>
          <div class="hl"></div>
          <button class="dropbtn">Select Career Center<i id='arrows' class="arrow up"></i></button>
          <button className="assign-btn">Assign <i id='arrows' class="arrow right"></i></button>
        </div>
      </div>
      
    </div>
  );
};

export default AdminPanel;


