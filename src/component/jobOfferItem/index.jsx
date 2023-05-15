import React, { useState } from 'react';
import { ReactComponent as LocationLogo } from "../../svgs/MapPinLine.svg";
import { ReactComponent as TimeLogo } from "../../svgs/Clock.svg";
import { ReactComponent as Calender } from "../../svgs/Calendar.svg";
import './index.css'


const JobOfferItem = () => {
  
  return (
      <div class="job-offer-item">
        <div class="logo-container">
          <div class="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Company Logo" />
          </div>
        </div>
        <div class="job-description">
          <div class="company-name">
            <h4>Facebook</h4>
            <h2>Content controller</h2>
          </div>
          <div class="location-time">
            <div className='info-cont'>
              <LocationLogo/>
              <p>Istanbul</p>
            </div>
            <div className='info-cont'>
              <TimeLogo/>
              <p>Full time</p>
            </div>
            <div className='info-cont'>
              <Calender/>
              <p>30 mins ago</p>
            </div>
          </div>
          <div>
            <p>As HOP Health Platform, we aim to be a leading online platform in health issues. We are looking for a content editor to create, edit and publish health related content.
                In this role, you will produce informative, reliable and impressive content on health-related topics, edit posts and develop content strategies to improve the quality of our platform.
            </p>
          </div>
          
        </div>
      </div>
  );
};

export default JobOfferItem;
