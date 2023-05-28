import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as CalendarSVG } from "../../svgs/calendar.svg";
import { ReactComponent as LoadingSVG } from "../../svgs/loadingSVG.svg";
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingComp from '../loadingComp';
import { db } from '../../firebaseConfig';
import "./index.css";

function InternSelector() {
  const [authToken, setAuthToken] = useState(null);
  const [intern1, setintern1] = useState("");
  const [intern2, setintern2] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthToken = localStorage.getItem('authToken');
    // console.log(fetchAuthToken)
    setAuthToken(fetchAuthToken);
    // console.log("this is authToken", authToken )
    const getUserTypeById = async (userId) => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // console.log("Intern1 Type:", userData.intern1);
          // console.log("Intern2 Type:", userData.intern2);
          setintern1(userData.intern1);
          setintern2(userData.intern2);
          // localStorage.setItem('userType', userData.type);
          // setUserType(userData.type)
          // return userData.type; // Return the user type
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.log("Error retrieving user type:", error);
        return null;
      }
    };
    if (fetchAuthToken) {
      getUserTypeById(fetchAuthToken);
      // Authentication token exists in localStorage, do something with it
      // setLogedIn(true)
    } else {
      // Authentication token does not exist in localStorage
      // setLogedIn(false)
    }
    setLoading(false);
  }, []);


  const navigate = useNavigate();

  const handleRowClick = (intern) => {
    navigate(`/internapply/${intern}`);
  };

  if (loading) {
    return (
      <LoadingComp/>
    )
  }else{
  return (
    <div className="internSelectorMainCont">
      <div className='intenrContain'>
        <div className='intenrSelectorHeader'>
          <h1>Please select which internship to apply for:</h1>
        </div>
        <div 
          className='internSelectorSeparator'
          style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
        >
        </div>
        <div className="intenrButtonContainer">
          <Link to={"/applicationStatus"} className="internButton firstInternButton">
            <div className='internButtonHeader'>
              <h1>Summer Practice 1 </h1>
            </div>
            <div className="buttonSeparator">
            </div>
            <div className='internButtonBody'>
              <div className='internButtonBody-details'>
                <div className='internDetailsCont'>
                  <h2>Company:</h2>
                  <h3>Facebook</h3>
                </div>
                <div className='internDetailsCont'>
                  <h2>Application Date:</h2>
                  <h3>12/12/2021</h3>
                </div>
              </div>
              <div className='internButtonBody-status'>
                <div className='internStatusCont'>
                  <p>
                    Awaiting Coordinator Approval 
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div 
            onClick={() => handleRowClick("intern2")}
            className="internButton SecondInternButton"
            >
            <div className='internButtonHeader'>
              <h1>Summer Practice 2</h1>
            </div>
            <div className="buttonSeparator">
            </div>
            <div className='internButtonBody'>
              <div className='internButtonBody-status'>
                <div className='internStatusCont'>
                  <p>
                    Apply Now 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default InternSelector;
