import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitForm from "./SplitForm";

const stripePromise = loadStripe(
  "pk_test_51HZrZoASRJydd9konZNtAoNFNfQSJttzAyouQzbGmwuq0mTl6l2c9B4Bw2X0ZnB146zEd5WTLSlC1jfaFRS9X7Ic00MSR4xE3i"
);

const ProcessPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm />
    </Elements>
  );
};

export default ProcessPayment;
