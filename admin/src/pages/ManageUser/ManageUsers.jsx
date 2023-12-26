import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BiSolidUserCircle } from "react-icons/bi"
const ManageUsers = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='container mt-5 pt-5'>
                <div className="pt-3"><h3 className="text-dark text-center" ><strong>Manage Users</strong></h3>
                    <hr />
                </div>
                <div className='text-center border-bottom pb-3 pt-3'><button className='btn btn-secondary' onClick={() => navigate('/add_user')}>Add New User</button></div>
                <div>
                    <div className='row pt-4 d-flex justify-content-evenly'>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>Customers' List</Card.Title>
                                {/* <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text> */}
                                <Button variant="secondary" onClick={() => { navigate('/customer') }}>Check List</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>Distributors' List</Card.Title>
                                {/* <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text> */}
                                <Button variant="secondary" onClick={() => { navigate('/distributor') }}>Check List</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>WorkShops' List</Card.Title>
                                {/* <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text> */}
                                <Button variant="secondary" onClick={() => { navigate('/workshops') }}>Check List</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>  Karigers' List</Card.Title>
                                {/* <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text> */}
                                <Button variant="secondary" onClick={() => { navigate('/kariger') }}>Check List</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageUsers