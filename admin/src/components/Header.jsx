import React from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { PiNotionLogoFill } from "react-icons/pi";
import isAuth from '../lib/isAuth';


const Header = () => {
  const navigate = useNavigate();
  const LogoutData = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-body-tertiary fixed-top" style={{ borderBottom: "4px inset" }}>
      <div className="container-fluid" >
        <Link className="navbar-brand mx-3" to="/" style={{ color: "#000" }}><img src="/assets/icons/logo.png" alt='NgJewel' style={{ height: 50, width: 50, borderRadius: '50%', margin: 3 }} /><strong>Admin</strong></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        {isAuth() ? (
           <div className="collapse navbar-collapse" id="navbarText">
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/task_assign">Assign Task</Link>
              </li>
              <NavDropdown title="Catalog" id="basic-nav-dropdown">
              <Link className="nav-link" to="/catalog_menu">All Catalog</Link>
              <Link className="nav-link" to="/catalog_create">Add Catalog</Link>

            </NavDropdown>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/catalog_update">Catalog Update</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/workshops">Workshops</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kariger">Kariger Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage_users">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/review_orders">Review Orders</Link>
              </li>
            </ul>
            <span className="navbar-text">
              <Link className="nav-link" onClick={LogoutData}>Logout</Link>
            </span>
          </div>
           ): ( <div className="collapse navbar-collapse" id="navbarText">
           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
   
             <li className="nav-item">
               <Link className="nav-link" to="/login">Login</Link>
             </li>
            
           </ul>
   
         </div>)}
        </div>
     
     

    </nav>
  )
}

export default Header