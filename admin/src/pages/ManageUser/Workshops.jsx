import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Workshops = () => {
    const [list, setList] = useState([]);
 
 
    useEffect(() => {
      let token = localStorage.getItem("token");
      axios.get("http://139.59.58.151:8000/workshop/list", {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((res)=>{
        setList(res.data);
      })
     }, []);
    console.log("list", list);
    return (
      <>
        <div className="container mt-5" >
          <div className="pt-3"><h3 className="text-dark text-center mt-4"><strong>Workshops</strong></h3>
          <hr /></div>
          <div className=''>
            <div className='list-group'>
            {list && list.data && list.data.map((items, index) => {
                console.log(items);
                return (
                <div className='list-group-flush'>
                  <p>{items.name}</p>
                 
                </div>
                )
              })}
  
            </div>
          </div>
        </div>
      </>
  )
}

export default Workshops