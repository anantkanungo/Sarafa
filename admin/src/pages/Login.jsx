import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../redux/features/LoginSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
   const navigate= useNavigate();
 const [loginDetails,setLoginDetails] = useState({
    "userId": "",
    "password": ""
 })

const inputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
}

const handleLogin =async(e)=>{
    e.preventDefault();
    let res = await axios.post(`http://139.59.58.151:8000/adminlogin`, loginDetails);
    console.log(res);
    if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");
        navigate('/home');
    } else {
        toast.warning("invalid emailId or password");

    }
      
}
  // const handleLogout =()=>{
  //   dispatch(logOut());
  // }
  return (
   <>
     <div className='container mt-5'>
                <div className='d-flex row mx-2 mt-5 pt-5'>
                    <ToastContainer/>
                    <div className='col-sm-6 mx-auto '>
                        <div className='justify-content-center align-items-center ' >
                            <div className="pt-3">
                                <h3 className="text-dark text-center"><strong>Login</strong></h3>
                                <hr/>
                            </div>
                            <form className='card p-3' action='' method='post' onSubmit={handleLogin} style={{ border: "solid 1px" }}>
                                <div className="form-group mb-3">
                                    <label htmlFor="userId">UserId</label>
                                    <input type="text" className="form-control" id="userId" name='userId' placeholder="Enter UserId" onChange={inputHandler} value={loginDetails.userId} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={inputHandler} value={loginDetails.password}  />
                                </div>
                              
                                <span className='px-1 ms-auto'>
                                    <button className="btn btn-primary m-2" type="submit" >Login</button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
   </>
  )
}

export default Login