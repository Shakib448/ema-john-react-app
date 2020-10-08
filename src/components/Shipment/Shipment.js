import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = (data) => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      paymentId,
      shipment: shippingData,
      orderTime: new Date(),
    };
    // console.log(orderDetails);
    fetch("https://sleepy-stream-14756.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your Order placed successfully");
        }
      });
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <div className="row">
        <div className={`col-md-6 ${shippingData ? "d-none" : "d-block"}`}>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              defaultValue={loggedInUser.name}
              placeholder="Your name please"
              ref={register({ required: true })}
            />
            {errors.name && <span className="error">Name is required</span>}

            <input
              defaultValue={loggedInUser.email}
              name="email"
              ref={register({ required: true })}
            />
            {errors.name && <span className="error">Email is required</span>}

            <input
              placeholder="Your address"
              name="address"
              ref={register({ required: true })}
            />
            {errors.name && <span className="error">Address is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div className={`col-md-6 ${shippingData ? "d-block" : "d-none"}`}>
          <h1>Please pay for me</h1>
          <ProcessPayment />
        </div>
      </div>
    </>
  );
};

export default Shipment;
