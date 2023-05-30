import React, { useEffect } from 'react';
import LoadingComp from '../loadingComp';
import { useNavigate } from 'react-router-dom';
import "./index.css";

function LogOut() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('logedIn');
    localStorage.removeItem('userType');
    window.location.reload();
    navigate('/');
  }

  useEffect(() => {
    signOut();
  }, [])

  return (
    <LoadingComp/>
  );
}

export default LogOut;
