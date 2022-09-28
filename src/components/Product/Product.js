import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './Product.css';

const Product = ({handleAddToCart, product}) => {
    // const {handleAddToCart, product} = props;
    const {name, img, seller, ratings, price}= product;
    
    return (
        <div className='product'>
           <img src={img} alt="hello this is a picturer " />
           <article>
           <h1>{name}</h1>
            <h3>Price: ${price}</h3>
            <p>Manufacturer: {seller}</p>
            <p>Rating: {ratings} star</p>
           </article>
            <button onClick={()=>handleAddToCart(product)}><p className='btn-text'>Add to Cart </p> 
             <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></button>
        </div>
    );
};

export default Product;