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
      <form>
        
        <input type="email" id="from" name="from" placeholder='From:'/>
        <input type="email" id="to" name="to"  placeholder='To:' required/>
        <input type="text" id="subject" name="subject" placeholder='Subject:' required/>

        <label for="body">Message:</label>
        <textarea id="body" name="body" rows="10" required></textarea>

        <fieldset>
          <legend>Attachments:</legend>
          <input type="file" id="attachment" name="attachment[]" multiple/>
        </fieldset>

        <button type="submit">Send</button>
      </form>
   </div>
  );
};

export default AnnouncPage;
