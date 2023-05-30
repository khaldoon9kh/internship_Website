import React, { useState } from 'react';
import './index.css'; // Import the CSS file

function NotificationSend() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the announcement submission logic here
    // You can send the title and body to an API, update the database, etc.
    console.log('Announcement submitted:', title, body);

    // Clear the input fields after submission
    setTitle('');
    setBody('');
  };

  return (
    <div className="announcement-form-container">
      <h1 className="form-title">Create Announcement</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Announcement Title:</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body" className="form-label">Announcement Body:</label>
          <textarea
            id="body"
            className="form-textarea"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
        </div>
        <button type="submit" className="form-submit-button">Post Announcement</button>
      </form>
    </div>
  );
}

export default NotificationSend;
