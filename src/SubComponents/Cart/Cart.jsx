import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Cart.css';
import Logo from '../../Logo/Logo';
import Navbar from '../../Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';

export default function Cart() {
  const [cartitems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartitems');
    return storedItems ? JSON.parse(storedItems) : [];
  });



  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems)); // Update localStorage whenever cartitems changes
  }, [cartitems]);




  const removeItem = (itemId) => {
    const updatedCartItems = cartitems.filter((v) => v.menu_id !== itemId);
    setCartItems(updatedCartItems);
    toast.error('Item removed from cart');
  };

  const updateQuantity = (itemId, action) => {
    const updatedCartItems = cartitems.map((item) => {
      if (item.menu_id === itemId) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from going below 1
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartitems.reduce((acc, curr) => acc + curr.menu_price * curr.quantity, 0); // Calculate total price






  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1">
            <Navbar />
          </div>
          <div className="col-11">
            <Logo />
            <ToastContainer />
            <div className="container">
              <div className='row d-flex'>
                {cartitems.length > 0 ? (
                  cartitems.map((item, index) => (
                    <div key={index} className="col-lg-4 my-2 p-4 shadow">
                      <div className="d-flex flex-column">
                        <h5>{item.menu_name}</h5>
                        <img
                          src={item.menu_image_url}
                          className="img-fluid cartimg my-2"
                          alt={item.name}
                        />
                        <p className='text-center'><strong>{item.menu_price} Rs</strong></p>
                        <p className='text-center'>Quantity: {item.quantity}</p>
                        <div className="d-flex justify-content-between">
                          <button className='btn btn-warning cartbtn' onClick={() => updateQuantity(item.menu_id, 'decrease')}>-</button>
                          <button className='btn btn-warning cartbtn' onClick={() => updateQuantity(item.menu_id, 'increase')}>+</button>
                          <button className='btn btn-danger cartbtnrmv' onClick={() => removeItem(item.menu_id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4>Your Cart is empty</h4>
                )}
              </div>
            </div>
            {cartitems.length > 0 && (
              <div className="d-flex justify-content-center flex-column align-items-center">
                <div className='my-2'>Total Price: {totalPrice} Rs</div>
                <Link to={'/orderform'}><button className='btn btn-warning my-2' >Checkout</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}







