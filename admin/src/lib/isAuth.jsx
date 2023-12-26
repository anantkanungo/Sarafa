import React from 'react'
const isAuth = () => {
  return (
    localStorage.getItem("token")
  )
}

export const userType = ()=>{
    return(
      localStorage.getItem("userType")
      
    )
}

export default isAuth
