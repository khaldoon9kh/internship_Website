import React, { useState } from 'react';


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
    <form className="profile-form" onSubmit={handleFormSubmit}>
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
        <option value="">Select Faculty</option>
        {Object.keys(faculties).map((faculty) => (
          <option key={faculty} value={faculty}>
            {faculty}
          </option>
        ))}
      </select>
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Select Department</option>
        {faculty &&
          faculties[faculty].map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
      </select>
      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="">Select Grade</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="email" placeholder="University Email" value={universityEmail} onChange={(e) => setUniversityEmail(e.target.value)} />
      <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
