import React, { useRef, useEffect } from 'react';
import './Card.css';
import { fooditems } from '../Dummydata/Dummydata';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';



// need to add CRUD Operations in menu card
export default function Card({ activeitem }) {
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeitem]);

  const addToCart = (item) => {

    const loginState = localStorage.getItem('login_state');

    if(loginState === 'true'){
           // Fetch existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartitems')) || [];
    
    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      // Increase quantity if the item already exists in the cart
      existingItem.quantity += 1;
      toast.success('item added to cart successfully!'); // Notification for increased quantity
    } else {
      // Add new item to the cart with initial quantity of 1
      item.quantity = 1;
      cartItems.push(item);
      toast.success('item added to cart successfully!'); // Notification for new item added
    }
    
    // Save updated cart items back to localStorage
    localStorage.setItem('cartitems', JSON.stringify(cartItems));
    }
    else {
      
      toast.error('You need to log in to add items to the cart.');
    }
      
   
    
    
  };
// Need to add add menu card button
  return (
    <div className='row'>
      {fooditems.map((v, i) => {
        return (
          <div className="col-3" key={i}>
            <ChildCard value={v} isActive={v.id === activeitem} addToCart={addToCart} />
            <ToastContainer />
          </div>
        );
      })}
    </div>
  );
}

const ChildCard = React.forwardRef(({ value, isActive, addToCart }, ref) => {
  return (
    
    <div className={`cardrow my-2 p-2 ${isActive ? 'activecard' : ''}`} ref={ref}>
      <img src={value.image} className="card-img rounded-1" alt={value.name} />
      <div className="d-flex justify-content-between my-3">
        <span className="card-text row1textbg">New!</span>
        <span className="row1textbg2">Rs {value.price}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="card-text">{value.name}</p>
        <button 
          className="btn btn-warning row1btn d-flex align-items-center rounded-circle"
          onClick={() => addToCart(value)} // Call addToCart when button is clicked
        >
          <span>+</span>
        </button>
      </div>
      <p className="row1text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem totam voluptatem quasi.</p>
      {/* Need to add remove and edit button */}
    </div>
  );
});

export { ChildCard };



// import React, { useRef, useEffect } from 'react';
// import './Card.css';
// import { fooditems } from '../Dummydata/Dummydata';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // Import toast for notifications

// export default function Card({ activeitem }) {
//   const activeRef = useRef(null);

//   useEffect(() => {
//     if (activeRef.current) {
//       activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   }, [activeitem]);

//   return (
//     <>
//       <div className='row'>
//         {fooditems.map((v, i) => {
//           return (
//             <div className="col-3" key={i}>
//               <ChildCard value={v} isActive={v.id === activeitem} ref={v.id === activeitem ? activeRef : null} />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
// const ChildCard = React.forwardRef(({ value, isActive, addToCart }, ref) => {
//   return (
//     <div className={`cardrow my-2 p-2 ${isActive ? 'activecard' : ''}`} ref={ref}>
//       <img src={value.image} className="card-img rounded-1" alt={value.name} />
//       <div className="d-flex justify-content-between my-3">
//         <span className="card-text row1textbg">New!</span>
//         <span className="row1textbg2">Rs {value.price}</span>
//       </div>
//       <div className="d-flex justify-content-between align-items-center">
//         <p className="card-text">{value.name}</p>
//         <button 
//           className="btn btn-warning row1btn d-flex align-items-center rounded-circle"
//           onClick={() => addToCart(value)} // Call addToCart when button is clicked
//         >
//           <span>+</span>
//         </button>
//       </div>
//       <p className="row1text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem totam voluptatem quasi.</p>
//     </div>
//   );
// });

// export { ChildCard };




