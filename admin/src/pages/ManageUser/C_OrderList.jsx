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

const C_OrderList = () => {
    const { id } = useParams();
    console.log("id", id)
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [order, setOrder] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get(`http://139.59.58.151:8000/allorders/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            setList(res.data.data);
        })
    }, [list]);
    console.log("list", list);
    return (
        <>
            <div className='container mt-5 pt-5'>
                <div className="pt-2"><h3 className="text-dark text-center mt-2">Order List</h3>
                    <hr /></div>
                <div className='row'>
                    {list && list.map((items, index) => {
                        console.log("items", items);
                        return (
                            <div className='col-sm-6 col-md-6 col-lg-3'>
                            <Card className='m-2' style={{ border: "1px outset" }}>
                              <Card.Img variant="top" className='p-2 ms-auto me-auto' style={{ width: '14rem', height: '14rem' }} src={items.image[0]} />
                                <Card.Body style={{ padding: '0px !important'}}>
                                    <Card.Title><h6>OrderBy: {items.createdBy.name}</h6></Card.Title>
                                    <Card.Title><h6>OrderId: {items.orderId}</h6></Card.Title>
                                </Card.Body>

                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Category: {items.category}</ListGroup.Item>
                                    <ListGroup.Item>Ordered On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                                    <ListGroup.Item>OrderId: {items.orderId}</ListGroup.Item>
                                    <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                                    <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                                    <ListGroup.Item>Status: {items.statusIs}</ListGroup.Item>
                                    <ListGroup.Item>Assigned To Workshop: {items.workshop}</ListGroup.Item>
                                    <ListGroup.Item>Assigned To Kariger: {items.kariger}</ListGroup.Item>
                                    <ListGroup.Item>Description: {items.description}</ListGroup.Item>
                                </ListGroup>
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

export default C_OrderList