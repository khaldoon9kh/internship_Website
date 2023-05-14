import React, { useState } from 'react';
import { ReactComponent as locationLogo } from "../../svgs/MapPinLine.svg";
import { ReactComponent as timeLogo } from "../../svgs/Vector (Stroke).svg";
import JobOfferItem from '../../component/jobOfferItem'
import './index.css'


const JobOffers = () => {
  
  return (
  <div class="job-offer-page">
    <div class="job-offer-header">
      <h1>Job Offers</h1>
      <div className='jobOfferBody'>
        <h3>
          You may browse for an internship here
        </h3>
        <hr/>
      </div>
      
      {/* <div class="search-box">
      <input id='search' type="text" placeholder="Search..."/>
        <button>Search</button>
      </div> */}
    </div>
    <div class="job-offers-container">
      <JobOfferItem/>
      
    </div>
  </div>




  
  );
};

export default JobOffers;
