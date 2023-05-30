import React, { useState } from 'react';
import './index.css'


const AnnouncPage = () => {

//
  return (
   <div class="announceContainer">
    <div className='announcHeaderCont'>
      <h1>Add Announcement</h1>
      <h3>Update your Announcement here.</h3> 
    </div>
      <form className='announcForm'>
        {/* <input type="email" id="from" name="from" placeholder='From:'/> */}
        <input className='announcInput' type="email" id="to" name="to"  placeholder='To:' required/>
        <input className='announcInput' type="text" id="subject" name="subject" placeholder='Subject:' required/>

        <label className='announcLabel' for="body">Message:</label>
        <textarea className='announcInput' id="body" name="body" rows="10" required></textarea>

        <fieldset>
          <legend>Attachments:</legend>
          <input className='announcInput' type="file" id="attachment" name="attachment[]" multiple/>
        </fieldset>

        <button className='announcButton' type="submit">Send</button>
      </form>
   </div>
  );
};

export default AnnouncPage;
