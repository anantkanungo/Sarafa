import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Accordion from 'react-bootstrap/Accordion';
const CatalogUpdate = (props) => {
  const { category } = useParams();
  // const { categry } = props.categry
  // console.log("categry", category);
  const [catalog, setCatalog] = useState([]);
  const [editCatalog, setEditCatalog] = useState([]);
  const [show, setShow] = useState(false);
  const [updateCatalog, setUpdateCatalog] = useState({
    // "image": "",
    "category": "",
    "size": "",
    "designCode": "",
    "description": "",
    "weight": "",
  });
  const InputHandler = (event) => {
    setUpdateCatalog({ ...updateCatalog, [event.target.name]: event.target.value });
    // console.log(inputValue);
  }
  const token = localStorage.getItem("token");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const delItem = async (delId) => {
    // console.log("delId", delId);
    const res = await axios.delete(`http://139.59.58.151:8000/delete/catalog/${delId}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    if (res.data.success) { toast.warn("Order deleted..."); }
  }
  const updateItem = async (id) => {
    setShow(true);
    // console.log("updateItem_id", id);
    const res = await axios.get(`http://139.59.58.151:8000/getcatalog/${id}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    // setEditCatalog(res.data.data[0]); // Set editCatalog with the first item
    // setUpdateCatalog(res.data.data[0]); // Set updateCatalog with the first item
    setEditCatalog(res.data.data);
    setUpdateCatalog(res.data.data[0]);
    // setUpdateCatalog({
      //   "category": editCatalog[0].category,
      //   "size": editCatalog[0].size,
      //   "designCode": editCatalog[0].designCode,
      //   "description": editCatalog[0].description,
      //   "weight": editCatalog[0].weight,
      // });
      console.log("updateCatalog", updateCatalog);
      console.log("editCatalog", editCatalog);
      console.log("res", res.data.data[0]);
// 
  }
  useEffect(() => {
    // console.log("editCatalog1", editCatalog);
  }, [editCatalog]);

  const saveUpdate = async (id) => {
    // console.log("saveUpdate_id", id);
    // const form_data = new FormData();
    // // form_data.append("catalog", updateCatalog.image);
    // form_data.append("category", updateCatalog.category);
    // form_data.append("designCode", updateCatalog.designCode);
    // console.log(form_data.append("size", updateCatalog.size));
    // form_data.append("weight", updateCatalog.weight);
    // form_data.append("description", updateCatalog.description);

    try {
      const res = await axios.put(`http://139.59.58.151:8000/update/catalog/${id}`, updateCatalog, {
        headers: {
          "Authorization": 'Bearer ' + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      // console.log("updated catalog", res.data);
    } catch (error) {
      alert("Network Error");
    }

    // setEditCatalog(res.data.data);
    setShow(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCatalog = async () => {
      axios.get(`http://139.59.58.151:8000/getallcatalog`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((res) => {
        // setCatalog(res.data.data.filter(items => items.category === category));
        let result = res.data.data.filter((items, index)=>{
          return items.category === category;
        });
        // console.log("result", result);
        if (result) {
          setCatalog(result);

        }
      })
    }
    fetchCatalog();
  }, [catalog]);
  // console.log("catalog", catalog);

  return (
    <>
      <div className='container mt-5 pt-5'>
        <div className="pt-2"><h3 className="text-dark text-center mt-2">Catalogue</h3>
          <hr /></div>
        <ToastContainer />
        <div className='row'>
          {catalog && catalog.reverse().map((items, index) => {

            return (
              <div className='col-sm-6 col-md-6 col-lg-3'>
                <Card className='m-2' style={{ border: "1px outset" }}>
                  <Card.Img variant="top" className='p-2 mt-2 ms-auto me-auto' style={{ width: '14rem', height: '14rem' }} src={items.image[0]} />
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
              </div>
            )
          })}
        </div>


        {editCatalog && editCatalog.map((items, index) => {
          // console.log("items", items);
          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body className='scrollable'>
                {/* <h6>DesignCode: {items.designCode}</h6> */}
                <form className='card p-3' action='' method='post' onSubmit={(e) => { e.preventDefault(); saveUpdate(items._id); }} style={{ border: "solid 1px" }}>
                <img variant="top" src={items.image[0]} className='img-thumbnail ' />
                  {/* <div className="input-group mb-3 mt-3 d-flex justify-content-center align-item-center"> */}
                  {/* <div className="custom-file row">
                                        <label className="custom-file-label col-4 designImg" htmlFor="image">
                                        <input type="file" className="form-control" onChange={(e) => setUpdateCatalog([...e.target.files[0]])} name="image" id="image"  />
                                             <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} name="image" id="image" />
                                        </label>
                                        <br />
                                    </div>  */}
                  {/* </div> */}
                  <div className="form-group mb-3">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" id="category" name='category' onChange={InputHandler} value={updateCatalog.category} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="designCode">Design Code</label>
                    <input type="text" className="form-control" id="designCode" name='designCode' onChange={InputHandler} value={updateCatalog.designCode} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={InputHandler} value={updateCatalog.description} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="size">Size</label>
                    <input type="text" className="form-control" id="size" name='size' onChange={InputHandler} value={updateCatalog.size} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="weight">Weight</label>
                    <input type="text" className="form-control" id="weight" name='weight' onChange={InputHandler} value={updateCatalog.weight} />
                  </div>
                  <span className='px-1 ms-auto'>
                    <button className="btn btn-secondary m-2" type="submit" >Save Changes</button>
                  </span>
                </form>
                {/* <Accordion defaultActiveKey="0">
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
                </Accordion> */}
                 {/* <Form  onSubmit={saveUpdate}>
                  <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                  <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter category" value={updateCatalog.category} onChange={InputHandler}/>
                  </Form.Group>
                  <Form.Group controlId="formDesignCode">
                    <Form.Label>Design Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter design code" value={updateCatalog.designCode} onChange={InputHandler} />
                  </Form.Group>
                  <Form.Group controlId="formSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Control type="text" placeholder="Enter size" value={updateCatalog.size} onChange={InputHandler}/>
                  </Form.Group>
                  <Form.Group controlId="formWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="text" placeholder="Enter weight" value={updateCatalog.weight} onChange={InputHandler}/>
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" value={updateCatalog.description} onChange={InputHandler}/>
                  </Form.Group>
                </Form>  */}
             
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" type='submit' >
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
