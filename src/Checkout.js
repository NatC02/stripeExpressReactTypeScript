import React, { useState } from "react";
import { fetchFromAPI } from "./helpers";
import { useStripe } from "@stripe/react-stripe-js";

/*

summary of what is happening

Using state to change the requirement of what the user 

*/
export function Checkout() {
  const stripe = useStripe();

  const [product, setProduct] = useState({
    name: "Basic Shoes",
    description: "A pair of shoes that will magically fit any size! wohooo!",
    images: [
      "https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    amount: 2299,
    currency: "usd",
    quantity: 0,
  });

  const changeQuantity = (v) =>
    setProduct({ ...product, quantity: Math.max(0, product.quantity + v) });
  //calcs next quantity based on the next value

  //Did no decide to use axios instead used native fetch api
  const handleClick = async (event) => {
    const body = { line_items: [product] };
    const { id: sessionId } = await fetchFromAPI("checkouts", {
      body,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Stripe Checkout</h2>
      <p>
        Shopping-cart example scenario. Change the quantity of the products below, then
        click checkout to open the Stripe Checkout window.
      </p>

      <div className="product">
        <h3>{product.name}</h3>
        <h4>Stripe Amount: {product.amount}</h4>

        <img src={product.images[0]} width="250px" alt="product" />

        <button
          className="btn btn-sm btn-warning"
          onClick={() => changeQuantity(-1)}
        >
          -
        </button>
        <span style={{ margin: "20px", fontSize: "2em" }}>
          {product.quantity}
        </span>
        <button
          className="btn btn-sm btn-success"
          onClick={() => changeQuantity(1)}
        >
          +
        </button>
      </div>

      <hr />

      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={product.quantity < 1}
      >
        Start Checkout
      </button>
    </>
  );
}

export function CheckoutSuccess() {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get("session_id");
  return <h3>Checkout was a Success! {sessionId}</h3>;
}

export function CheckoutFail() {
  return <h3>Checkout unfortunately failed!</h3>;
}
