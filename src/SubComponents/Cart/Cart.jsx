import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Cart.css';
import { fooditems } from '../../Dummydata/Dummydata';
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
    const updatedCartItems = cartitems.filter((v) => v.id !== itemId);
    setCartItems(updatedCartItems);
    toast.error('Item removed from cart');
  };

  const updateQuantity = (itemId, action) => {
    const updatedCartItems = cartitems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from going below 1
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartitems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0); // Calculate total price

  const placeOrder = () => {
    toast.info('Order Placed');
    // Optionally clear the cart after placing the order
    setCartItems([]);


    // const loginState = localStorage.getItem('login_state');
    // if(loginState == 'false'){
    //   setCartItems();
    // }
      
  };




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
                        <h5>{item.name}</h5>
                        <img
                          src={item.image}
                          className="img-fluid cartimg my-2"
                          alt={item.name}
                        />
                        <p className='text-center'><strong>{item.price} Rs</strong></p>
                        <p className='text-center'>Quantity: {item.quantity}</p>
                        <div className="d-flex justify-content-between">
                          <button className='btn btn-warning cartbtn' onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                          <button className='btn btn-warning cartbtn' onClick={() => updateQuantity(item.id, 'increase')}>+</button>
                          <button className='btn btn-danger cartbtnrmv' onClick={() => removeItem(item.id)}>Remove</button>
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
                <button className='btn btn-warning my-2' onClick={placeOrder}>Place Your Order</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}







// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Cart.css'
// import { fooditems } from '../../Dummydata/Dummydata';
// import Logo from '../../Logo/Logo';
// import Navbar from '../../Navbar/Navbar';
// import { toast, ToastContainer } from 'react-toastify';

// export default function Cart() {
//   const [price, showprice]= useState('')
//   const [cartitems, setCartItems] = useState(() => {
//     const storedItems = localStorage.getItem('cartitems');
//     return storedItems ? JSON.parse(storedItems) : [];
//   });

//   let location = useLocation().pathname.split('/')[2];
//   let currentdata = fooditems.find((v) => v.id === parseInt(location));

//   useEffect(() => {
//     if (currentdata) {
//       const updatedCartItems = [...cartitems, currentdata];

//       setCartItems(updatedCartItems);
//       localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
//     }
//   }, [currentdata]);

//   console.log('Current Cart:', cartitems);
//   const btnRef = useRef(null)

//   function removeItem(itemId){
//     const updatedCartItems= cartitems.filter((v)=>v.id!==itemId)
//     setCartItems(updatedCartItems)
//     localStorage.setItem('cartitems', JSON.stringify(updatedCartItems))
//   }
//   function placeOrder(){
    
//         toast.info('Order Placed')
    
//     // let order=cartitems.map((item) => item.price)
//     const totalPrice = cartitems.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
//     showprice(totalPrice)
//   }

//   return (
//     <>

//       <div className="container-fluid">
//       <div className="row">
//         <div className="col-1">
//           <Navbar/>
//         </div>
//         <div className="col-11">
//         <Logo/>
        
//       <ToastContainer/>
//       <div className="container">
//           <div className='row d-flex'>
            
//             {cartitems.length > 0 ? (
//               cartitems.map((item, index) => (
                
//                 <div className="col-lg-4 my-2 p-4 shadow ">
//                 <div key={index} className="d-flex flex-column ">
//                   <h5>{item.name}</h5>
//                   <img
//                     src={item.image}
//                     className="img-fluid cartimg my-2"
//                     alt={item.name}
//                   />
//                   <p className='text-center'><strong>{item.price} Rs</strong></p>
//                   <div className="d-flex gapbtn">
//                   <button className='btn btn-warning cartbtn' onClick={()=>{removeItem(item.id)}}>-</button>
//                   <Link to='/'> <button className='btn btn-warning cartbtn' onClick={()=>{removeItem(item.id)}}>+</button></Link>
//                   </div>
//                   </div>
//                 </div>                
                
//               ))
//             ) : (
//               <h4>Your Cart is empty</h4>
//             )}
//             </div>
//           </div>
//             { cartitems.length>0 &&
//           <div className="d-flex justify-content-center flex-column align-items-center">
//           <div className='my-2'>Total price are: {price}</div>
//            <button className='btn btn-warning my-2' ref={btnRef} onClick={placeOrder}> Place Your Order</button>
//           </div>
          

//         }
//         </div>
//         </div>
//         </div>
//     </>
//   );
// }
