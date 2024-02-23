import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BiSolidUserCircle } from "react-icons/bi"
const ManageUsers = () => {
    const navigate = useNavigate();
    return (
        <>
           <div className="container mt-5" >
        <div className="pt-3"><h3 className="text-dark text-center mt-4">Manage Users</h3>
          <hr /></div>
                <div className='text-center border-bottom pb-3 pt-3'><button className='btn btn-secondary' onClick={() => navigate('/add_user')}>Add New User</button></div>
                <div>
                    <div className='row pt-4 d-flex justify-content-evenly'>
                        <div className='col-sm-6 col-md-4 col-lg-3 mt-1 mb-1'>
                        <Card  className='' style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle className='icon' style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>Customers' List</Card.Title>
                            </Card.Body>
                                <Button variant="secondary"  onClick={() => { navigate('/customer') }}>Check List</Button>
                        </Card>
                        </div>
                        <div className='col-sm-6 col-md-4 col-lg-3 mt-1 mb-1'>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle className='icon' style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>Distributors' List</Card.Title>
                            </Card.Body>
                                <Button variant="secondary" onClick={() => { navigate('/distributor') }}>Check List</Button>
                        </Card>
                        </div>
                        <div className='col-sm-6 col-md-4 col-lg-3 mt-1 mb-1'>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle className='icon' style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>WorkShops' List</Card.Title>
                            </Card.Body>
                                <Button variant="secondary" onClick={() => { navigate('/workshops') }}>Check List</Button>
                        </Card>
                        </div>
                        <div className='col-sm-6 col-md-4 col-lg-3 mt-1 mb-1'>
                        <Card style={{ width: '14rem' }}>
                            <Card.Body className='ms-auto me-auto justify-content-center'>
                                <div className='text-center'><BiSolidUserCircle className='icon' style={{ height: "60%", width: "60%", borderRadius: "50%" }} /></div>
                                <Card.Title>Karigars' List</Card.Title>
                            </Card.Body>
                                <Button variant="secondary" onClick={() => { navigate('/kariger') }}>Check List</Button>
                        </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageUsers
