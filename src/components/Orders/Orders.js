import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const {products, initialCart,} = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = (id) => {
        const remaining = cart?.filter(product => product?.id !== id)//because we are excluding one element
        setCart(remaining);
        removeFromDb(id);
        // console.log(id);
        console.log('hello');
    }
    const clearCart =()=> {
        setCart([]);
        deleteShoppingCart();
    }

    return (
    
        <div>
        <h1>Orders lists</h1>   
        <div className='shop-container'>   
            <div className='orders-container'>
            {
                cart?.map(product => <ReviewItem
                    key={product?.id}
                    product={product}
                    handleRemoveItem = {handleRemoveItem}
                ></ReviewItem>)
            }
            {
                cart.length === 0 && <h2>No items for Review. Please <Link to= "/">Please shop more</Link></h2>
            }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/shipping'>
                        <button>Proceed shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
        </div>          
    );
};

export default Orders;