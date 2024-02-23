import React from 'react'
import { useEffect, useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CatalogMenu = () => {
    const navigate = useNavigate();
    const [catalog, setCatalog] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchCatalog = async () => {
            axios.get(`http://139.59.58.151:8000/getallcatalog/category`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((res) => {
                console.log(res.data)
                setCatalog(res.data.data);
            })
        }
        fetchCatalog();
    }, [catalog]);
    return (

        <>
            <div className='container pt-5 mt-5 '>
                <div className="pt-2"><h3 className="text-dark text-center mt-2">Catalogue Menu</h3>
                    <hr /></div>
                <div className='row ms-auto me-auto'>
                    {catalog && catalog.map((items, index) => {
                        return (
                            <div className='col-sm-6 col-md-6 col-lg-3'>
                                <Card className='ms-2 mt-2 text-center' style={{ width: '16rem', }}  >
                                    <Card.Img variant="top" className='p-2 mt-2 ms-auto me-auto' style={{ width: '14rem', height: '14rem' }} src={items.image} />
                                    <Card.Body>
                                        <div className="d-grid ">
                                            {/* <hr /> */}
                                            <Button variant="secondary" size='lg' onClick={() => { navigate(`/catalog_update/${items.category}`) }} >
                                                {items.category}
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CatalogMenu
