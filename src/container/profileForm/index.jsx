import React, { useState, useEffect } from 'react';
import LoadingComp from '../loadingComp';
import { doc, setDoc, updateDoc , getDoc } from "firebase/firestore"; 
import { ReactComponent as LoadingSVG } from "../../svgs/loadingSVG.svg";
import { ReactComponent as CompletedSVG } from "../../svgs/doneCheck.svg";
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

import './index.css'


const ProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [grade, setGrade] = useState('');
  const [universityEmail, setUniversityEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stNumber, setStNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [readOnly, setReadOnly] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    // Fetch data from API here
    // TO DO - Fetch data from API here
    const fetchAuthToken = localStorage.getItem('authToken');
    setAuthToken(fetchAuthToken);
    fetchInternDetails(fetchAuthToken);
  }, []);

  const faculties = {
    'Faculty of Communication': ['Cartoon and Animation', 'Journalism'],
    'Faculty of Engineer': ['Chemical Engineering', 'Industrial Engineering', 'Software Engineering'],
    'Faculty of Health': ['Audiology', 'Midwifery'],
  };

  const grades = ['first grade', 'second grade', 'third grade', 'fourth grade'];

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Process form data here
  // };
  const fetchInternDetails = async (token) => {
    let constPersonalDATA = null;
    // console.log("this is token", token)
    // let tempToken = "KWxWyof82lYAEaFOyUzsqcSSLcp1"
    const internRef = doc(db, "users", token );
    try {
      const fetchedPersonalData = await getDoc(internRef);
      if (fetchedPersonalData.exists()) 
      {
        setReadOnly(true);
        const personalData = fetchedPersonalData.data();
        // console.log(personalData)
        setFirstName(personalData.stName);
        setStNumber(personalData.stNum);
        setFaculty(personalData.faculty);
        setGrade(personalData.grade);
        setPhoneNumber(personalData.phone);
        setDepartment(personalData.department);
        constPersonalDATA = personalData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.log("Error getting document:", e);
    }
    if(constPersonalDATA !== null){
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowModal(true);
    setSubmitting(true);
      let submittedData = {
        stName: firstName,
        stNum:  stNumber,
        faculty: faculty,
        department: department,
        grade: grade,
        phone: phoneNumber,
        intern1: "open",
        intern2: "open",
      };
      const profileRef = doc(db, 'users', authToken);
      await setDoc(profileRef, submittedData, { merge: true });
      console.log(submittedData)
      setSubmitting(false);
      // await updateDoc(doc(db, "internships", authToken), submittedData);
      // if (internType === 'intern1') {
      //   await updateDoc(doc(db, "users", authToken), {
      //     intern1: status
      //   });
      //   setSubmitting(false);
      // }else if (internType === 'intern2'){
      //   await updateDoc(doc(db, "users", authToken), {
      //     intern2: status
      //   });
      //   setSubmitting(false);
      // }
  }

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
    navigate(`/internSelector`);
  };

  if (loading) {
    return (
      <LoadingComp/>
    )
  }{
    return (
      <div className="profile-form-outerContainer">
        <div className='profile-form-mainContainer'> 
          {showModal && (
              <div className="modalOverlay">
                <div className="modalContent">
                  {submitting 
                  ? 
                    <LoadingSVG/>
                  :
                    <CompletedSVG/>
                  }
                  <h2>{submitting ? "Updating Application" : "Application Updated!"}</h2>
                  <button onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
          <div className='header-Main-coordinator-dashboeard'>
            <div className='header-profile'>
              <h1>Profile Information</h1>
              <p>Update your personal details here.</p>
            </div>
            <div 
              className='coordinatorSelectorSeparator'
              style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
            >
            </div>
          </div>
          <form className='profil-form-cont' onSubmit={handleFormSubmit}>
            <div className="profile-form-first">
              <div className="input-group-profile">
                <label className='labelProfile' htmlFor="username">
                  Name Surname:
                </label>
                <input
                  readOnly={readOnly}
                  className='inputProfile'
                  id='username' 
                  type="text" 
                  placeholder="First Name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="input-group-profile">
                <label className='labelProfile' htmlFor="username">
                  Student Number:
                </label>
                <input
                  readOnly={readOnly}
                  className='inputProfile'
                  id='stNumber' 
                  type="text" 
                  placeholder="First Name" 
                  value={stNumber} 
                  onChange={(e) => setStNumber(e.target.value)} 
                />
              </div>
              <div className="input-group-profile">
                <label className='labelProfile' htmlFor="faculty">
                  Faculty
                </label>
                <select 
                  className='inputProfile'
                  disabled={readOnly}
                  id='faculty'
                  value={faculty} 
                  onChange={(e) => setFaculty(e.target.value)}
                  >
                  <option value="">Select Faculty</option>
                  {Object.keys(faculties).map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group-profile">
                <label className='labelProfile' htmlFor="department">
                  Department
                </label>
                <select 
                  id='department'
                  disabled={readOnly}
                  value={department} 
                  onChange={(e) => setDepartment(e.target.value)}
                  >
                  <option value="">Select Department</option>
                  {faculty &&
                    faculties[faculty].map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group-profile">
                <label className='labelProfile' htmlFor="grade">
                  Grade
                </label>
                <select 
                  id='grade'
                  value={grade} 
                  disabled={readOnly} 
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group-profile">
                <label className='labelProfile' htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input 
                  className='inputProfile'
                  readOnly={readOnly}
                  id='phoneNumber'
                  type="tel" 
                  placeholder="Phone Number" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  />
              </div>
            </div>
            {/* <div className="profile-form-second"> */}
              {/* <div className="input-group-profile">
                <label className='labelProfile' htmlFor="universityEmail">
                  University Email
                </label>
                <input 
                  className='inputProfile'
                  type="email" 
                  placeholder="University Email" 
                  value={universityEmail} 
                  onChange={(e) => setUniversityEmail(e.target.value)} 
                />
              </div> */}
              {/* <div className="input-group-profile">
                <label className='labelProfile' htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input 
                  className='inputProfile'
                  id='phoneNumber'
                  type="tel" 
                  placeholder="Phone Number" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  />
              </div>
            </div> */}
            <div className="profile-form-button">
              <button
                hidden={readOnly}
                className='buttonProfile' type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
