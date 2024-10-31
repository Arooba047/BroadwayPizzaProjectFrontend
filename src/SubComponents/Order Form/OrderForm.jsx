import Logo from '../../Logo/Logo';
import Navbar from '../../Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import './OrderForm.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { text } from '@fortawesome/fontawesome-svg-core';

const OrderForm = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      const storedItems = localStorage.getItem('cartitems');
      setCartItems(storedItems ? JSON.parse(storedItems) : []);
    }, []);
  
    
    const totalPrice = cartItems.reduce((acc, item) => acc + item.menu_price * item.quantity, 0);

    const placeOrder = () => {
        toast.info('Order Placed');
        // Optionally clear the cart after placing the order
        setCartItems([]);
        window.location.href = '/'
      };
  

    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-1">
            <Navbar />
          </div>
          <div className="col-11">
            <Logo />
            <ToastContainer />
            <div className="container">
              <div className="d-flex align-items-center flex-column justify-content-center vh-150">
                <div className="col-6">
                  <form className="formbg border shadow p-4" >
                    <h3>Order Details</h3>
                    <div className="form-group">
                      <label htmlFor="uname">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        // value={Name}
                        name="uname"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="uemail">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        // value={email}
                        name="uemail"
                        required
                      />
                    </div>
                      <div className="form-group">
                        <label htmlFor="uphone">Phone:</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Enter phone number"
                        //   value={phone}
                          name="uphone"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="uaddress">Address:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Enter your address"
                        //   value={address}
                          name="uaddress"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="instruction">Order Instruction:</label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="instruction"
                          placeholder="Enter any order instruction"
                        //   value={instruction}
                          name="instruction"
                        />
                      </div>

                    
                      <div className="order-summary">
                      <h3>Order Summary</h3>
                        {cartItems.length > 0 ? (
                            <div>
                            <ul>
                                {cartItems.map((item) => (
                                    <li>
                                    <div className="summary-div">
                                        <div className="item-detail">
                                        <img
                                        src={item.menu_image_url}
                                        alt={item.menu_name}
                                        />
                                        </div>
                                        <div className="item-detail">
                                            <h6>{item.menu_name}</h6>
                                            <h6>Quantity: {item.quantity}</h6>
                                            <h6>Price: {item.menu_price}</h6>
                                        </div>
                                        <div className="item-detail">
                                            <h5>Total: {item.menu_price * item.quantity} Rs</h5>
                                        </div>
                                    </div>
                                    </li>
                                    
                               
                                ))}
                            </ul>
                            <div className="order-total">
                                <h3>Total Price: {totalPrice} Rs</h3>
                            </div>
                            <button type="submit" className="btn btn-warning my-2" onClick={placeOrder}>
                            Place Order
                            </button>
                            </div>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                        </div>
                    
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default OrderForm