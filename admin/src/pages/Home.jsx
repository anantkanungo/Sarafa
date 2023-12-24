import React from 'react'
import { GoBook } from "react-icons/go";
import { BiTask } from "react-icons/bi";
import { GoFileDirectory } from "react-icons/go";
import { GrWorkshop } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { MdOutlinePreview } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
     <div className="container mt-5 pt-5">
     <div className="row mt-2">
       <div className="col-sm-2 text-center mb-3">
         <BiTask style={{ fontSize: "60px" }}/>
         <p>Task Assign</p>
       </div>
       <div className="col-sm-2 text-center mb-3">
         <GoBook style={{ fontSize: "60px" }} onClick={()=>{navigate('/catalog_update')}}/>
         <p>Catalog Update</p>
       </div>
       <div className="col-sm-2 text-center mb-3">
         <GrWorkshop style={{ fontSize: "60px" }}/>
         <p>Workshops</p>
       </div>
       <div className="col-sm-2 text-center mb-3">
         <BsFillFileEarmarkPersonFill style={{ fontSize: "60px" }}/>
         <p>Kariger Details</p>
       </div>
       <div className="col-sm-2 text-center mb-3">
         <IoPersonAdd style={{ fontSize: "60px" }}/>
         <p>Add/Remove Customer</p>
       </div>
       <div className="col-sm-2 text-center mb-3">
         <MdOutlinePreview style={{ fontSize: "60px" }}/>
         <p>Review Orders</p>
       </div>
     </div>
   </div>
      {/* <div className="container  mt-5 pt-5 " >
        <div className='icon-bar row' >
          <div className='card-group mt-5'>
            <div className='ms-2'><span className='d-flex mt-2' ><BiTask style={{ flexDirection: 'column', height:"60%", width:"60%", borderRadius:"10%", border: 'solid black' }}/></span><i>Task Assign </i></div>
            <div className='ms-2' onClick={()=>{navigate('/catalog_update')}}><span className='d-flex mt-2 ' ><GoBook style={{ flexDirection: 'column', height:"60%", width:"60%", borderRadius:"10%", border: 'solid black' }}/></span><i>Catalog Update</i></div>
            <div className='ms-2'><span className='d-flex mt-2 ' ><GrWorkshop style={{ flexDirection: 'column', height:"60%", width:"60%", borderRadius:"10%", border: 'solid black' }}/><i>WorkShops </i></span></div>
            <div className='ms-2'><span className='d-flex mt-2 ' ><BsFillFileEarmarkPersonFill style={{ flexDirection: 'column', height:"60%", width:"60%", borderRadius:"10%", border: 'solid black' }}/><i>Kariger Details</i></span></div>
            <div className='ms-2'><span className='d-flex mt-2 ' ><IoPersonAdd style={{ flexDirection: 'column', height:"60%", width:"60%", borderRadius:"10%", border: 'solid black' }} /><i>Add/Remove Customer</i></span></div>
            <div className='ms-2'> <span className='d-flex mt-2 ' ><MdOutlinePreview style={{ flexDirection: 'column', height:"60%", width:"60%", borderRadius:"10%", border: 'solid black' }}/><i>Review Orders</i></span></div>
            </div>
        </div>
     
    </div > */}
  </>
  )
}

export default Home