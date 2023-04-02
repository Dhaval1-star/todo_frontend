import React, { useState } from 'react'
import signUpImage from '../images/signup-image.jpg'
import './register.css'
import  instance  from '../axios/axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate();

    async function submitForm(e) {
        e.preventDefault()

        console.log(name , "name " , email , "email" , password , "password")

        const data = {
            name : name,
            password : password,
            email : email, 
            token : ''
        }

        console.log(data , "data")
        const registerUser = await instance({
            method : "POST",
            url : "/register" , 
            data : data , 
            headers : {
                    'content-type': 'application/json',
            }
        })
        
        if (registerUser.status == 200) {
            setName("")
            setEmail("")
            setPassword("")
            navigate("/signIn");
        }

        console.log(registerUser , "registerUser")
    }

  return (
    <>
        <div class="main">
            <section class="signup">
                <div class="container">
                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Sign up</h2>
                            <form  class="register-form" id="register-form">
                                <div class="form-group">
                                    <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" value={name} onChange={(e) => {
                                        setName(e.target.value)
                                    }} name="name" id="name" placeholder="Your Name"/>
                                </div>
                                <div class="form-group">
                                    <label for="email"><i class="zmdi zmdi-email"></i></label>
                                    <input type="email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} name="email" id="email" placeholder="Your Email"/>
                                </div>
                                <div class="form-group">
                                    <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} name="pass" id="pass" placeholder="Password"/>
                                </div>
                                <div class="form-group form-button">
                                    {/* <input type="submit" onSubmit={submitForm}  value="Register" class="form-submit"/> */}
                                    <input type="button" onClick={submitForm}  value="Register" class="form-submit"/>
                                </div>
                            </form>
                        </div>
                        <div class="signup-image">
                            <figure><img src={signUpImage} alt="sing up image"/></figure>
                            <a href="#" class="signup-image-link"><Link to="/signIn"> I am already member </Link></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}

export default Register