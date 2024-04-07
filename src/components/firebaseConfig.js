// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrruN1_X17p-EPtNWrvPHuqC-Cwr6tz4Q",
  authDomain: "my-mini-project-dfdbd.firebaseapp.com",
  projectId: "my-mini-project-dfdbd",
  storageBucket: "my-mini-project-dfdbd.appspot.com",
  messagingSenderId: "358964398678",
  appId: "1:358964398678:web:00b12516876c21745089f7",
  measurementId: "G-HFZ4EDPJ8G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth()
