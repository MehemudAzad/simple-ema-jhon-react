import React from 'react';
import './Cart.css' ;

const Cart = ({cart,clearCart,children}) => {
    

    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping+ product.shipping;
    }
    let tax = +(total *.1).toFixed(2);//to fixed is a string 
    const grandTotal  =total+ shipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summury</h4> 
            <p>Selected Items: {quantity}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: {tax}</p>
            <h5>Grand Total: {grandTotal.toFixed(2)} </h5>
            <button onClick={clearCart}>Clear Cart</button>
            {children}
        </div>
    );
};

export default Cart;