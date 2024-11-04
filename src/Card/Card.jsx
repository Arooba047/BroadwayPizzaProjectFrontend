import React, { useRef, useEffect, useState } from 'react';
import './Card.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Card({ activeitem }) {
  const activeRef = useRef(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  // Fetch menu items from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/dashboard/menudisplay/')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching menu items: ", error);
      });
  }, []);

  // Scroll to active item
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeitem]);

  // Filtered menu items based on search term
  const filteredMenuItems = menuItems.filter(item =>
    item.menu_name && item.menu_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add to cart functionality
  const addToCart = (item) => {
    const loginState = localStorage.getItem('login_state');

    if (loginState === 'true') {
      const cartItems = JSON.parse(localStorage.getItem('cartitems')) || [];
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.menu_id);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.success('Item added to cart successfully!');
      } else {
        item.quantity = 1;
        cartItems.push(item);
        toast.success('Item added to cart successfully!');
      }

      localStorage.setItem('cartitems', JSON.stringify(cartItems));
    } else {
      toast.error('You need to log in to add items to the cart.');
    }
  };

  return (
    
    <div className='searchbar'>
      <ToastContainer />
      {/* Search input for filtering */}
      <input
        type="text"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3 form-control"
      />

      {/* Render filtered menu items or "No items found" message */}
      <div className='row'>
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((v, i) => (
            <div className="col-3" key={i}>
              <ChildCard value={v} isActive={v.id === activeitem} addToCart={addToCart} />
              
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-3">
            <p>No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}

const ChildCard = React.forwardRef(({ value, isActive, addToCart }, ref) => {
  return (
    <div className={`cardrow my-2 p-2 ${isActive ? 'activecard' : ''}`} ref={ref}>
      <img src={value.menu_image_url} className="card-img rounded-1" alt={value.menu_name} />
      <div className="d-flex justify-content-between my-3">
        <span className="card-text row1textbg">New!</span>
        <span className="row1textbg2">Rs {value.menu_price}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="card-text">{value.menu_name}</p>
        <button
          className="btn btn-warning row1btn d-flex align-items-center rounded-circle"
          onClick={() => addToCart(value)}
        >
          <span>+</span>
        </button>
      </div>
      <p className="row1text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem totam voluptatem quasi.</p>
    </div>
  );
});

export { ChildCard };













