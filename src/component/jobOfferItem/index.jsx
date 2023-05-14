import React, { useState } from 'react';
import { ReactComponent as locationLogo } from "../../svgs/MapPinLine.svg";
import { ReactComponent as timeLogo } from "../../svgs/Vector (Stroke).svg";
import './index.css'


const JobOfferItem = () => {
  
  return (
      <div class="job-offer-item">
        <div class="logo-container">
          <div class="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Company Logo" />
          </div>
          <div class="company-name">
            <h2>Facebook</h2>
          </div>
        </div>
        <div class="job-description">
          <h3>Content controller</h3>
          <div class="location-time">
            <locationLogo/>
          <span>Istanbul</span>
          <span>Full time</span>
          <timeLogo/>
          <span>30 min ago</span>
          </div>
          <p>As HOP Health Platform, we aim to be a leading online platform in health issues. We are looking for a content editor to create, edit and publish health related content.
            In this role, you will produce informative, reliable and impressive content on health-related topics, edit posts and develop content strategies to improve the quality of our platform.</p>
          
        </div>
      </div>
  );
};

export default JobOfferItem;
