import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styling

const InternshipDetailsContainer = () => {
  const [action, setAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [letterPDF, setLetterPDF] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <div className="internship-details-container">
      <div className='internshipDetailsHeader'>
        <div className='intenrSelectorHeader'>
            <h1>Internship Details:</h1>
        </div>
          <div 
            classname='internSelectorSeparator'
            style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
          >
        </div>
      </div>
      <div className="internMain-container">
        <div className="container-internship-detail">
          <div className="internship-detail">
            <div className="detail-label">Application Date:</div>
            <div className="detail-value">May 15, 2023</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Application Status:</div>
            <div className="detail-value">Completed</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Student Number:</div>
            <div className="detail-value">A12345</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Student Name:</div>
            <div className="detail-value">John Doe</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Department:</div>
            <div className="detail-value">Marketing</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Internship Type:</div>
            <div className="detail-value">Paid</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Company Name:</div>
            <div className="detail-value">ABC Corporation</div>
          </div>
          <div className="internship-detail">
            <div className="detail-label">Position:</div>
            <div className="detail-value">Marketing Intern</div>
          </div>
          </div>
          <div className="internBottomDetCont">
            <div className="attachedDocCont">
              <div className="detail-label">Attached Documents:</div>
              <div className="detail-value">
                <a href="/path/to/document1.pdf" download>Document 1</a>
                <a href="/path/to/document2.pdf" download>Document 2</a>
              </div>
            </div>
            <div className="actionRequiredCont">
              <label>Action Required:</label>
              <select value={action} onChange={handleActionChange}>
                <option value="">Select Action</option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
                <option value="Send Letter">Send Letter</option>
              </select>
              {action === 'Reject' && (
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={handleRejectionReasonChange}
                  placeholder="Reason for rejection"
                />
              )}
              {action === 'Send Letter' && (
                <input type="file" accept=".pdf" onChange={handleLetterPDFUpload} />
              )}
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsContainer;
