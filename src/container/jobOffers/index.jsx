import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import JobOfferItem from '../../component/jobOfferItem'
import LoadingComp from '../loadingComp';
import './index.css'


const JobOffers = () => {
  const [jobOffersDATA, setjobOffersDATA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productID, setProductID] = useState('');

  const fetchJobOffers = async () => {
    // get collection from DB      
    const jobOffers = [];
    try 
    {
      const querySnapshot = await getDocs(collection(db, "career"));
      
      querySnapshot.forEach((doc) => {
        jobOffers.push({ id: doc.id, ...doc.data() });
      });

    // Sort the internships array based on the date in descending order
    jobOffers.sort((a, b) => new Date(b.datepicker) - new Date(a.datepicker)).reverse();
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

    const handleHashChange = () => {
      const hash = window.location.hash.substr(1); // Remove the '#' symbol
      setProductID(hash);
    };

    // Attach the event listener for hash change
    window.addEventListener('hashchange', handleHashChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  if (loading) {
    return (
      <LoadingComp/>
    )
  }

  const handleGoBack = () => {
    window.history.replaceState(null, null, window.location.pathname);
    setProductID('');
  };

  return (
    <div className="job-offer-page">
      <div className="job-offer-header">
        <h1>Job Offers</h1>
        <div className='jobOfferBody'>
          <h3>
            You may browse for an internship here
          </h3>
          <hr/>
          {productID && (
            <button onClick={handleGoBack}>
              <span>&#8592;</span> Back
            </button>
          )}
          
        </div>
        
        {/* <div className="search-box">
        <input id='search' type="text" placeholder="Search..."/>
          <button>Search</button>
        </div> */}
      </div>
      <div className="job-offers-container">
  
      {productID ? (
        // Render content if hash exists
        <div>// Some content for hash change</div>
      ) : (
        // Render content if no hash exists
        jobOffersDATA.map((jobOffer, index) => (
          <a className='jobOfferDetailsLink' href={`#${jobOffer.id}`} key={jobOffer.id}>
            <JobOfferItem jobOffer={jobOffer} />
          </a>
        ))
      )}
        
      </div>
    </div>
    
    );
  
};

export default JobOffers;
