import React, { useState } from 'react';
import './index.css'


const AnnouncPage = () => {


  return (
   <div class="container">
       <header>
    <h1>Gmail</h1>
  </header>
  <main>
    <aside>
      <nav>
        <ul>
          <li><a href="#">Inbox</a></li>
          <li><a href="#">Sent Mail</a></li>
          <li><a href="#">Drafts</a></li>
          <li><a href="#">Trash</a></li>
        </ul>
      </nav>
      <button>Compose</button>
    </aside>
    <section>
      <h2>Add Announcement</h2>
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
    </section>
  </main>
   </div>
  );
};

export default AnnouncPage;
