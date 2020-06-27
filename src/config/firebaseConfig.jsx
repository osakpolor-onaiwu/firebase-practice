import firebase from 'firebase/app';
import 'firebase/firestore';
// this helps us with data base
import 'firebase/auth'
// this is for authentication


 var firebaseConfig = {
    apiKey: "AIzaSyBZi0XIu9Yb4_rmX26WCWsWxO54y3KSs04",
    authDomain: "react-firebase-33dfa.firebaseapp.com",
    databaseURL: "https://react-firebase-33dfa.firebaseio.com",
    projectId: "react-firebase-33dfa",
    storageBucket: "react-firebase-33dfa.appspot.com",
    messagingSenderId: "437249712503",
    appId: "1:437249712503:web:98120d88fcd90f094e8172",
    measurementId: "G-LZW4FG2J2F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  export default firebase

 
// note we copied most things here from firebase site when we created 
// our project there except the last two lines and the imports statement