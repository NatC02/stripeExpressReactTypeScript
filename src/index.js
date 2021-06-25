import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51J2d7AII7lnX9EHgJvQsix3rRxOUTsaTFJARwfMlnO5iU4Aewb7BhPO04kG7IncZsPfBakwx4sXvUnlxSAzsl7lR00uab1UsAY"
);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
