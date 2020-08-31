import React, {useState, useEffect} from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);

    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product]; // This product pass by clicked parameter
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    } 
    return (
        <div className="twin-container">
            <div className="product-container">
                    {
                    products.map((product) => <Product product={product} key={product.key} showAddToCart={true} handleAddProduct = { handleAddProduct }></Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    )
}

export default Shop;
