import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock ,key} = props.product;

    return (
        <div className="product">
            <br/>
            <div className="">
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br/>
                <p>
                    <small>by :{seller}
                    </small>
                </p>
                <p>
                    <small>$ :{price}
                    </small>
                </p>
                <p>
                    <small>Only {stock}
                        left in stock order soon
                    </small>
                </p>
                
                <button className="add-to-cart" onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>
            </div>
        </div>
    )
}

export default Product;
