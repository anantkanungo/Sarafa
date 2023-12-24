import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
const AddUser = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        "role": "customer",
        "name": "",
        "userId": "",
        "password": "",
        "address": "",
    })
    const inputHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    
    const register = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`http://139.59.58.151:8000/adduser`, userDetails);
            console.log("res", res.data);
            if (res.data.success) {
                toast.success("User Added...");
            } else {
                alert(res.data.message);

            }
        } catch (error) {
            console.log(error);

        }
        setUserDetails({
            "role": "customer",
        "name": "",
        "userId": "",
        "password": "",
        "address": "",
        })

    }
    return (
        <>
            <div className='container mt-5 ' >
                <div className='row  mx-2 mt-5 pt-5 d-flex '>
                    <ToastContainer/>
                    <div className='col-sm-6 mx-auto my-auto' style={{ border: " groove 1px", borderBlockStyle: "inset" }}>
                        <div className='justify-content-center align-items-center'>
                            <div className="pt-3">
                                <h3 className="text-dark text-center px-2 py-2" ><strong>Add User</strong></h3>
                                <hr />
                            </div>
                            <form className='card p-3' action="" onSubmit={register} method='post' style={{ border: "solid 1px" }}>
                                <div className="form-group">
                                    <label htmlFor="role">Category</label>
                                    <select className="form-control" id="role" name="role" onChange={inputHandler}>
                                        <option value="cutomer">Cutomer</option>
                                        <option value="distributor">Distributor</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="kariger">Kariger</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="name1">Name</label>
                                    <input type="text" className="form-control" id="name1" name='name' onChange={inputHandler} value={userDetails.name} placeholder="Enter Name" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="userId">UserId</label>
                                    <input type="text" className="form-control" id="userId" name='userId' onChange={inputHandler} value={userDetails.userId} placeholder="Enter UserId" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password1">Password</label>
                                    <input type="password" className="form-control" id="password1" name='password' onChange={inputHandler} value={userDetails.password} placeholder="Enter Password" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Enter Address</label>
                                    <input type="text" className="form-control" id="address" name='address' onChange={inputHandler} value={userDetails.address} placeholder="Enter address" />
                                </div>
                                <span className='px-1 ms-auto'><button className="btn btn-primary m-2" type="submit">Register</button></span>
                            </form>
                                </div>
                               </div>
                              
                          
                        </div >
                    </div >
              
        </>
    )
}

export default AddUser