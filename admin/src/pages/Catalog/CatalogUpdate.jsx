import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Accordion from 'react-bootstrap/Accordion';
const CatalogUpdate = (props) => {
  const { category } = useParams();
  // const { categry } = props.categry
  console.log("categry", category);
  const [catalog, setCatalog] = useState([]);
  const [editCatalog, setEditCatalog] = useState([]);
  const [show, setShow] = useState(false);
  const [updateCatalog, setUpdateCatalog] = useState({
    "image": "",
    "category": "",
    "size": "",
    "designCode": "",
    "description": "",
    "weight": "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const delItem = async (delId) => {
    console.log("delId", delId);
    const res = await axios.delete(`http://139.59.58.151:8000/delete/catalog/${delId}`);
    if (res.data.success) { toast.warn("Order deleted..."); }
  }
  const updateItem = async (id) => {
    setShow(true);
    console.log("id", id);
    const res = await axios.get(`http://139.59.58.151:8000/getcatalog/${id}`);
    console.log("res", res.data.data);
    setEditCatalog(res.data.data);
    setUpdateCatalog(res.data.data);
    console.log("editCatalog", editCatalog);

  }
  useEffect(() => {
    console.log("editCatalog1", editCatalog);
  }, [editCatalog]);

  const saveUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const form_data = new FormData();
    form_data.append("catalog", updateCatalog.image);
    form_data.append("category", updateCatalog.category);
    form_data.append("designCode", updateCatalog.designCode);
    form_data.append("size", updateCatalog.size);
    form_data.append("weight", updateCatalog.weight);
    form_data.append("description", updateCatalog.description);
    try {
      const res = await axios.put(`http://139.59.58.151:8000/update/catalog/${id}`, form_data, {
        headers: {
          "Authorization": 'Bearer ' + token,
          Accept: "application/json",
          'Content-Type': 'application/json'
        }
      });
      console.log("res", res.data);
    } catch (error) {
      alert("Network Error");
    }

    // setEditCatalog(res.data.data);
    setShow(false);
  }

  useEffect(() => {
    const fetchCatalog = async () => {
      axios.get(`http://139.59.58.151:8000/getallcatalog`).then((res) => {
        console.log(res);

const result = res.data.data.filter((items, index)=>{
  return items.category === category;
});
console.log("result", result);
        if (result) {
          setCatalog(result);

        }
      })
    }
    fetchCatalog();
  }, [catalog]);
  console.log("catalog",catalog);

  return (
    <>
      <div className='container mt-5 pt-5'>
        <div className="pt-2"><h3 className="text-dark text-center mt-2"><strong>Catalog</strong></h3>
          <hr /></div>
        <div className='row'>
          {catalog && catalog.reverse().map((items, index) => {

            return (
              <Card className='m-2' style={{ width: '16rem', }}>
                <Card.Img variant="top" className='p-2' style={{ width: '14rem', height: '14rem' }} src={items.image[0]} />
                <Card.Body>
                  <Card.Title>Category: {items.category}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>DesignCode: {items.designCode}</ListGroup.Item>
                  <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                  <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                  <ListGroup.Item>Posted On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button variant="secondary" onClick={() => { updateItem(items._id) }} ><AiFillEdit />
                    View
                  </Button>
                  <Button className='btn btn-danger ms-2' onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete</Button>
                </Card.Body>
              </Card>
            )
          })}
        </div>


        {editCatalog && editCatalog.map((items, index) => {
          console.log("items", items)
          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>

                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body className='scrollable'>
                <img variant="top" src={items.image[0]} className='img-thumbnail ' />
                <h6>DesignCode: {items.designCode}</h6>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Description:</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>Posted On: {new Date(items.createdAt).toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item>Size: {items.size}</ListGroup.Item>
                        <ListGroup.Item>Weight: {items.weight}</ListGroup.Item>
                        <ListGroup.Item>Description: {items.description}</ListGroup.Item>
                      </ListGroup>

                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {/* <Form>
                  <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setUpdateCatalog({ ...updateCatalog, image: e.target.files[0] })} />
                  </Form.Group>
                  <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter category" value={updateCatalog.category} onChange={(e) => setUpdateCatalog({ ...updateCatalog, category: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formDesignCode">
                    <Form.Label>Design Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter design code" value={updateCatalog.designCode} onChange={(e) => setUpdateCatalog({ ...updateCatalog, designCode: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Control type="text" placeholder="Enter size" value={updateCatalog.size} onChange={(e) => setUpdateCatalog({ ...updateCatalog, size: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="text" placeholder="Enter weight" value={updateCatalog.weight} onChange={(e) => setUpdateCatalog({ ...updateCatalog, weight: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" value={updateCatalog.description} onChange={(e) => setUpdateCatalog({ ...updateCatalog, description: e.target.value })} />
                  </Form.Group>
                </Form> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={() => { saveUpdate(items._id) }}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>
          )
        })}

      </div>
    </>

  );

}

export default CatalogUpdate