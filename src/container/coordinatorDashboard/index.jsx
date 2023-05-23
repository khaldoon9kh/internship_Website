import React, { useState } from 'react';
import "./index.css";


function CoordinatorDashboard() {

  const internships = [
    {
      date: '2023-05-15',
      studentNumber: 'A12345',
      department: 'Marketing',
      internshipType: 'Paid',
      status: 'Completed',
    },
    {
      date: '2023-05-20',
      studentNumber: 'B67890',
      department: 'Engineering',
      internshipType: 'Unpaid',
      status: 'In Progress',
    },
    // Add more internship data as needed
  ];
  
  return(
    <div className='outerContainer-coordinator-dashboeard'>
      <div className='header-Main-coordinator-dashboeard'>
        <div className='header-coordinator'>
          <h1>List of Internships</h1>
        </div>
        <div 
          classname='coordinatorSelectorSeparator'
          style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
        >
        </div>
      </div>
      <div className="internship-list-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student Number</th>
              <th>Department</th>
              <th>Internship Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship, index) => (
              <tr key={index}>
                <td>{internship.date}</td>
                <td>{internship.studentNumber}</td>
                <td>{internship.department}</td>
                <td>{internship.internshipType}</td>
                <td>{internship.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>  
  )
  // <div className='coordinator-dashboeard-mainContainer'>
  //       <h2>Internship applications</h2>

  //       <div  className='coordinator-dashboeard-internshipCells'>
  //         <div class="flex-container1">
  //           <div className='internshipInfo'>
  //             <h4 className='internship-name'>Software Internship</h4>
  //             <h6 className='internship-dateSent'>date sent 
  //               <time className='dateTime' datetime="DD-MM-YY"> 4/3/23</time>
  //             </h6>
  //           </div>
  //           <div className='file-download-icon'>
  //             <button>D</button>
  //           </div>
  //           <div class = "vertical-line" className='vertical-line'>
  //             {/* VErtival Line */}
  //           </div>
  //           <div className='intern-info'>
  //             <h4>Internship  application coming from  :  </h4> 
  //             <h3 className='intern-name'>Ameer AbuGharbiah</h3>
  //           </div>
  //           <div className='sgk-button-container'>
  //             <button className='sgk-button'>Issue SGK </button>
  //           </div>
  //         </div>
          
  //       </div>
  //       <div className='coordinator-dashboeard-internshipCells'> 
  //       </div>
      
  //       <div className='coordinator-dashboeard-internshipCells'></div>
  //       <div className='coordinator-dashboeard-internshipCells'></div>
     
  //    </div>
}

export default CoordinatorDashboard;
