import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';


const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className="product">
            <br/>
            <div className="">
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by :{seller} </small></p>
                <p><small>$ :{price} </small></p>
                <p><small>Only {stock} left in stock order soon </small></p>
                <button className="add-to-cart"> <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>
    )
}

export default Product;
