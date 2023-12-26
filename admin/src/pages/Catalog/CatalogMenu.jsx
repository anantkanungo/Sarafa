import React from 'react'
import { useEffect, useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CatalogMenu = () => {
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
                            <Card className='ms-2 mt-2 text-center' style={{ width: '18rem', }}  >

                                <Card.Body>
                                    <Card.Img variant="top" className='' style={{ width: '14rem', height: '14rem' }} src={items.image} />
                                    <div className="d-grid gap-2">
                                        <hr/>
                                    <Button variant="secondary" size='lg' onClick={() => { navigate(`/catalog_update/${items.category}`) }} >
                                        {items.category}
                                    </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CatalogMenu