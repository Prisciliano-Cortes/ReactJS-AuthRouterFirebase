import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDMn3wup3gG5otWd6-awuUazFMxLfTl3No",
    authDomain: "react-firebase-27cdb.firebaseapp.com",
    databaseURL: 'https://react-firebase-27cdb.firebaseio.com',
    projectId: "react-firebase-27cdb",
    storageBucket: "react-firebase-27cdb.appspot.com",
    messagingSenderId: "262694753495",
    appId: "1:262694753495:web:a69d8e2a055c0ad2970c92"
  };
  
  // Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = app.auth();

export { db, auth }