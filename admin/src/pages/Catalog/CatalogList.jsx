import React from 'react'
import { useEffect, useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CatalogList = () => {
    const navigate = useNavigate();
    const [catalog, setCatalog] = useState([]);
    useEffect(() => {
        const fetchCatalog = async () => {
            axios.get(`http://139.59.58.151:8000/getallcatalog/category`).then((res) => {
                console.log(res.data)
                setCatalog(res.data.data);
            })
        }
        fetchCatalog();
    }, [catalog]);
    return (

        <>
            <div className='container pt-5 mt-5'>
            <div className="pt-2"><h3 className="text-dark text-center mt-2"><strong>Catalog Menu</strong></h3>
          <hr /></div>
        <div className='row'>
                {catalog && catalog.map((items, index) => {
                    return (
                        <Card className='ms-2 mt-2' style={{ width: '18rem', }}  >
                            <Card.Img variant="top" className='p-2' style={{ width: '14rem', height: '14rem' }} src='' />
                            <Card.Body>

                            </Card.Body>
                            <Card.Body>
                                <Button variant="secondary" onClick={() => { navigate('/catalog_update', { categry: items }) }} >
                                    {items}
                                </Button>
                            </Card.Body>
                        </Card>

                    )
                })}
                </div>
            </div>
        </>
    )
}

export default CatalogList