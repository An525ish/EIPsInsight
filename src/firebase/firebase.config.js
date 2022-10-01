/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA7uLSYK42tpM0KSD8o79Sd9X_2WfRz5mQ',
  authDomain: 'eip-project-bc348.firebaseapp.com',
  projectId: 'eip-project-bc348',
  storageBucket: 'eip-project-bc348.appspot.com',
  messagingSenderId: '567477140220',
  appId: '1:567477140220:web:d94a3a972e8cdffa4f3579',
  measurementId: 'G-NQM919DXVS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app

// const provider = new GoogleAuthProvider()

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//
//     })
//     .catch((err) => {
//
//     })
// }
