// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbeDq8am0R0u-3MqNNyILnFVrfKJV2SzA",
  authDomain: "internshipsys-60f4d.firebaseapp.com",
  projectId: "internshipsys-60f4d",
  storageBucket: "internshipsys-60f4d.appspot.com",
  messagingSenderId: "229552298692",
  appId: "1:229552298692:web:e3d0c926e0c45c5ee20791",
  measurementId: "G-BW9Q3CYX7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db};

