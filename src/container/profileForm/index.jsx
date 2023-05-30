import React, { useState } from 'react';
import './index.css'


const ProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [universityEmail, setUniversityEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const faculties = {
    'Faculty of Communication': ['Cartoon and Animation', 'Journalism'],
    'Faculty of Engineer': ['Chemical Engineering', 'Industrial Engineering', 'Software Engineering'],
    'Faculty of Health': ['Audiology', 'Midwifery'],
  };

  const grades = ['first grade', 'second grade', 'third grade', 'fourth grade'];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process form data here
  };

  return (
    <div className="profile-form-outerContainer">
      <div className='profile-form-mainContainer'> 
        <div className='profile-form-HeaderCont'>
          <h1>Profile</h1>
          <p>Update your personal details here.</p>
        </div>
        <div className='separator'>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="profile-form-first">
            <div className="input-group">
              <label className='labelProfile' htmlFor="username">
                Name:
              </label>
              <input
                className='inputProfile'
                id='username' 
                type="text" 
                placeholder="First Name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label className='labelProfile' htmlFor="lastName">
                Surname:
              </label>
              <input 
                className='inputProfile'
                id='lastName'
                type="text" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label className='labelProfile' htmlFor="faculty">
                Faculty
              </label>
              <select 
                id='faculty'
                value={faculty} 
                onChange={(e) => setFaculty(e.target.value)}
                >
                <option value="">Select Faculty</option>
                {Object.keys(faculties).map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className='labelProfile' htmlFor="department">
                Department
              </label>
              <select 
                id='department'
                value={department} 
                onChange={(e) => setDepartment(e.target.value)}
                >
                <option value="">Select Department</option>
                {faculty &&
                  faculties[faculty].map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input-group">
              <label className='labelProfile' htmlFor="grade">
                Grade
              </label>
              <select 
                id='grade'
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="profile-form-second">
            <div className="input-group">
              <label className='labelProfile' htmlFor="email">
                Email Address
              </label>
              <input 
                className='inputProfile'
                htmlFor='email'
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label className='labelProfile' htmlFor="universityEmail">
                University Email
              </label>
              <input 
                className='inputProfile'
                type="email" 
                placeholder="University Email" 
                value={universityEmail} 
                onChange={(e) => setUniversityEmail(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label className='labelProfile' htmlFor="phoneNumber">
                Phone Number
              </label>
              <input 
                className='inputProfile'
                id='phoneNumber'
                type="tel" 
                placeholder="Phone Number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                />
            </div>
          </div>
          <button className='buttonProfile' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
