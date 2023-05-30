import React from 'react';
import { ReactComponent as LocationLogo } from "../../svgs/MapPinLine.svg";
import { ReactComponent as TimeLogo } from "../../svgs/Clock.svg";
import { ReactComponent as Calender } from "../../svgs/calendar.svg";
import './index.css'


const JobOfferItem = ({jobOffer}) => {
  return (
      <div class="job-offer-item">
        <div class="logo-container">
          <div class="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Company Logo" />
          </div>
        </div>
        <div class="job-description">
          <div class="company-name">
            <h4>{jobOffer.companyName}</h4>
            <h2>{jobOffer.position}</h2>
          </div>
          <div class="location-time">
            <div className='info-cont'>
              <LocationLogo/>
              <p>{jobOffer.location}</p>
            </div>
            <div className='info-cont'>
              <TimeLogo/>
              <p>{jobOffer.duration}</p>
            </div>
            <div className='info-cont'>
              <Calender/>
              <p>{jobOffer.date}</p>
            </div>
          </div>
          <div>
            <p>{jobOffer.description}</p>
          </div>
          
        </div>
      </div>
  );
};

export default JobOfferItem;
