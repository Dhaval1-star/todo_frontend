import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { UserContext } from '../App';
import instance from '../axios/axios';

function Home() {
    const cookies = new Cookies();
    const [data , setData] = useState([])
    const token = cookies.get("token")
    const navigator = useNavigate()
    const data1 = useContext(UserContext)
    
    useEffect(() => {
        if (!data1 || data1 == undefined || data1.status == "signOut") {
            navigator("/signIn")
        }
    } , [data1])

    useEffect(() => {
        if (data1.status == "signOut") {
            navigator("/signIn")
        }
    } , [])

    const homeStyle = {
        "display": "grid",
        "placeContent": "center",
        "height": "80vh",
    }

  return (
    <>
        <div className="home-container" style={homeStyle}>
            <h1>Hi {data1.data ?  data1.data.name : ""} ,Welcome To The Todo App.</h1>
            <input type="button"  value="Go To Todo" class="form-submit" onClick={() => {
                navigator("/todo")
            }}/>
        </div>    
    </>
  )
}

export default Home