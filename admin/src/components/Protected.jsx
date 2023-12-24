import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        let tokendata = localStorage.getItem("token");
        if(tokendata == null){
            navigate("/")
        }
    })
  return (
    <>
    <Component/>
    </>
  )
}