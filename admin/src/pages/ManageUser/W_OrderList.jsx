import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import { useNavigate, useParams } from 'react-router-dom';

const W_OrderList = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [k_list, setK_list] = useState([]);
    const [order, setOrder] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let token = localStorage.getItem("token");

    const fetchKariger = () => {

        axios.get(`http://139.59.58.151:8000/workshop/kariger/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            setK_list(res.data.data[0].kariger);
        })
    }
    console.log("k_list", k_list);
    useEffect(() => {
        axios.get(`http://139.59.58.151:8000/workshop/alltask/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            setList(res.data.data[0].task);
        })
    }, [list]);
    console.log("list", list);
    return (
        <>
            <div className='container mt-5 pt-5'>
                <div className="pt-2">
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header  onClick={fetchKariger}><h5 className="text-dark text-center mt-2">View Karigar List:</h5>
                    </Accordion.Header>
                            <Accordion.Body>
                              
                                {/* <div className='container  ms-auto me-auto '> */}
                    <ListGroup as="ol" numbered>
                        <div className='row '>
                       
                            {k_list && k_list && k_list.map((items, index) => {
                                
                                console.log("kariger", items);
                                return (
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start  ">
                                        <div className="ms-2 me-auto" onClick={() => { navigate(`/k_order/list/${items._id}`) }}>
                                            <div className="fw-bold">Name: {items.name}</div>
                                            UserId: {items.userId}<br />
                                            Address: {items.address}<br />


                                        </div>
                                        {/* <Badge bg="secondary"  type= "button" className='me-1 cursor-pointer' pill><AiFillEdit />Edit </Badge> */}
                                        {/* <Badge bg="danger" type="button" pill  onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete </Badge> */}
                                    </ListGroup.Item>
                                )
                            })}
                        </div>
                    </ListGroup>
                {/* </div> */}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
              

                <div className="pt-2"><h3 className="text-dark text-center mt-2"><strong>Order List</strong></h3>
                    <hr /></div>
                <div className='row'>
                    {list && list && list.map((items, index) => {
                        console.log("items", items);
                        return (
                            <div className='col-sm-6 col-md-6 col-lg-3'>
                            <Card className='m-2' style={{ border: "1px outset" }}>
                              <Card.Img variant="top" className='p-2 ms-auto me-auto' style={{ width: '14rem', height: '14rem' }} src={items.image[0]} />
                                <Card.Body>
                                    <Card.Title><h6>OrderBy: {items.createdBy.name}</h6></Card.Title>
                 <Card.Title><h6>OrderId: {items.orderId}</h6></Card.Title>
                                </Card.Body>
                         <ListGroup className="list-group-flush">
                 <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                                        <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                                    <ListGroup.Item>Status: {items.statusIs}</ListGroup.Item> 
                <ListGroup.Item>Ordered On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item> 
                </ListGroup>
                 {/* <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>Description:</Accordion.Header>
                    <Accordion.Body> */}
                {/* <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Category: {items.category}</ListGroup.Item>
                                    <ListGroup.Item>Ordered On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                                    <ListGroup.Item>OrderId: {items.orderId}</ListGroup.Item>
                                    <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                                    <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                                    <ListGroup.Item>Status: {items.statusIs}</ListGroup.Item>
                                    <ListGroup.Item>Assigned To Workshop: {items.workshop}</ListGroup.Item>
                                    <ListGroup.Item>Assigned To Kariger: {items.kariger}</ListGroup.Item>
                                    <ListGroup.Item>Description: {items.description}</ListGroup.Item>
                                </ListGroup> */}

                {/* </Accordion.Body>
                        </Accordion.Item>
                   </Accordion> */}
                {/* <Card.Body> */}
                {/* <Button variant="secondary" onClick={() => { setOrder(items._id) }} >
                    View
                </Button> */}
                {/* <Button className='btn btn-danger ms-2' onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete</Button> */}
                                {/* </Card.Body> */}
                            </Card >
                            </div>
                        )
                    })

                    }
                </div >
            </div >

        </>
    )
}

export default W_OrderList