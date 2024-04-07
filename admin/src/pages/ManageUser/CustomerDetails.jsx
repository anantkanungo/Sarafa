import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
const CustomerDetails = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  let token = localStorage.getItem("token");
  const delItem = async (delId) => {
    console.log("delId", delId);
    const res = await axios.delete(`http://139.59.58.151:8000/customer/delete/${delId}`, {
      headers: {
          "Authorization": "Bearer " + token
      }
  });
    if (res.data.success) { toast.warn("deleted..."); }
  }

  useEffect(() => {
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
        <div className="pt-3"><h3 className="text-dark text-center mt-4">Customers</h3>
          <hr /></div>
        <div className='container  ms-auto me-auto '>
          <ListGroup as="ol" numbered>
            <div className='row '>
              {list && list.data && list.data.map((items, index) => {
                console.log(items);
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start  ">
                    <div className="ms-2 me-auto" onClick={() => { navigate(`/c_order/list/${items.uid}`) }}>
                      <div className="fw-bold">Name: {items.name}</div>
                      UserId: {items.userId}<br/>
                      Agent Code: {items.agent}<br/>
                      {/* <div className="fw-bold">{items.name}</div> */}
                      Address: {items.address}
                    </div>
                    {/* <Badge bg="secondary"  type= "button" className='me-1 cursor-pointer' pill><AiFillEdit />Edit </Badge> */}
                    <Badge bg="danger" type="button" pill  onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete </Badge>
                  </ListGroup.Item>
                )
              })}
            </div>
          </ListGroup>
        </div>

      </div>
    </>
  )
}

export default CustomerDetails


        {/* <div className='container  ms-auto me-auto '>
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
         </div> */}