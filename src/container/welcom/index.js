import React from 'react';
// import {app} from '../../firebaseConfig';
import { db } from '../../firebaseConfig';
import { collection, getDocs, where, query } from "firebase/firestore"; 

function WelcomePage() {
    // const authToken = localStorage.getItem('authToken');
    // const db = app.firestore();
    const getUserById = async (userId) => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
    getUserById("djFRPDu0OhPwda3yMOdD")

    // if (authToken) {
    //     console.log(authToken)
    //     getUserById("djFRPDu0OhPwda3yMOdD")
    //     // Authentication token exists in localStorage, do something with it
    //   } else {
    //     // Authentication token does not exist in localStorage
    //   }


  return (
    <div>
      <h1>Welcome!</h1>
      <p>You are now logged in.</p>
    </div>
  );
}

export default WelcomePage;
