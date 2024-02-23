import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Form from 'react-bootstrap/Form';
const AddUser = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [userDetails, setUserDetails] = useState({
        "role": "customer",
        "name": "",
        "agent": "",
        "workshop": "",
        "userId": "",
        // "password": "",
        "address": "",
    })
    const inputHandler = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://139.59.58.151:8000/workshop/list", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            setList(res.data);
        })
    }, [list]);
    const register = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`http://139.59.58.151:8000/adduser`, userDetails, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
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
            "role": "",
            "name": "",
            "agent": "",
            "workshop": "",
            "userId": "",
            // "password": "",
            "address": "",
        })

    }
    return (
        <>
            <div className='container mt-5 ' >
                <div className='row  mx-2 mt-5 pt-5 d-flex '>
                    <ToastContainer />
                    <div className='col-sm-6 mx-auto my-auto' style={{ border: " groove 1px", borderBlockStyle: "inset" }}>
                        <div className='justify-content-center align-items-center'>
                            <div className="pt-3">
                                <h3 className="text-dark text-center px-2 py-2" ><strong>Add User</strong></h3>
                                <hr />
                            </div>
                            <form className='card p-3' action="" onSubmit={register} method='post' style={{ border: "solid 1px" }}>
                                <div className="form-group">
                                    <label htmlFor="role">Category</label>
                                    <Form.Select aria-label="Category" name="role" id="role" onChange={inputHandler} >
                                        <option value="">Select Category</option>
                                        <option value="customer">Customer</option>
                                        <option value="distributor">Distributor</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="kariger">Karigar</option>
                                    </Form.Select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="name1">Name</label>
                                    <input type="text" className="form-control" id="name1" name='name' onChange={inputHandler} value={userDetails.name} placeholder="Enter Name" required />
                                </div>
                                {userDetails.role === "customer" || userDetails.role === "distributor" ? (<div className="form-group mb-3">
                                    <label htmlFor="agent">Agent Code</label>
                                    <input type="text" className="form-control" id="agent" name='agent' onChange={inputHandler} value={userDetails.agent} placeholder="Enter Code" />
                                </div>) : null

                                }
                                {userDetails.role === "kariger" ? (<div className="form-group ">
                                <div className="form-group mb-3">
                                        <Form.Select aria-label="Default select example"  name='workshop'  onChange={inputHandler}   >
                                        <option value="">Select Workshop</option>
                                        {list && list.data && list.data.map((items, index)=><option key={index} value={items._id}>{items.name}</option>
                                    )}
                                    </Form.Select>
                                </div>
                                </div>) : null

                                }
                                <div className="form-group mb-3">
                                    <label htmlFor="userId">UserId</label>
                                    <input type="text" className="form-control" id="userId" name='userId' onChange={inputHandler} value={userDetails.userId} placeholder="Enter UserId" required />
                                </div>
                                {/* <div className="form-group mb-3">
                                    <label htmlFor="password1">Password</label>
                                    <input type="password" className="form-control" id="password1" name='password' onChange={inputHandler} value={userDetails.password} placeholder="Enter Password" required />
                                </div> */}
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Enter Address</label>
                                    <input type="text" className="form-control" id="address" name='address' onChange={inputHandler} value={userDetails.address} placeholder="Enter address" />
                                </div>
                                <span className='px-1 ms-auto'><button className="btn btn-secondary m-2" type="submit">Register</button></span>
                            </form>
                        </div>
                    </div>


                </div >
            </div >

        </>
    )
}

export default AddUser
