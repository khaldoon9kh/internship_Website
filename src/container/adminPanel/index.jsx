import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { ReactComponent as LoadingSVG } from "../../svgs/loadingSVG.svg";
import { ReactComponent as CompletedSVG } from "../../svgs/doneCheck.svg";
import './index.css'

const AdminPanel = () => {
  const [careerCenterEmail, setCareerCenterEmail] = useState('');
  const [internshipCoordinatorEmail, setInternshipCoordinatorEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
        setSubmitting(false);
        // console.log("find user")
      }else{
        console.log("notFind user")
        createUserWithEmailAndPassword(auth, userEmail, _password)
        .then((userCredential) => {
          // Signed in 
          const userData = userCredential.user;
          // console.log(userData.uid)
          editUserType(userData.uid, userType, userEmail)
          setSubmitting(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setSubmitting(false);
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
      setSubmitting(true);
    }
  };
  const editUserType = async (authToken, userType, email ) => {
    const profileRef = doc(db, 'users', authToken);
    await setDoc(profileRef, {type: userType, email: email}, { merge: true });
  }
  

  const handleCareerCenterSubmit = (e) => {
    if (careerCenterEmail === '') {
      alert('Please enter a valid email address.');
    }else{
      setShowModal(true);
      setSubmitting(true);
      e.preventDefault();
      const _tempPassword = "123456"
      getUserTypeById(careerCenterEmail,"careerCenter",_tempPassword)
      // Perform any necessary actions with the career center email
      // console.log('Career Center Email:', careerCenterEmail);
    }

  };

  const handleInternshipCoordinatorSubmit = (e) => {
    if (internshipCoordinatorEmail === '') {
      alert('Please enter a valid email address.');
    }else{
      setShowModal(true);
      setSubmitting(true);
      e.preventDefault();
      const _tempPassword = "123456";
      console.log(internshipCoordinatorEmail)
      getUserTypeById(internshipCoordinatorEmail,"coordinator",_tempPassword)
      // Perform any necessary actions with the internship coordinator email
    }
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <div className="admin-panel-outerContainer">
      {showModal && (
          <div className="modalOverlay">
            <div className="modalContent">
              {submitting && (
                <LoadingSVG/>
                )
              }
              <h2>{submitting ? "Uploading Application" : "Form Submitted!"}</h2>
              { !submitting ? <p>Thank you for submitting the form.</p> : null}
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
       <div className="userTypeForm">
        <div className='page-info-container'>
          <h2 className='page-info-txt1'>
            Assign internship & Employee 
          </h2>
          <h4 className='page-info-txt2'>
            Assign internship coordinator and corresponding Career Center
          </h4>
          <div 
            className='internSelectorSeparator'
            style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
            >
          </div>
        </div>  
        <div className='assign-internship-container'>
          <h3 className='assign-internship-txt'>Assign Internship</h3>
          <div className="intern-input-group">
            <input 
              className="inputCoord"
              htmlFor='internEmail'
              type="email" 
              placeholder="Email Address" 
              value={internshipCoordinatorEmail} 
              onChange={(e) => setInternshipCoordinatorEmail(e.target.value)} 
            />
            <button 
              onClick={(e) => handleInternshipCoordinatorSubmit(e)}
              className="assign-btn"
            >
              Assign 
              <i id='arrows' className="arrow right"></i></button>
          </div>
        </div>
        <div className='assign-internship-container'>
          <h3 className='assign-internship-txt'>Assign Career Center</h3>
          <div className="intern-input-group">
            <input 
              className="inputCoord"
              htmlFor='internEmail'
              type="email" 
              placeholder="Email Address" 
              value={careerCenterEmail} 
              onChange={(e) => setCareerCenterEmail(e.target.value)} 
            />
            <button 
              onClick={(e) => handleCareerCenterSubmit(e)}
             className="assign-btn"
             >
              Assign 
            <i id='arrows' className="arrow right"></i></button>
          </div>
          </div>
       </div>
      </div>
  );
};

export default AdminPanel;


