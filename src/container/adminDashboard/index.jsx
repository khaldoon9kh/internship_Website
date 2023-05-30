import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

import "./index.css";

const AdminDashboard = () => {
  const [careerCenterEmail, setCareerCenterEmail] = useState('');
  const [internshipCoordinatorEmail, setInternshipCoordinatorEmail] = useState('');
  const auth = getAuth();
  
  const editUserType = async (authToken, userType ) => {
    const profileRef = doc(db, 'users', authToken);
    await setDoc(profileRef, {type: userType}, { merge: true });
  }
  
  const handleCareerCenterEmailChange = (e) => {
    setCareerCenterEmail(e.target.value);
  };

  const handleInternshipCoordinatorEmailChange = (e) => {
    setInternshipCoordinatorEmail(e.target.value);
  };

  const handleCareerCenterSubmit = (e) => {
    e.preventDefault();

    const _tempPassword = "123456";
    createUserWithEmailAndPassword(auth, careerCenterEmail, _tempPassword)
    .then((userCredential) => {
      // Signed in 
      const userData = userCredential.user;
      console.log(userData.uid)
      editUserType(userData.uid, "careerCenter")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    // Perform any necessary actions with the career center email
    // console.log('Career Center Email:', careerCenterEmail);
  };

  const handleInternshipCoordinatorSubmit = (e) => {
    e.preventDefault();
    const _tempPassword = "123456";
    createUserWithEmailAndPassword(auth, internshipCoordinatorEmail, _tempPassword)
    .then((userCredential) => {
      // Signed in 
      const userData = userCredential.user;
      console.log(userData.uid)
      editUserType(userData.uid, "coordinator")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    // Perform any necessary actions with the internship coordinator email
  };

  return (
    <div className="internSelectorMainCont">
      <div className="userTypeForm">
        <div className='userTypeFormHeader'>
            <h1>Please select which internship to apply for:</h1>
          <div 
            className='internSelectorSeparator'
            style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
            >
          </div>
        </div>
        <div className="userTypeFormAction">
          <div className="internship-detail">
            <label className="userTypeForm-label" htmlFor="careerCenterEmail">
              Career Center Email:
            </label>
            <form onSubmit={handleCareerCenterSubmit}>
              <input
                className="inputCoord"
                type="email"
                id="careerCenterEmail"
                value={careerCenterEmail}
                onChange={handleCareerCenterEmailChange}
              />
              <button className="userTypeFormButton" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="internship-detail">
            <label className="userTypeForm-label" htmlFor="internshipCoordinatorEmail">
              Internship Coordinator Email:
            </label>
            <form onSubmit={handleInternshipCoordinatorSubmit}>
              <input
                className="inputCoord"
                type="email"
                id="internshipCoordinatorEmail"
                value={internshipCoordinatorEmail}
                onChange={handleInternshipCoordinatorEmailChange}
              />
              <button className="userTypeFormButton" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
