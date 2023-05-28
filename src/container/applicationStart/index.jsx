import React, { useState, useEffect } from 'react';
import LoadingComp from '../loadingComp';
import "./index.css";
import { doc, setDoc, updateDoc , getDoc } from "firebase/firestore"; 
import {db} from '../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ReactComponent as LoadingSVG } from "../../svgs/loadingSVG.svg";
import { ReactComponent as CompletedSVG } from "../../svgs/doneCheck.svg";
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
  const [transcriptLink, setTranscriptLink] = useState('');
  const [formLoading, setFormLoading] = useState(null);
  const [transLoading, setTrnasLoading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [internData, setInternData] = useState(null);
  const [readOnly, setReadOnly] = useState(false)
  const fetchAuthToken = localStorage.getItem('authToken');
  const { internType } = useParams();
  console.log(internType)
  // Create a root reference
  const storage = getStorage();
  const navigate = useNavigate();

  const fetchInternsDetails = async (token) => {
    let internDATA = null;
    const intern1Ref = doc(db, "internships", token );
    // console.log("token from fetch intern details", token)
    // const intern2Ref = doc(db, "interns", "intern2");
    try {
      setLoading(true);
      const intern1Doc = await getDoc(intern1Ref);
      if (intern1Doc.exists()) {
        const userData = intern1Doc.data();
        setReadOnly(true)
        // console.log("This is user Data",userData)
        let internData1 = userData.intern1;
        let internData2 = userData.intern2;
        if(internType === "intern1"){
          setInternData(internData1);
          internDATA = internData1;
        }else if(internType === "intern2"){
          setInternData(internData2);
          internDATA = internData2;
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
    // console.log("this is intern1", intern1DATA)
    // console.log("this is intern2", intern2DATA)
    if(internDATA !== null){
      setLoading(false);
    }
    // const intern2Doc = await getDoc(intern2Ref);
    // setintern1(intern1Doc.data().status);
    // setintern2(intern2Doc.data().status);
  };

  useEffect(() => {
    const fetchAuthToken = localStorage.getItem('authToken');
    // console.log("this is authToken", authToken )
    if (fetchAuthToken) {
      fetchInternsDetails(fetchAuthToken);
    } else {
      navigate('/login');
    }
    // console.log("this data after useeffect",intern1DATA)
    // setLoading(false);
  }, []);
  
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
    // uploadFormToStorage(file);
  };

  const handleTranscriptPDFUpload = async (e) => {
    const file = e.target.files[0];
    setTranscriptPDF(file);
    uploadTranscriptToStorage(file);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
  const uploadFormToStorage = async (e,file) => {
    e.preventDefault();
    // const imagesRef = ref(storageRef, 'images');
    const storageRef = ref(storage, `${fetchAuthToken}/form/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFormLoading(progress);
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
        // console.log('File available at', downloadURL);
        setFormLink(downloadURL);
        // return downloadURL;
      });
    }
    );
  };
  
  const uploadTranscriptToStorage = async (e,file) => {
    e.preventDefault();
    // const imagesRef = ref(storageRef, 'images');
    const storageRef = ref(storage, `${fetchAuthToken}/transcript/`+ file.name);
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
        // console.log('File available at', downloadURL);
        setTranscriptLink(downloadURL);
        // return downloadURL;
      });
    }
    );
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     let submittedData
    if (internType === 'intern1') {
      submittedData = {
          stName: "Khaldoon Khaldi",
          stNum:"123456789",
          department: "Software Engineering",
          intern1: {
            companyName: companyName,
            position: position,
            date: selectedDate,
            status: "submitted",
            formLink:formLink,
            transcript:transcriptLink? transcriptLink : null,
            }
      }
    }else if (internType === 'intern2'){
      submittedData = {
        stName: "Khaldoon Khaldi",
        stNum:"123456789",
        department: "Software Engineering",
        intern2: {
          companyName: companyName,
          position: position,
          date: selectedDate,
          status: "submitted",
          formLink:formLink,
          transcript:transcriptLink? transcriptLink : null,
          }
      }
    }
      await setDoc(doc(db, "internships", fetchAuthToken), submittedData);
      if (internType === 'intern1') {
        await updateDoc(doc(db, "users", fetchAuthToken), {
          intern1: "submitted"
        });
      }else if (internType === 'intern2'){
        await updateDoc(doc(db, "users", fetchAuthToken), {
          intern2: "submitted"
        });
      }
      console.log(submittedData)
    // Example console log for testing
    // console.log({
    //   stName: "Khaldoon Khaldi",
    //   stNum:"123456789",
    //   companyName,
    //   position,
    //   needsLetter,
    //   formPDF,
    //   transcriptPDF,
    // });
  };

  if (loading || internData===null) {
    return (
      <LoadingComp/>
    )
  }else{
    // console.log("rendering Data",internData.date)
    return(
      <div className="applicationStartMainCont">
        <div className='applyHeaderMainContain'>
          <div className='applyHeaderCont'>
              <h1>Summer internship Form</h1>
            </div>
            <div 
              className='internSelectorSeparator'
              style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
            >
            </div>
        </div>
        <div className='applyFormCont'>
          <form className='applyForm' 
            // onSubmit={(e) => handleSubmit(e)}
          >
            {readOnly
              ?
            <div>
              <label>Status:</label>
              <input 
                type="text" 
                value={internData.status} 
                readOnly={true}
              />
            </div>
              :
              null
            }
            {internData.rejection
              ?
            <div>
              <label>Rejection Reason:</label>
              <input 
                type="text" 
                value={internData.rejection} 
                readOnly={true}
              />
            </div>
              :
              null
            }
            <div>
              <label>Company Name:</label>
              <input 
                type="text" 
                value={readOnly ? internData.companyName : companyName} 
                readOnly={readOnly}
                onChange={handleCompanyNameChange} 
              />
            </div>
            <div>
              <label>Position:</label>
              <input 
                type="text" 
                value={readOnly ? internData.position : position} 
                readOnly={readOnly}
                onChange={handlePositionChange} 
              />
            </div>
            <div>
              <label>
                {readOnly ? "Application Date:" : "Select Date:"}
              </label>
              <input 
                type="date" 
                value={readOnly ? internData.date : selectedDate} 
                readOnly={readOnly}
                onChange={handleDateChange} 
              />
            </div>
            <div>
              <label>
                {readOnly ? "Application Form:" : "Upload Form PDF:"}
              </label>
              <div className='formUploadCont'>
                {internData.formLink
                  ?
                    <a 
                      href={internData.formLink}
                      target="_blank"
                    >
                      {internData.formLink ? "Form Link" : "No File Uploaded"}
                    </a>
                  :
                  <>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      // readOnly={readOnly}
                      onChange={handleFormPDFUpload} 
                    />
                    <button 
                      onClick={(e) => uploadFormToStorage(e,formPDF)}
                      >
                      Upload
                    </button>
                    {formLoading === null
                      ? 
                      null 
                      : 
                      formLoading < 100 
                      ? 
                      <LoadingSVG/> 
                      : 
                      formLoading === 100 
                      ? 
                      <CompletedSVG/> 
                      : 
                      null
                    }
                  </>
                  
                }
              </div>
            </div>
            {internData.letterLink
              ?
              <div>
                <label>
                  {readOnly ? "Application Letter:" : "Upload Form PDF:"}
                </label>
                <div className='formUploadCont'>
                  <a 
                    href={internData.letterLink}
                    target="_blank"
                  >
                    {internData.letterLink ? "Letter Link" : "No File Uploaded"}
                  </a>
                </div>
              </div>
              :
              null
            }
            {internData.transcriptLink
              ?
              <div>
                <label>
                  {readOnly ? "Student Transcript:" : "Upload Form PDF:"}
                </label>
                <div className='formUploadCont'>
                  <a 
                    href={internData.transcriptLink}
                    target="_blank"
                  >
                    {internData.transcriptLink ? "Transcript Link" : "No File Uploaded"}
                  </a>
                </div>
              </div>
              :
              null
            }
            {internData.letterLink 
              ?
              null
              :
              <div>
                <label>Do you need a letter?</label>
                <select value={needsLetter} onChange={handleNeedsLetterChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            }
            {needsLetter === 'yes' && (
              <div>
                <label>Upload Transcript PDF:</label>
                <div className='formUploadCont'>
                  <input type="file" accept=".pdf" onChange={handleTranscriptPDFUpload} />
                  <button 
                    onClick={(e) => uploadTranscriptToStorage(e,transcriptPDF)}
                    >
                    Upload
                  </button>
                  {transLoading === null? null : transLoading < 100 ? <LoadingSVG/> : transLoading === 100 ? <CompletedSVG/> : null}
                </div>
              </div>
            )}
            {readOnly
              ?
              null
              :
              <button 
                onClick={(e) => handleSubmit(e)}
                type="submit"
              >
                  Apply
              </button>
            }
        </form>

        </div>
      </div>  
    )
  }
}

export default ApplicationStart;
