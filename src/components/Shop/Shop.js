import React from 'react';
import { useEffect, useState } from 'react';
import { addToDb, getStoreCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart]= useState([]);

    const handleAddToCart = (selectedProduct)=>{
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1 ;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct.id);
    }
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data));
        console.log('products loaded')
    },[]) //it is not necessary that js will work as a syncronous function js can also work as a syncronous function so therefore we set a dependency product so that if it changes the  value useEffect will be called again.

    useEffect(()=>{
        console.log('local storage first line');
        const storedCart = getStoreCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id ===id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                // console.log(addedProduct)
            }
            // console.log(id)
        }
        setCart(savedCart);
    }, [products])

    return (
        <div className='shop-container'>
            <div className="products-container">
               {
                products.map(product=> <Product
                    key= {product.id}
                    product={product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
               }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;