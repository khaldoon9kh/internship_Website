import React, { useEffect } from 'react';
import LoadingComp from '../loadingComp';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import "./index.css";

function LogOut() {
  const navigate = useNavigate();

  // const auth = getAuth();

  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('logedIn');
    localStorage.removeItem('userType');
    // signOut(auth).then(() => {
    //   console.log("signed out");
    //   // Sign-out successful.
    // }).catch((error) => {
    //   console.log(error)  // An error happened.
    // });
    window.location.reload();
    navigate('/');
  }

  signOut();


  return (
    <LoadingComp/>
  );
}

export default LogOut;
