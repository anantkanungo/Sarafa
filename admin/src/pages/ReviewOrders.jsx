import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Accordion from 'react-bootstrap/Accordion';
const ReviewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const delItem = async (delId) => {
    console.log("delId", delId);
    const res = await axios.delete(`http://139.59.58.151:8000/delete/order/${delId}`);
    if (res.data.success) { toast.warn("Order deleted..."); }
  }
  const updateItem = async (id) => {
    setShow(true);
    console.log("id", id);
    const res = await axios.get(`http://139.59.58.151:8000/getallorders/${id}`);
    console.log("res", res.data.data);
    setEditOrder(res.data.data);
    console.log("editOrder", editOrder);

  }
  useEffect(() => {
    console.log("editOrder1", editOrder);
  }, [editOrder]);

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };
  const saveUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const data = { statusIs : currentStatus}
    const res = await axios.put(`http://139.59.58.151:8000/update/order/${id}`, data, {
      headers: {
        "Authorization": 'Bearer ' + token,
        Accept: "application/json",
        'Content-Type': 'application/json'
      }
    });
    console.log("res", res.data);
    // setEditOrder(res.data.data);
    setShow(false);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      axios.get(`http://139.59.58.151:8000/getallorders`).then((res) => {
        console.log(res)
        setOrders(res.data.data);
      })
    }
    fetchOrders();
  }, [orders]);
  console.log(orders);

  return (
    <>
      <div className='container mt-5 pt-5'>
      <div className="pt-2"><h3 className="text-dark text-center mt-2"><strong>Review Orders</strong></h3>
          <hr /></div>
        <div className='row ms-auto me-auto'>
          {orders && orders.reverse().map((items, index) => {
            return (
              <Card className='m-2' style={{ width: '16rem',border: "1px outset" }}>
                <Card.Img variant="top" className='p-2' style={{ width: '14rem', height: '14rem' }} src={items.image[0]} />
                <Card.Body>
                  <Card.Title>Category: {items.category}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                <ListGroup.Item>Ordered On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                  <ListGroup.Item>OrderId: {items.orderId}</ListGroup.Item>
                  <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                  <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                  <ListGroup.Item>Status: {items.statusIs}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button variant="secondary" onClick={() => { updateItem(items._id) }} ><AiFillEdit />
                    Update
                  </Button>
                  <Button className='btn btn-danger ms-2' onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete</Button>
                </Card.Body>
              </Card>
            )
          })}
        </div>


        {editOrder && editOrder.map((items, index) => {
          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>

                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body className='scrollable'>
                <img variant="top" src={items.image[0]} className='img-thumbnail ' />
                <h6>OrderId: {items.orderId}</h6>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Description:</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup className="list-group-flush">
                <ListGroup.Item>Ordered On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                  <ListGroup.Item>OrderId: {items.orderId}</ListGroup.Item>
                  <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                  <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                  <ListGroup.Item>Status: {items.statusIs}</ListGroup.Item>
                  <ListGroup.Item>Description: {items.description}</ListGroup.Item>
                </ListGroup>
               
                </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <FloatingLabel controlId="floatingSelect" label="Status">
                  <Form.Select aria-label="Floating label select example" onChange={handleStatusChange} >
                    <option value={items.statusIs}>{items.statusIs}</option>
                    <option value="pending">Pending</option>
                    <option value="proccesing">Proccesing</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Reject</option>
                  </Form.Select>
                </FloatingLabel>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => { saveUpdate(items._id) }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )
        })}

      </div>
    </>

  );

}

export default ReviewOrders