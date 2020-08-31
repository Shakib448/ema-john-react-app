import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart ,setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);

        setCart(newCart)

        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {

        const saveCart = getDatabaseCart(); // Data base local storage

        const productKeys = Object.keys(saveCart);// Product keys 


        const cartProducts =  productKeys.map(key => {   // Full methodos
            const product = fakeData.find(pd => pd.key === key); //Exact product finder
            product.quantity = saveCart[key];//quantity
            return product;
        });

        setCart(cartProducts);
        
    }, []);

    const thankYou = <img src={happyImage} alt=""/>
    
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map((pd) => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
            }
            {
                orderPlace && thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="add-to-cart">Place Order</button>
                </Cart>
            </div>
        </div>
    )
}

export default Review;
