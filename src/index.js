import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51J2d7AII7lnX9EHgJvQsix3rRxOUTsaTFJARwfMlnO5iU4Aewb7BhPO04kG7IncZsPfBakwx4sXvUnlxSAzsl7lR00uab1UsAY"
);

//This was taken from firebase project initialization

import { FirebaseAppProvider } from "reactfire";

var firebaseConfig = {
  apiKey: "AIzaSyCzNHVY915Nwor7ApUan_78Xvi15Cy42BM",
  authDomain: "learningweb-b5aa6.firebaseapp.com",
  projectId: "learningweb-b5aa6",
  storageBucket: "learningweb-b5aa6.appspot.com",
  messagingSenderId: "516058606118",
  appId: "1:516058606118:web:cae54ada9fa0686fc454e7",
  measurementId: "G-JS5B0Q4KTS",
};

//Also note reactfire down stairs to connect to the frontend for the entire react app by doing
// "npm install reaactfire firebase"

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
