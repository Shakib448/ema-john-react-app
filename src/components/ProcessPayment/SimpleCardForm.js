import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const SimpleCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [payError, setPayError] = useState(null);
  const [paySuccess, setPaySuccess] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPayError(error.message);
      setPaySuccess(null);
    } else {
      setPaySuccess(paymentMethod.id);
      setPayError(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {payError && <p style={{ color: "red" }}>{payError}</p>}
      {paySuccess && (
        <p style={{ color: "green" }}>Your Payment was successful</p>
      )}
    </div>
  );
};

export default SimpleCardForm;
