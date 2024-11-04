// import React, { useRef, useEffect, useState } from 'react';
// import './Button.css';
// import axios from 'axios';
// function Button() {
//   const [menuItems, setMenuItems] = useState([]);

//     useEffect(() =>{
//       axios.get('http://127.0.0.1:8000/dashboard/menudisplay/')
//       .then(response => {
//         console.log(response.data);
//         setMenuItems(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching menu items: ",error);
//       });
//     }, []);

//   const [searchTerm, setSearchTerm] = useState(""); // Filter/search term

//   // Filter the menu items based on search term
//   const filteredMenuItems = menuItems.filter(item =>
//     item.menu_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h1>Menu</h1>
//       {/* Search input for filtering */}
//       <input
//         type="text"
//         placeholder="Search menu..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
      
//       {/* Display filtered menu items */}
//       <ul>
//         {filteredMenuItems.map(item => (
//           <li key={item.menu_id}>{item.menu_name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Button;

// export default function Button({showactiveitem}) {

//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() =>{
//     axios.get('http://127.0.0.1:8000/dashboard/menudisplay/')
//     .then(response => {
//       console.log(response.data);
//       setMenuItems(response.data);
//     })
//     .catch(error => {
//       console.error("Error fetching menu items: ",error);
//     });
//   }, []);


//   function handlebtnclick(menu_id){
//     showactiveitem(menu_id)
//   }

//   const btnRef=useRef(null)
//   function handlePrevious(){
//     if(btnRef.current){
//       btnRef.current.scrollBy({left: -200, behavior : 'smooth'})
//     }
//   }
//   function handleNext(){
//     if(btnRef.current){
//       btnRef.current.scrollBy({left: 200, behavior : 'smooth'})
//     }
//   }
  
//   return (
//     <>
//     <div className="sticky-buttons">
//       <div className="container-fluid my-2 d-flex">
//            <button className='btn prevbtn' onClick={handlePrevious}>&lt;</button>
//         <div className="row no-gutters button-row" ref={btnRef}>
//           {menuItems.map((v, i) => (
//             <div key={v.menu_id} className="col-auto">
//             <ButtonChild value={v} key={i} handlebtnclick={handlebtnclick} />
//                       </div>

//           ))}
//         </div>
//         <button className='btn nextbtn' onClick={handleNext}>&gt;</button>
//       </div>
//     </div>
//     </>
//   );
// }

// function ButtonChild({ value,handlebtnclick }) {

  

//   return (
//     <div className="col-auto">
//       <button className="btn btn-warning btn-border-dark shadow"onClick={()=>{handlebtnclick(value.menu_id)}} >{value.menu_name}</button>
//     </div>
//   );
// }

// export { ButtonChild };
