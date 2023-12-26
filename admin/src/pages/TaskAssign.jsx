import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
const TaskAssign = () => {
  const [orders, setOrders] = useState([]);
  const [kariger, setKariger] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    const fetchOrders = async () => {
      axios.get(`http://139.59.58.151:8000/getallorders`).then((res) => {
        console.log(res)
        setOrders(res.data.data);
      })
    }
    fetchOrders();
  }, []);
  useEffect(() => {
  
    axios.get("http://139.59.58.151:8000/kariger/list", {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      setKariger(res.data.data);
    })
  }, []);
  useEffect(() => {
    axios.get("http://139.59.58.151:8000/workshop/list", {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      setWorkshop(res.data.data);
    })
  }, []);
  console.log("workshop", workshop);
  return (
    <>
      <Container className='mt-5 pt-5'>
      <div className="pt-2"><h3 className="text-dark text-center mt-2"><strong>Assign Task</strong></h3>
          <hr /></div>
        <Form.Select aria-label="Default select example">
          <option>Select Order</option>
          {orders && orders.reverse().map((items, index)=><option value={items.orderId}>{items.orderId}</option>
          )}
        </Form.Select>
        <br />
        <Form.Select aria-label="Default select example">
          <option>Select Workshop</option>
          {workshop && workshop.map((items, index)=><option value={items.name}>{items.name}</option>
          )}
        </Form.Select>
        <br />
        <Form.Select aria-label="Default select example">
          <option>Select Kariger</option>
          {kariger && kariger.map((items, index)=><option value={items.name}>{items.name}</option>
          )}
        
        </Form.Select>
      </Container>
    </>
  );
}

export default TaskAssign