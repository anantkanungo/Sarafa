import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
const Workshops = () => {
  const [list, setList] = useState([]);
  const delItem = async (delId) => {
    console.log("delId", delId);
    const res = await axios.delete(`http://139.59.58.151:8000/workshop/delete/${delId}`);
    if (res.data.success) { toast.warn("deleted..."); }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.get("http://139.59.58.151:8000/workshop/list", {
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
        <div className="pt-3"><h3 className="text-dark text-center mt-4"><strong>Workshops</strong></h3>
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
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{items.name}</div>
                      Address:{items.address}
                    </div>
                    {/* <Badge bg="secondary" type="button" className='me-1 cursor-pointer' pill><AiFillEdit />Edit </Badge> */}
                    <Badge bg="danger" type="button" pill onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete </Badge>
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

export default Workshops