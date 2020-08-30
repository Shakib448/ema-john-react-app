import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {

    const [cart ,setCart] = useState([]);

    useEffect(() => {

        const saveCart = getDatabaseCart(); // Data base local storage

        const productKeys = Object.keys(saveCart);// Product keys 


        const cartProducts =  productKeys.map(key => {   // Full methodos
            const product = fakeData.find(pd => pd.key === key); //Exact product finder
            product.quantity = saveCart[key];//quantity
            return product;
        });

        setCart(cartProducts);
        
    }, [])
    return (
        <div>
            <h1>Cart Items : {cart.length}</h1>
            {
                cart.map((pd) => <ReviewItem key={pd.key} product={pd}></ReviewItem>)
            }
        </div>
    )
}

export default Review;
