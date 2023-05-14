import React, { useState } from 'react';
import './index.css'


const JobOffers = () => {
  
  return (
    <div class="all">
    <h2> Application status</h2>
    <p class="specail"> your application's progress</p>
   <div class="status-wrapper">
     <div class="status-container">
        <div class="detalis">
            <p>you are applying for</p>
            <h5 class="comingDetali">front-end Development</h5>
        </div>
        <div class="detalis">
            <p>Status</p>
            <h5 class="comingDetali">under process</h5>
        </div>
        <div class="detalis">
            <p>Coordinator Name</p>
            <h5 class="comingDetali">kritin</h5>
        </div>
        <div class="detalis">
            <p>Coordinator Email</p>
            <h5 class="comingDetali">hhhhhhh@gmail.com</h5>
        </div>
     </div>
       <div class="secondcon">
        <div class="detalis">
            <p>Date of applying</p>
            <h5 class="comingDetali">30/05/2023</h5>
        </div>
        </div>
  
   </div>
   </div>
  );
};

export default JobOffers;
