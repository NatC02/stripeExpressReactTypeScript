//This file is ultimately optional

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCzNHVY915Nwor7ApUan_78Xvi15Cy42BM",
  authDomain: "learningweb-b5aa6.firebaseapp.com",
  projectId: "learningweb-b5aa6",
  storageBucket: "learningweb-b5aa6.appspot.com",
  messagingSenderId: "516058606118",
  appId: "1:516058606118:web:cae54ada9fa0686fc454e7",
  measurementId: "G-JS5B0Q4KTS",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
