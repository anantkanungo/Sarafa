import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Badge, Card, ListGroup, Offcanvas } from 'react-bootstrap';
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
  const [canvashow, setCanvashow] = useState(false);
  const [kariger, setKariger] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isUrgent, setIsUrgent] = useState(null);
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedKariger, setSelectedKariger] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [task, setTask] = useState({
    "order": "",
    "workshop": "",
    "kariger": ""
  });
  const inputHandler = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }
  

  const handlecanvaClose = () => setCanvashow(false);
  const handlecanvaShow = () => setCanvashow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("token");

  // const delItem = async (delId) => {
  //   console.log("delId", delId);
  //   if (confirm("Do you want to delete this?")) {
  //   const res = await axios.delete(`http://139.59.58.151:8000/delete/order/${delId}`, {
  //     headers: {
  //       "Authorization": 'Bearer ' + token,
  //       Accept: "application/json",
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   if (res.data.success) { toast.warn("Order deleted..."); }
  // }}
  const delItem = async (delId) => {
    console.log("delId", delId);
    if (window.confirm("Do you want to delete this?")) {
      try {
        const res = await axios.delete(`http://139.59.58.151:8000/delete/order/${delId}`, {
          headers: {
            "Authorization": 'Bearer ' + token,
            Accept: "application/json",
            'Content-Type': 'application/json'
          }
        });
        if (res.data.success) {
          toast.warn("Order deleted...");
          const updatedOrders = orders.filter((order) => order._id !== delId);
          setOrders(updatedOrders);
        }

      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete order. Please try again later.');
      }
    }
  };
  const updateItem = async (id) => {
    try {
      setShow(true);
      console.log("id", id);
      const res = await axios.get(`http://139.59.58.151:8000/getallorders/${id}`, {
        headers: {
          "Authorization": 'Bearer ' + token,
          Accept: "application/json",
          'Content-Type': 'application/json'
        }
      });
      console.log("res", res.data.data);
      setEditOrder(res.data.data);
      console.log("editOrder", editOrder);
    } catch (error) {
      console.log(error);
      alert("Network Error");
    }
  }
  useEffect(() => {
    console.log("editOrder1", editOrder);
  }, [editOrder]);

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };
  const saveUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // const data = { statusIs: currentStatus }
      const res = await axios.put(`http://139.59.58.151:8000/update/order/${id}`, task, {
        headers: {
          "Authorization": 'Bearer ' + token,
          Accept: "application/json",
          'Content-Type': 'application/json'
        }
      });
      console.log("res", res.data);
      // setEditOrder(res.data.data);
      setShow(false);
      if (res.data.success) {
        toast.success('Order updated successfully');
        const updatedOrders = orders.map((order) => (order._id === editOrder._id ? res.data.data : order));
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.log(error);
      alert("Network Error")

    }

  }

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        axios.get(`http://139.59.58.151:8000/getallorders`, {
          headers: {
            "Authorization": 'Bearer ' + token,
            Accept: "application/json",
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log(res)
          setOrders(res.data.data);
        })
      }
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Network Error");
    }

  }, []);
  console.log(orders);


  useEffect(() => {
    try {
      axios.get("http://139.59.58.151:8000/kariger/list", {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((res) => {
        setKariger(res.data.data);
      })
    } catch (error) {
      console.log(error)
      alert("Network Error");
    }
  }, []);
  console.log("kar", kariger);
  useEffect(() => {
    try {
      axios.get("http://139.59.58.151:8000/workshop/list", {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((res) => {
        setWorkshop(res.data.data);
      })
    } catch (error) {
      console.log(error);
      alert("Network Error");
    }

  }, []);
  const resetAll = () => {
    setSelectedCategory("");
    setIsUrgent("");
    setSelectedOrderID("");
  }
  const getUniqueNames = (orders) => {
    const uniqueNamesSet = new Set();
    orders.forEach((order) => {
      uniqueNamesSet.add(order.createdBy.name);
    });
    return Array.from(uniqueNamesSet);
  };

  console.log(selectedWorkshop);
  return (
    <>
      <div className="container mt-5" >
        <ToastContainer />
        <div className="pt-3"><h3 className="text-dark text-center mt-4">Review Orders</h3>
          <hr /></div>

        <span className='icon-end outlined-button  ms-auto' onClick={handlecanvaShow} style={{ width: "70px" }}>Filter<span class="material-symbols-outlined ps-1">
          tune
        </span></span>
        <Offcanvas show={canvashow} placement='end' onHide={handlecanvaClose}>
          <Offcanvas.Header closeButton><Offcanvas.Title>Filter</Offcanvas.Title>
            <span className='icon-end cursor-pointer' onClick={resetAll}><b style={{ fontSize: 20 }}>reset all</b><span class="material-symbols-outlined">
              device_reset
            </span></span>
          </Offcanvas.Header>
          <Offcanvas.Body> <h6>Select Category  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="ring">Ring</option>
            <option value="earring">Earring</option>
            <option value="bracelet">Bracelet</option>
            <option value="chain">Chain</option>
            <option value="nosepin">Nosepin</option>
            <option value="necklace">Necklace</option>
            <option value="mangalsutra">Mangalsutra</option>
            <option value="pendants">Pendants</option>
            <option value="others">Others</option>
          </select></h6><br />
            <h6><input type="checkbox" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} /> Urgent Orders Only</h6>
            <br />
            {/* <h6>Search by Jeweller`s Name <input type="text" value={selectedOrderID} onChange={(e) => setSelectedOrderID(e.target.value)} placeholder="Enter Jeweller`s Name" /></h6> */}
            {/* <h6>Search by Jeweller's Name</h6>
<select value={selectedOrderID} onChange={(e) => setSelectedOrderID(e.target.value)}>
 {orders && orders.map((item, index) => (
    <option key={index} value={item.createdBy.name}>{item.createdBy.name}</option>
  ))}
</select> */}
            <h6>Search by Jeweller's Name</h6>
            <select value={selectedOrderID} onChange={(e) => setSelectedOrderID(e.target.value)}>
              {orders && getUniqueNames(orders).map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </Offcanvas.Body>
        </Offcanvas>

        <div className='row ms-auto me-auto'>
          {/* {orders && orders.reverse().map((items, index) => { */}
          {orders && orders.filter(order => (!isUrgent || order.urgent === isUrgent) && (!selectedOrderID || order.createdBy.name.toLowerCase() === selectedOrderID.toLowerCase()) && (!selectedCategory || order.category === selectedCategory)).reverse().map((items, index) => {
            return (
              <div className='col-sm-6 col-md-6 col-lg-3'>
                <Card className='m-2' style={{ border: "1px outset" }}>
                  <div style={{ height: "10px" }}>{(items.urgent) === true ? (<span className="material-symbols-outlined icon-end" style={{ color: "#d42202", }}>
                    {/* hourglass_bottom */}
                    {/* stars */}
                    notification_important
                  </span>) : null}
                  </div>
                  <div style={{ height: "10px" }}>{(items.statusIs) == "completed" ? (<span className="material-symbols-outlined icon-end" style={{ color: "#d42202", }}>
                    {/* hourglass_bottom */}
                    {/* stars */}
                    done
                  </span>) : null}
                  </div>

                  <Card.Img variant="top" className='p-2 ms-auto me-auto' style={{ width: '14rem', height: '14rem' }} src={items.image[0]} />
                  <Card.Body>
                    <Card.Title><h6>OrderBy: {items.createdBy.name}</h6></Card.Title>
                    <Card.Title><h6>OrderId: {items.orderId}</h6></Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Category: {items.category}</ListGroup.Item>
                    <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                    <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                    <ListGroup.Item>Status: {items.statusIs}</ListGroup.Item>
                    <ListGroup.Item>Workshop: {items.workshop}</ListGroup.Item>
                    <ListGroup.Item>Kariger: {items.kariger}</ListGroup.Item>
                    <ListGroup.Item>Ordered On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button variant="secondary" onClick={() => { updateItem(items._id) }} ><AiFillEdit />
                      Update
                    </Button>
                    <Button className='btn btn-danger ms-2' onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete</Button>
                  </Card.Body>
                </Card>
              </div>
            )
          })}
        </div>


        {editOrder && editOrder.map((items, index) => {
          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
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
                        <ListGroup.Item>Assigned To Workshop: {items.workshop}</ListGroup.Item>
                        <ListGroup.Item>Assigned To Kariger: {items.kariger}</ListGroup.Item>
                        <ListGroup.Item>Description: {items.description}</ListGroup.Item>
                      </ListGroup>

                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form onSubmit={saveUpdate}>
                  <FloatingLabel controlId="floatingSelect" label="Task Assign ">
                    <Form.Select htmlFor='order' name='order' onChange={inputHandler}>
                      <option >Select OrderId</option>

                      <option id='order' value={items._id}>{items.orderId}</option>
                    </Form.Select>
                    <br />
                    <Form.Select htmlFor='workshop' name="workshop" onChange={inputHandler} onClick={(e) => setSelectedWorkshop(e.target.value)}>
                      <option>Select Workshop</option>
                      {workshop && workshop.map((items, index) => <option id='workshop' key={index} value={items._id} >{items.name} </option>
                      )}
                    </Form.Select>
                    <br />
                    <Form.Select htmlFor='kariger' name='kariger' onChange={inputHandler}>
                      <option>Select Kariger</option>
                      {kariger && kariger.filter((kariger)=>kariger.workshop._id === task.workshop).map((items, index) => <option id='kariger' key={index} value={items._id} >{items.name}</option>
                      )}
                    </Form.Select>
                 
                    <Button variant="secondary" className='text-center ms-auto me-auto mt-2' type="submit">
                      Assign
                    </Button>
                  </FloatingLabel>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" type='submit'  onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>
          )
        })}

      </div >
    </>

  );

}

export default ReviewOrders
