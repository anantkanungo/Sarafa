import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditOrders = () => {
    const InputHandler = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
        // console.log(inputValue);
    }

    const navigate = useNavigate();
    const { id } = useParams();
    console.log("id", id);
    const [inputValue, setInputValue] = useState({
        "orderId": "",
        "category": "",
        "size": "",
        "weight": "",
        "quantity": "",
        "statusIs": "",
        "description": "",
        "createdOn": ""
    });

    const UpdateData = (e) => {
        e.preventDefault();
        axios.put(`http://139.59.58.151:8000/update/order/${id}`, inputValue).then((res) => {
            setInputValue(res.data);
            alert("Status Updeted");
            navigate("/manage_user");
        }).catch(error => { console.log(error) })
    }
    useEffect(() => {
        axios.get(`http://139.59.58.151:8000/update/order/${id}`).then((res) => {
            setInputValue(res.data);
        }).catch(error => console.log(error))
    }, [id]);
    return (
        <>
            <div className="container mt-5 pt-3 ">
                <div className="alert alert-dark text-center text-light mt-5">
                    <h3>ORDER DETAILS</h3>
                </div>
                <form method="post" onSubmit={UpdateData} >
                    <div className="row d-flex ">
                        <div className="col-sm-2"></div>
                        <div className= "col-sm-8">
                            <div className="form-group mt-2">
                                <label htmlFor="">OrderId</label>
                                <input type="text" className="form-control" onChange={InputHandler} name="title" value={inputValue.orderId} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="">Category</label>
                                <input type="text" className="form-control" onChange={InputHandler} name="location" value={inputValue.category} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="">Quantity</label>
                                <input type="text" className="form-control" onChange={InputHandler} name="address" value={inputValue.quantity} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="">Weight</label>
                                <input type="text" className="form-control" onChange={InputHandler} name="contact" value={inputValue.weight} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="">Size</label>
                                <input type="text" className="form-control" onChange={InputHandler} name="email" value={inputValue.size} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="">Ordered On</label>
                                <input type="date" className="form-control" onChange={InputHandler} name="postdate" value={inputValue.createdOn} />
                            </div>
                            
                            <div className="form-group mt-2">
                                <label htmlFor="">Status Update</label>
                                <select type="text" className="form-control" onChange={InputHandler} name="jobtype">
                                    <option value="">Select</option>
                                    <option value="proccessing">Proccessing</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Reject</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="">Description</label>
                            <textarea type="text" className="form-control" onChange={InputHandler} name="description" value={inputValue.description}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark text-light pl-3 mt-2" >Save</button>
                </form>
                <div className="col-sm-2"></div>
            </div>
        </>
    )
}

export default EditOrders