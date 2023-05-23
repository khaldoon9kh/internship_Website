import React, { useState } from 'react';
import "./index.css";
import { useNavigate } from 'react-router-dom';


function CoordinatorDashboard() {
  const navigate = useNavigate();

  const internships = [
    {
      id: 1,
      date: '2023-05-10',
      studentNumber: 'A12345',
      department: 'Marketing',
      internshipType: 'Paid',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2023-05-20',
      studentNumber: 'B67890',
      department: 'Engineering',
      internshipType: 'Unpaid',
      status: 'In Progress',
    },
    // Add more internship data as needed
  ];

    // Sort the internships array based on the date in descending order
    internships.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const handleRowClick = (id) => {
      navigate(`/interndetails/${id}`);
    };
  
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
              <tr 
                key={internship.id} 
                onClick={() => handleRowClick(internship.id)}
              >
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
}

export default CoordinatorDashboard;
