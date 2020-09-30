import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);

    setCart(newCart);

    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const saveCart = getDatabaseCart(); // Data base local storage

    const productKeys = Object.keys(saveCart); // Product keys

    fetch("http://localhost:5000/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const thankYou = <img src={happyImage} alt="" />;

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
        {orderPlace && thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="add-to-cart">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
