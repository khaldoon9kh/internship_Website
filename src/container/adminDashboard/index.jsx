import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

import "./index.css";

const AdminDashboard = () => {
  const [careerCenterEmail, setCareerCenterEmail] = useState('');
  const [internshipCoordinatorEmail, setInternshipCoordinatorEmail] = useState('');
  const auth = getAuth();
  
  const getUserTypeById = async (userEmail,userType,_password) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      const newArray = [];
      // console.log(querySnapshot.size>0)
      if (querySnapshot.size > 0){
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id; // Add the id property to the data object
          newArray.push(data); // P
          const userObject = newArray.find(user => user.email === userEmail);
          editUserType(userObject.id, userType, userEmail);
        });
        // console.log("find user")
      }else{
        createUserWithEmailAndPassword(auth, careerCenterEmail, _password)
        .then((userCredential) => {
          // Signed in 
          const userData = userCredential.user;
          // console.log(userData.uid)
          editUserType(userData.uid, userType, userEmail)

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        // console.log("No such document!");
        // console.log("no user")
      }

      // const docRef = doc(db, "users", userEmail);
      // const docSnap = await getDoc(docRef);
      // if (querySnapshot.length > 0) {
      //   const userObject = usersArray.find(user => user.email === userEmail);
      //   editUserType(userData.type, userType);
      //   console.log("userexicts");
      //   // console.log("User Type:", userData.type);
      // } else {
      //   createUserWithEmailAndPassword(auth, careerCenterEmail, _password)
      //   .then((userCredential) => {
      //     // Signed in 
      //     const userData = userCredential.user;
      //     console.log(userData.uid)
      //     editUserType(userData.uid, userType)
      //     // ...
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     // ..
      //   });
      //   console.log("No such document!");
      // }
    } catch (error) {
      console.log("Error retrieving user type:", error);
    }
  };
  const editUserType = async (authToken, userType, email ) => {
    const profileRef = doc(db, 'users', authToken);
    await setDoc(profileRef, {type: userType, email: email}, { merge: true });
  }
  
  const handleCareerCenterEmailChange = (e) => {
    setCareerCenterEmail(e.target.value);
  };

  const handleInternshipCoordinatorEmailChange = (e) => {
    setInternshipCoordinatorEmail(e.target.value);
  };

  const handleCareerCenterSubmit = (e) => {
    e.preventDefault();

    const _tempPassword = "123456"
    getUserTypeById(careerCenterEmail,"careerCenter",_tempPassword)
    // Perform any necessary actions with the career center email
    // console.log('Career Center Email:', careerCenterEmail);
  };

  const handleInternshipCoordinatorSubmit = (e) => {
    e.preventDefault();
    const _tempPassword = "123456";
    getUserTypeById(internshipCoordinatorEmail,"coordinator",_tempPassword)
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
