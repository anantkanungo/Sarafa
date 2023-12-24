import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

const CustomerDetails = () => {
  const [list, setList] = useState([]);
  const delItem = async (delId) => {
    console.log("delId", delId);
    const res = await axios.delete(`http://139.59.58.151:8000/customer/delete/${delId}`);
    if (res.data.success) { toast.warn("deleted..."); }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.get("http://139.59.58.151:8000/customer/list", {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      setList(res.data);
    })
  }, [list]);
  console.log("list", list);
  return (
    <>
      <div className="container mt-5" >
        <ToastContainer />
        <div className="pt-3"><h3 className="text-dark text-center mt-4"><strong>Customers</strong></h3>
          <hr /></div>
        <div className='container  ms-auto me-auto '>
          <div className='row d-flex '>
            {list && list.data && list.data.map((items, index) => {
              console.log(items);
              return (
                <div className='card mb-2 me-2  col-sm-4 '>
                  <div className='pt-2'>
                    <h5 className='pt-2'>Name: {items.name}</h5>
                    <h6>Address:{items.address}</h6>
                  </div>
                  <div className='d-flex flex-column  align-items-md-end justify-content-md-center mb-2 mt-auto'>
                    <button type="button" className='btn btn-secondary mb-2'><AiFillEdit />Edit</button>
                    <button className='btn btn-danger mb-2' onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete</button>
                  </div>
                </div>
              )
            })}
         </div>
         </div>
         </div>
    </>
  )
}

export default CustomerDetails