import React, { useState } from 'react';
import "./index.css";


function ApplicationStart() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [needsLetter, setNeedsLetter] = useState('no');
  const [formPDF, setFormPDF] = useState(null);
  const [transcriptPDF, setTranscriptPDF] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

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
  };

  const handleTranscriptPDFUpload = (e) => {
    const file = e.target.files[0];
    setTranscriptPDF(file);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here
    // You can access the form data in the component's state
    // and perform any necessary actions

    // Example console log for testing
    console.log({
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
            <label>Do you need a letter?</label>
            <select value={needsLetter} onChange={handleNeedsLetterChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {needsLetter === 'no' && (
            <div>
              <label>Upload Form PDF:</label>
              <input type="file" accept=".pdf" onChange={handleFormPDFUpload} />
            </div>
          )}
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
