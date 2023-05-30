import React from 'react';
import { ReactComponent as LocationLogo } from "../../svgs/MapPinLine.svg";
import { ReactComponent as TimeLogo } from "../../svgs/Clock.svg";
import { ReactComponent as Calender } from "../../svgs/Calendar.svg";
import './index.css'


const JobOfferItem = ({jobOffer}) => {
  return (
      <div className="job-offer-item">
        <div className="logo-container">
          <div className="logo">
            <img src={jobOffer.imageUrl} alt="Company Logo" />
          </div>
        </div>
        <div className="job-description">
          <div className="company-name">
            <h4>{jobOffer.companyName}</h4>
            <h2>{jobOffer.position}</h2>
          </div>
          <div className="location-time">
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
              <p>{jobOffer.datepicker}</p>
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
