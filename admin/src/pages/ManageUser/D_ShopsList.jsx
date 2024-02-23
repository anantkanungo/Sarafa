import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const D_ShopsList = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [list, setList] = useState([]);

    let token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`http://139.59.58.151:8000/distributor/shops/${id}`, {
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
   <div className='container mt-5 pt-5'>
                <div className="pt-2"><h3 className="text-dark text-center mt-2">Shops</h3>
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
                    <div className="ms-2 me-auto"onClick={() => { navigate(`/c_order/list/${items.uid}`) }}>
                      <div className="fw-bold">Name: {items.name}</div>
                      UserId: {items.userId}<br/>
                      Agent Code: {items.agent}<br/>
                       {/* <div className="fw-bold">{items.name}</div> */}
                      Address: {items.address}
                    </div>
                    {/* <Badge bg="secondary"  type= "button" className='me-1 cursor-pointer' pill><AiFillEdit />Edit </Badge> */}
                    {/* <Badge bg="danger" type="button" pill  onClick={() => { delItem(items._id) }}  ><AiFillDelete />Delete </Badge> */}
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

export default D_ShopsList