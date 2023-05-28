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
  const [internStatus1, setInternStatus1] = useState("");
  const [internStatus2, setInternStatus2] = useState("");
  const [internDet1, setInternDet1] = useState(null);
  const [internDet2, setInternDet2] = useState(null);
  const [loading, setLoading] = useState(true);
  // let intern1DATA = null;
  // let intern2DATA = null;

  const fetchInternsDetails = async (token) => {
    let intern1DATA = null;
    let intern2DATA = null;
    const intern1Ref = doc(db, "internships", token );
    console.log("token from fetch intern details", token)
    // const intern2Ref = doc(db, "interns", "intern2");
    try {
      setLoading(true);
      const intern1Doc = await getDoc(intern1Ref);
      if (intern1Doc.exists()) {
        const userData = intern1Doc.data();
        // console.log("This is user Data",userData)
        let internData1 = userData.intern1;
        let internData2 = userData.intern2;
        if(internData1.status !== "closed"){
          setInternDet1(internData1)
          intern1DATA = internData1;
          // console.log("this is data 1",intern1newDATA)
        }else{
          setInternStatus1("closed");
        }
        if(internData2.status !== "closed"){
          setInternDet2(internData2)
          intern2DATA = internData2;
        }else{
          setInternStatus2("closed");
        }
        // setLoading(false);
        // console.log(internDet2)
      } else {
        console.log("No such document!");
        return null;
      }
      // console.log(userData)
    } catch (e) {
      console.log("Error getting document:", e);
    }
    console.log("this is intern1", intern1DATA)
    console.log("this is intern2", intern2DATA)
    if(intern1DATA !== null && intern2DATA !==null){
      setLoading(false);
    }
    // const intern2Doc = await getDoc(intern2Ref);
    // setintern1(intern1Doc.data().status);
    // setintern2(intern2Doc.data().status);
  };


  useEffect(() => {
    const fetchAuthToken = localStorage.getItem('authToken');
    setAuthToken(fetchAuthToken);
    const fetchInternstatus1 = localStorage.getItem('intern1');
    const fetchInternstatus2 = localStorage.getItem('intern2');
    // console.log(fetchAuthToken)
    setAuthToken(fetchAuthToken);
    // console.log("this is authToken", authToken )
    if (fetchAuthToken) {
      fetchInternsDetails(fetchAuthToken);
      setInternStatus1(fetchInternstatus1);
      setInternStatus2(fetchInternstatus2);
    } else {
      navigate('/login');
    }
    // console.log("this data after useeffect",intern1DATA)
    // setLoading(false);
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
    console.log("this data after useeffect",internDet2.position)
  // console.log(internDet2)
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
          {internStatus1 !== "closed" ? 
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
                      {internStatus1}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          :
          null
          }
          {internStatus2 !== "closed" ?   
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
                <div className='internButtonBody-details'>
                  {internDet2.companyName 
                    ?
                    <div className='internDetailsCont'>
                      <h2>Company:</h2>
                      <h3>{internDet2.companyName}</h3>
                    </div>
                    :
                    null
                  }
                  {internDet2.date
                    ?
                    <div className='internDetailsCont'>
                      <h2>Application Date:</h2>
                      <h3>{internDet2.date}</h3>
                    </div>
                    :
                    null
                  }
                </div>
                <div className='internButtonBody-status'>
                  <div className='internStatusCont'>
                    <p>
                      {internStatus2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          :
          null
          }
        </div>
      </div>
    </div>
  );
  }
}

export default InternSelector;
