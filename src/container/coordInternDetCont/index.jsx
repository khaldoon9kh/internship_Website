import React, { useState,useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import { useNavigate, useParams } from 'react-router-dom';
import { doc, setDoc, updateDoc , getDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../../firebaseConfig';
import LoadingComp from '../loadingComp';
import { ReactComponent as LoadingSVG } from "../../svgs/loadingSVG.svg";
import { ReactComponent as CompletedSVG } from "../../svgs/doneCheck.svg";

const InternshipDetailsContainer = () => {
  const [action, setAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState(null);
  const [letterPDF, setLetterPDF] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stName, setStName] = useState(null);
  const [stNumber, setStNumber] = useState(null);
  const [stDepartment, setStDepartment] = useState(null);
  const [internData, setInternData] = useState(null);
  const [letterLoading, setLetterLoading] = useState(null);
  const [letterLink, setLetterLink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { id, internType } = useParams();
  const storage = getStorage();
  // console.log(id, internType)

  const fetchInternDetails = async (token) => {
    let internDATA = null;
    const internRef = doc(db, "internships", token );
    try {
      const internDoc = await getDoc(internRef);
      if (internDoc.exists()) 
      {
        const internshipData = internDoc.data();
        setStName(internshipData.stName);
        setStNumber(internshipData.stNum);
        setStDepartment(internshipData.department);
        if(internType === "intern1"){
          internDATA = internshipData.intern1;
          setInternData(internDATA);
          // console.log(internDATA)
        }else if(internType === "intern2"){
          internDATA = internshipData.intern2;
          setInternData(internDATA);
          // console.log(internDATA)
        }
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.log("Error getting document:", e);
    }
    if(internDATA !== null){
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternDetails(id);
  }, []);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleLetterPDFUpload = (e) => {
    const file = e.target.files[0];
    setLetterPDF(file);
  };

  const uploadLetterToStorage = async (e,file) => {
    e.preventDefault();
    // const imagesRef = ref(storageRef, 'images');
    const storageRef = ref(storage, `${id}/letter/`+ file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setLetterLoading(progress);
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
        setLetterLink(downloadURL);
        // return downloadURL;
      });
    }
    );
  };

  const handleSubmit = async (e) => {
    let sgkSubmittedData = null;
    if (action === "") {
      alert("Please select an action");
    } else if (action === "Reject" && rejectionReason === null) {
      alert("Please enter a reason for rejection");
    } else if (action === "Send Letter" && letterPDF === null) {
      alert("Please upload a letter");
    } else 
    {
      setShowModal(true);
      setSubmitting(true);
      e.preventDefault();
      let status = null;
      if (action === "Send Letter") 
      {
        status = "Letter Uploaded";
      }else if (action === "Approve") 
      {
        status = "Awaiting SGK";
      }else if (action === "Reject"){
        status = "Rejected";
      };

      let submittedData = null;
        if (internType === 'intern1') {
          submittedData = {
              intern1: {
                ...internData,
                status: status,
                letterLink: action === "Send Letter" ? letterLink : null,
                rejectionReason: action === "Rejected" ? rejectionReason : null,
              }
          }
        }else if (internType === 'intern2'){
          submittedData = {
            intern2: {
              ...internData,
              status: status,
              letterLink: action === "Send Letter" ? letterLink : null,
              rejectionReason: action === "Rejected" ? rejectionReason : null,
            }
          }
        }
      await updateDoc(doc(db, "internships", id), submittedData);
      if (internType === 'intern1') {
        await updateDoc(doc(db, "users", id), {
          intern1: status
        });
        setSubmitting(false);
      }else if (internType === 'intern2'){
        await updateDoc(doc(db, "users", id), {
          intern2: status
        });
        setSubmitting(false);
      }
      if (action === "Approve"){
        if (internType === 'intern1') {
          sgkSubmittedData = {
              stName: stName,
              stNum: stNumber,
              department: stDepartment,
              intern1: {
                ...internData,
                status: status,
              }
          }
        }else if (internType === 'intern2'){
          sgkSubmittedData = {
            stName: stName,
            stNum: stNumber,
            department: stDepartment,
            intern2: {
              ...internData,
              status: status,
            }
          }
        }
        await setDoc(doc(db, "sgk", id), sgkSubmittedData);
      }
    }
    // Handle form submission here
    // You can access the selected action, rejection reason,
    // and uploaded letter PDF in the component's state
    // and perform any necessary actions

    // Example console log for testing
    console.log({
      action,
      rejectionReason,
      letterPDF,
    });
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };


  if (loading) {
    return (
      <LoadingComp/>
    )
  }else{
  return (
    <div className="internship-details-container">
      <div className='internshipDetailsHeader'>
        <div className='intenrSelectorHeader'>
            <h1>Internship Details:</h1>
        </div>
          <div 
            className='internSelectorSeparator'
            style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
          >
        </div>
      </div>
      <div className="internMain-container">
        {showModal && (
            <div className="modalOverlay">
              <div className="modalContent">
                {submitting && (
                  <LoadingSVG/>
                  )
                }
                <h2>{submitting ? "Updating Application" : "Application Updated!"}</h2>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        <div className="container-internship-detail">
          <div className="internship-detail">
            <div className="detail-label">Application Date:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={internData.date} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Application Status:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={internData.status} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Student Number:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={stNumber} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Student Name:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={stName} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Department:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={stDepartment} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Internship Type:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={internType === "intern1" ? "Summer Practice 1" : "Summer Practice 2"} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Company Name:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={internData.companyName} 
                readOnly={true}
              />
            </div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Position:</div>
            <div className="detail-value">
              <input 
                className='inputCoord' 
                value={internData.position} 
                readOnly={true}
              />
            </div>
          </div>
          </div>
          <div className="internBottomDetCont">
            <div className="attachedDocCont">
              <div className="detail-label">Attached Documents:</div>
              <div className="links-detail-value">
                {internData.transcriptLink
                ?
                  <a 
                    href={internData.transcriptLink}
                    target='_blank'
                  >
                    Transcript
                  </a>
                :
                  null
                }
                {internData.formLink
                  ?
                  <a 
                  href={internData.formLink}
                  target='_blank'
                >
                  Application Form
                </a>
                :
                  null
                }
                
                {internData.letterLink
                ?
                  <a 
                    href={internData.letterLink}
                    target='_blank'
                  >
                    Application Letter
                  </a>
                :
                  null
                }
              </div>
            </div>
            <div 
                className='internSelectorSeparator'
                style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
            >
            </div>
            <div className="internship-actions">
              <div className="actionRequiredCont">
                <label className='actionLabel'>Action Required:</label>
                <select value={action} onChange={handleActionChange}>
                  <option value="">Select Action</option>
                  <option value="Approve">Approve</option>
                  <option value="Reject">Reject</option>
                  <option value="Send Letter">Send Letter</option>
                </select>
                {action === 'Reject' && (
                  <input
                    className='inputCoord rejectionInput'
                    type="text"
                    value={rejectionReason}
                    onChange={handleRejectionReasonChange}
                    placeholder="Reason for rejection"
                  />
                )}
                {action === 'Send Letter' && (
                <div className='letterUploadbox'>
                  <label>Upload Transcript PDF:</label>
                  <div className='coordfFormUploadCont'>
                    <input 
                      className='inputCoord letterInput'
                      type="file" 
                      accept=".pdf" 
                      onChange={handleLetterPDFUpload} 
                    />
                    <button 
                      className='coordUploadBtn'
                      onClick={(e) => uploadLetterToStorage(e,letterPDF)}
                    >
                      Upload
                    </button>
                    {letterLoading === null
                      ? 
                      null 
                      : 
                      letterLoading < 100 
                      ? 
                      <LoadingSVG/> 
                      : 
                      letterLoading === 100 
                      ? <CompletedSVG/> 
                      : 
                      null}
                  </div>
                </div>
                )}
              </div>
              <button
                className='coordSubmitBtn'
              type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
}
};

export default InternshipDetailsContainer;
