import React, { useState,useEffect } from 'react';
import "./index.css";
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import LoadingComp from '../loadingComp';



function CoordinatorDashboard() {
  const [internsData, setInternsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInternsDetails = async () => {
    const interns = [];
    try 
    {
      const querySnapshot = await getDocs(collection(db, "internships"));
      
      querySnapshot.forEach((doc) => {
        interns.push({ id: doc.id, ...doc.data() });
      });
      // console.log(interns)
      setInternsData(interns);
      // console.log(querySnapshot.data())
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
    } catch (e) 
    {
      console.log("Error getting document:", e);
    }
    if (interns) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternsDetails();
  }, []);

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
    
    const handleRowClick = (id,internType) => {
      navigate(`/interndetails/${id}/${internType}`);
    };

  if (loading) {
    return (
      <LoadingComp/>
    )
  }else{
    console.log(internsData)
  return(
    <div className='outerContainer-coordinator-dashboeard'>
      <div className='header-Main-coordinator-dashboeard'>
        <div className='header-coordinator'>
          <h1>List of Internships</h1>
        </div>
        <div 
          className='coordinatorSelectorSeparator'
          style={{display:"flex", backgroundColor: "#C8D8D7",height: "5px"}}
        >
        </div>
      </div>
      <div className="internship-list-container">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Student Number</th>
              <th>Department</th>
              <th>Internship Type</th>
            </tr>
          </thead>
          <tbody>
          {internsData.map((internship, index) => (
            <React.Fragment key={internship.id}>
              {/* Render intern1 */}
              {internship.intern1 
                ?
                <tr onClick={() => handleRowClick(internship.id,"intern1")}>
                  <td>{internship.intern1.status}</td>
                  <td>{internship.intern1.date}</td>
                  <td>{internship.stNum}</td>
                  <td>{internship.department}</td>
                  <td>Summer Practice 1</td>
                </tr>
              :
              null
              }
              {/* Render intern2 */}
              {internship.intern2    
                ?
                <tr onClick={() => handleRowClick(internship.id,"intern2")}>
                  <td>{internship.intern2.status}</td>
                  <td>{internship.intern2.date}</td>
                  <td>{internship.stNum}</td>
                  <td>{internship.department}</td>
                  <td>Summer Practice 2</td>
                </tr>
                :
                null
              }
              
            </React.Fragment>
          )
          )
          }
          </tbody>
        </table>
      </div>
    </div>  
  )
  } 
}

export default CoordinatorDashboard;
