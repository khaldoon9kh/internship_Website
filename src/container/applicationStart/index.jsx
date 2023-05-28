import React, { useState } from 'react';
import "./index.css";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from '../../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';


function ApplicationStart() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [needsLetter, setNeedsLetter] = useState('no');
  const [formPDF, setFormPDF] = useState(null);
  const [transcriptPDF, setTranscriptPDF] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [formLink, setFormLink] = useState('');
  const fetchAuthToken = localStorage.getItem('authToken');
  const { type } = useParams();
  // Create a root reference
  const storage = getStorage();


  // console.log(type)

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleNeedsLetterChange = (e) => {
    setNeedsLetter(e.target.value);
  };

  const handleFormPDFUpload = (e) => {
    const file = e.target.files[0];
    setFormPDF(file);
    uploadFileToStorage(file);
  };

  const handleTranscriptPDFUpload = async (e) => {
    const file = e.target.files[0];
    setTranscriptPDF(file);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
  const uploadFileToStorage = async (file) => {
    // const imagesRef = ref(storageRef, 'images');
    const storageRef = ref(storage, 'forms/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setFormLink(downloadURL);
        // return downloadURL;
      });
    }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  const downloadURL = await uploadFileToStorage(formPDF);
    
    // Handle form submission here
    // You can access the form data in the component's state
    // and perform any necessary actions
      await setDoc(doc(db, "internships", fetchAuthToken), {
        stName: "Khaldoon Khaldi",
        stNum:"123456789",
        department: "Software Engineering",
        intern2: {
          companyName: companyName,
          position: position,
          date: selectedDate,
          status: "pending",
          form:formLink
        }
      
      });
    // Example console log for testing
    console.log({
      stName: "Khaldoon Khaldi",
      stNum:"123456789",
      companyName,
      position,
      needsLetter,
      formPDF,
      transcriptPDF,
    });
  };


  return(
    <div className="applicationStartMainCont">
      <div className='applyHeaderMainContain'>
        <div className='applyHeaderCont'>
            <h1>Summer internship Form</h1>
          </div>
          <div 
            classname='internSelectorSeparator'
            style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
          >
          </div>
      </div>
      <div className='applyFormCont'>
        <form className='applyForm' onSubmit={handleSubmit}>
          <div>
            <label>Company Name:</label>
            <input type="text" value={companyName} onChange={handleCompanyNameChange} />
          </div>
          <div>
            <label>Position:</label>
            <input type="text" value={position} onChange={handlePositionChange} />
          </div>
          <div>
            <label>Select Date:</label>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
          </div>
          <div>
            <label>Upload Form PDF:</label>
            <input type="file" accept=".pdf" onChange={handleFormPDFUpload} />
          </div>
          <div>
            <label>Do you need a letter?</label>
            <select value={needsLetter} onChange={handleNeedsLetterChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {needsLetter === 'yes' && (
            <div>
              <label>Upload Transcript PDF:</label>
              <input type="file" accept=".pdf" onChange={handleTranscriptPDFUpload} />
            </div>
          )}
          <button type="submit">Apply</button>
      </form>

      </div>
    </div>  
  )
}

export default ApplicationStart;
