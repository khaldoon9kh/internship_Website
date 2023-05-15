import React, { useState } from 'react';
import './index.css'

const AdminPanel = () => {
  const [intenrEmail, setInternEmail] = useState('');
  const [careerEmail, setCareerEmail] = useState('');

  return (
    <div className="admin-panel-outerContainer">
      <div className='page-info-container'>
        <h2 className='page-info-txt1'>
          Assign internship & Employee 
        </h2>
        <h4 className='page-info-txt2'>
          Assign internship coordinator and corresponding Career Center
        </h4>
      </div>  
      <div className='assign-internship-container'>
        <h3 className='assign-internship-txt'>Assign Internship</h3>
        <div className="intern-input-group">
          <input 
            htmlFor='internEmail'
            type="email" 
            placeholder="Email Address" 
            value={intenrEmail} 
            onChange={(e) => setInternEmail(e.target.value)} 
          />
          <button className="assign-btn">Assign <i id='arrows' class="arrow right"></i></button>
        </div>
      </div>
      <div className='assign-internship-container'>
        <h3 className='assign-internship-txt'>Assign Career Center</h3>
        <div className="intern-input-group">
          <input 
            htmlFor='internEmail'
            type="email" 
            placeholder="Email Address" 
            value={careerEmail} 
            onChange={(e) => setCareerEmail(e.target.value)} 
          />
          <button className="assign-btn">Assign <i id='arrows' class="arrow right"></i></button>
        </div>
        </div>
      </div>
  );
};

export default AdminPanel;


