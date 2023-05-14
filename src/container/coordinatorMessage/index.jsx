import React, { useState } from 'react';
import './index.css'


const coordinatorMessage = () => {
  
  return (
    <div class="email-wrapper">
        <div class="email-sidebar">
          <h2>Inbox</h2>
          <ul class="email-list">
            <li class="email-item">
              <img class="studentPicture" src="https://1.bp.blogspot.com/-hTsp4gkOTCQ/Xf4y5spFhnI/AAAAAAAALxA/9DQCRyPKDQEsrRbnnhRFgm5XtdpaAytpACLcBGAsYHQ/s1600/%25D8%25B5%25D9%2588%25D8%25B1%2B%25D8%25B4%25D8%25AE%25D8%25B5%25D9%258A%25D8%25A9%2B%25D8%25B1%25D8%25AC%25D8%25A7%25D9%2584%2B2020%2B%25285%2529.jpg" alt="Student 1"/>
              <div class="email-info">
                <span class="email-sender">John Doe</span>
                <span class="email-title">Regarding Internship Application</span>
                <span class="email-time">9:00 AM</span>
              </div>
            </li>
            <li class="email-item">
              <img class="studentPicture" src="student2.jpg" alt="Student 2"/>
              <div class="email-info">
                <span class="email-sender">Jane Smith</span>
                <span class="email-title">Regarding Interview Schedule</span>
                <span class="email-time">Yesterday</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="email-content">
          <div class="email-header">
            <img class="studentPicture" src="https://1.bp.blogspot.com/-hTsp4gkOTCQ/Xf4y5spFhnI/AAAAAAAALxA/9DQCRyPKDQEsrRbnnhRFgm5XtdpaAytpACLcBGAsYHQ/s1600/%25D8%25B5%25D9%2588%25D8%25B1%2B%25D8%25B4%25D8%25AE%25D8%25B5%25D9%258A%25D8%25A9%2B%25D8%25B1%25D8%25AC%25D8%25A7%25D9%2584%2B2020%2B%25285%2529.jpg" alt="Student 1"/>
            <div class="email-info">
              <span class="email-sender">John Doe</span>
              <span class="email-title">Regarding Internship Application</span>
              <span class="email-time">9:00 AM</span>
            </div>
          </div>
          <div class="email-body">
            <p>Hello, I am interested in the internship position posted on your website. Can you provide me with more information about the application process?</p>
          </div>
          <button class="email-reply-button">Reply</button>
        </div>
      </div>
      





  );
};

export default coordinatorMessage;
