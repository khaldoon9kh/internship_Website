import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import JobOfferItem from '../../component/jobOfferItem'
import LoadingComp from '../loadingComp';
import './index.css'


const JobOffers = () => {
  const [jobOffersDATA, setjobOffersDATA] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobOffers = async () => {
    // get collection from DB      
    const jobOffers = [];
    try 
    {
      const querySnapshot = await getDocs(collection(db, "career"));
      
      querySnapshot.forEach((doc) => {
        jobOffers.push({ id: doc.id, ...doc.data() });
      });
      setjobOffersDATA(jobOffers);
    } catch (e) 
    {
      console.log("Error getting document:", e);
    }

    if(jobOffers !== null) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobOffers();
  }, []);
  
  if (loading) {
    return (
      <LoadingComp/>
    )
  }

  return (
    <div className="job-offer-page">
      <div className="job-offer-header">
        <h1>Job Offers</h1>
        <div className='jobOfferBody'>
          <h3>
            You may browse for an internship here
          </h3>
          <hr/>
        </div>
        
        {/* <div className="search-box">
        <input id='search' type="text" placeholder="Search..."/>
          <button>Search</button>
        </div> */}
      </div>
      <div className="job-offers-container">
  
      {
        jobOffersDATA.map((jobOffer, index) => (
          <JobOfferItem key={jobOffer.id} jobOffer={jobOffer}/>
        ))
      }
        
      </div>
    </div>
    
    );
  
};

export default JobOffers;
