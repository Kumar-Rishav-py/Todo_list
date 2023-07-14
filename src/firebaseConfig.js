import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'; 

const firebaseConfig = {
    apiKey: "AIzaSyAbkh9doNl_Wgwo_h7WFDj4ZmaHxcG6p8M",
  authDomain: "notes-taking-88737.firebaseapp.com",
  databaseURL: "https://notes-taking-88737-default-rtdb.firebaseio.com",
  projectId: "notes-taking-88737",
  storageBucket: "notes-taking-88737.appspot.com",
  messagingSenderId: "247299191099",
  appId: "1:247299191099:web:bdee9e516bdf4328d4071e",
  measurementId: "G-VHN3QXTP57"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database(); 

export default firebase;

