import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdata from '../Userdata/Userdata';
import Logo from '../../Logo/Logo';
import Navbar from '../../Navbar/Navbar';


const LoginOrRegister = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Define the data payload for both login and registration
    const userData = {
      email,
      phone,
      password,
    };

    try {
      if (isRegistering) {
        // Handle Registration
        const response = await axios.post('http://127.0.0.1:8000/api/register/', userData);
        toast.success('Registration successful!');
        console.log(response.data);
        
      } else {
        // Handle Login
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
          email,
          password,
        });
        localStorage.setItem('access_token', response.data.access);
        toast.success('Login successful!');
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('login_state', 'true'); 
        console.log(response.data);
        window.location.href = '/'
        
        
      }
    } catch (error) {
      console.error('Error:', error.response);
      setError('An error occurred during the process. Please try again.');
    }
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
            <div className="d-flex align-items-center flex-column justify-content-center vh-100">
              <div className="col-6">
                <form className="formbg border shadow p-4" onSubmit={handleSubmit}>
                  <h3>{isRegistering ? 'User Registration' : 'User Login Account'}</h3>
                  <div className="form-group">
                    <label htmlFor="uemail">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      name="uemail"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {isRegistering && (
                    <div className="form-group">
                      <label htmlFor="uphone">Phone:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        value={phone}
                        name="uphone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="upassword">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      name="upassword"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-warning my-2">
                    {isRegistering ? 'Register' : 'Login'}
                  </button>
                  <p>
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setIsRegistering(!isRegistering)}
                    >
                      {isRegistering ? 'Login here' : 'Register here'}
                    </button>
                  </p>
                  {error && <p>{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:8000/api/login/', {
//         email,
//         phone,
//         password,
//       });
//       // Save JWT tokens in local storage
//       localStorage.setItem('access_token', response.data.access);
//       localStorage.setItem('refresh_token', response.data.refresh);
      
//       // Redirect or perform other actions
//       console.log('Login successful!');
//     } catch (error) {
//       setError('Invalid login credentials');
//     }
//   };
//   return (
//     <>
//     <div className="container-fluid">
//     <div className="row">
//     <div className="col-1" >
//     <Navbar />
//     </div>
//     <div className="col-11">
//     <Logo/>
//       <ToastContainer />
//       <div className="container">
//         <div className="d-flex align-items-center flex-column justify-content-center vh-100">
//           <div className="col-6">
//             <form className='formbg border shadow p-4' onSubmit={handleSubmit}>
//               <h3>'User Login Account'</h3>
//               <div className="form-group">
//                 <label htmlFor="uemail">Email:</label>
//                 <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} name="uemail" oonChange={(e) => setEmail(e.target.value)} required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="uphone">Phone:</label>
//                 <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" value={phone} name="uphone"   onChange={(e) => setPhone(e.target.value)} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="upassword">Password:</label>
//                 <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} name="upassword" onChange={(e) => setPassword(e.target.value)} />
//               </div>
//               <button type="submit" className="btn btn-warning my-2">Submit</button>
//               {error && <p>{error}</p>}
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* <div className="container">
//         {
//           userdata.length >= 1 ? 
//             userdata.map((v, i) => {
//               return (
//                 <Userdata 
//                   key={i} 
//                   uemail={v.uemail} 
//                   uphone={v.uphone} 
//                   upassword={v.upassword} 
//                   updaterow={() => updaterow(i)} 
//                   deleterow={() => deleterow(i)} 
//                 />
//               );
//             })
//           :
//           'No data found'
//         }
//       </div> */}
//       </div>
//       </div>
//       </div>
//     </>
//   );
// }
// export default Login;


const token = localStorage.getItem('access_token');

axios.get('http://localhost:8000/api/protected/', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching protected resource', error);
});




// import React, { useState } from 'react'
// import './Form.css'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// export default function Form() {
//     const[formdata, setformdata]=useState(
//         {
//             uname:'',
//             uemail:'',
//             uphone:'',
//             umessage:'',
//             index: '',
//         }
//     )
//     const [userdata,newuserdata]= useState([])
//     function setData(e){
//       let data={...formdata}
//       let inputname= e.target.name
//       let inputvalue=e.target.value
//       data[inputname]=inputvalue
//       setformdata(data)
//     }
//     function submitfunc(e){
//       e.preventDefault()
//       console.log(formdata.index)
      
//       if(formdata.uname || formdata.uemail || formdata.uphone || formdata.umessage== '' ){
//         toast.info('Please Fill all the Entries')
//       }
//       if(formdata.index==''){
//       let checkdata= userdata.filter((v)=> v.uemail==formdata.uemail || v.uphone== formdata.uphone)
//       if(checkdata.length==1){
//         toast.info('Entry already exists')
//       }
//       else{
//       let olddata={
//         uname: formdata.uname,
//         uemail: formdata.uemail,
//         uphone: formdata.uphone,
//         umessage: formdata.umessage,
//       };
//       newuserdata([...userdata,olddata])
//       setformdata({uname:'',
//         uemail:'',
//         uphone:'',
//         umessage:'',
//         index: '',})
//     }
//   }
//   else{
//     let formindex=formdata.index
//     let olddata=userdata
//     let checkdata= userdata.filter((v,i)=> v.uemail==formdata.uemail || v.uphone== formdata.uphone && i!=formindex)
//     if(checkdata.length==0){

//     olddata[formindex]['uname']=formdata.uname
//     olddata[formindex]['uemail']=formdata.uemail
//     olddata[formindex]['uphone']=formdata.uphone
//     olddata[formindex]['umessage']=formdata.umessage
//     newuserdata(olddata)
//     setformdata({
//       uname:'',
//         uemail:'',
//         uphone:'',
//         umessage:'',
//         index: '',
//     })
//   }
//   else{    
//     toast.info('Entry already exists')
//   }
//   }
// }
//   function deleterow(index){
//     let deletedata= userdata.filter((v,i)=>i!=index)
//     newuserdata(deletedata)
//     toast.success('Row deleted successfully')
//   }
//   function updaterow(index){
//     let updatedata = userdata[index];
//     setformdata({ ...updatedata, index });
//   }
   
//   return (
//     <>
//     <ToastContainer/>
//     <div className='mt-4 text-center'>{userdata.length}</div>
//     <h2 className='text-center mb-4 '>Enquire Now</h2>
//     <div className="container-fluid">
//       <div className="row">
//     <div className="col-5 firstcol">
//     <form onSubmit={submitfunc}>
//         <label className="form-label mt-4"> Name</label>
//         <input type="text" value={formdata.uname} name="uname" onChange={setData}  className='form-control mb-4 formshadow' />
//         <label className="form-label "> Email</label>
//         <input type="text" value={formdata.uemail} name="uemail" onChange={setData} className='form-control  mb-4 formshadow' />
//         <label className="form-label"> Phone</label>
//         <input type="text" value={formdata.uphone} name="uphone" onChange={setData} className='form-control  mb-4 formshadow' />
//         <label className='form-label '>Message</label>
//         <textarea value={formdata.umessage} name="umessage" onChange={setData} className='form-control  mb-4 formshadow'></textarea>
//         <button className='btn btn-danger formshadow' >
//           {formdata.index!==''? 'Update': 'Show'}
//         </button>
//     </form>
//     </div>
//     <div className="col-7">
//       <h4 className='text-center mt-4 mb-4'>Form data</h4>
//       <table className='tablee'>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Password</th>
//             <th>Action</th>
//           </tr>
//           </thead>
//           <tbody>
//           {
//             userdata.length>=1?
//             userdata.map((v,i)=>{
//               return(
//               <tr>
//             <td>{i}</td>
//             <td>{v.uname}</td>
//             <td>{v.uemail}</td>
//             <td>{v.uphone}</td>
//             <td>{v.umessage}</td>
//             <td>
//               <button onClick={()=>updaterow(i)}>Edit</button><button onClick={()=>deleterow(i)}>Delete</button>
//             </td>
//           </tr>
//           )
//             })
          
//           :
//           <tr colSpan={6}>No data Found</tr>
//           }
//           </tbody>
//       </table>
//     </div>
//     </div>
//         </div>

//     </>
//   )
// }
