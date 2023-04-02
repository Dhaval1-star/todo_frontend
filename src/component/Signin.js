import React, { useContext, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../axios/axios'
import  signinimage  from '../images/signin-image.jpg'
import Cookies from 'universal-cookie';
import signInReducer from '../reducer/signInReducer';
import { UserContext } from '../App';

function Signin() {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const cookies = new Cookies();
    const navigator = useNavigate();
    const { data1 , userGetSignIn , userGetSignOut} = useContext(UserContext);
    const [error , setError] = useState(false)
    // console.log(data1 , userGetSignIn , userGetSignOut , "from sign in")
    
    async function signInApiCall(e) {
        e.preventDefault()

        const data = {
            email : email,
            password : password
        }

        const signin = instance({
            url : "/signIn",
            method : "POST",
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((responce) => {
            console.log(responce, "responce")
            cookies.set('token' , responce.data.data.token , { path: '/' });
            userGetSignIn(responce.data.data)
            navigator("/")
            setError(false)
        }).catch((err) => {
            setError(true)
        })

        // if (signin.status == 200) {
        //     return 
        // }
        // if (signin.message) {
        //     console.log("hi ")
            
        // }
        // console.log(signin.message)

    }

  return (
    <>
        <div className="main">
            <section class="sign-in">
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure><img src={signinimage} alt="sing up image"/></figure>
                            <Link to="/register" class="signup-image-link">Create an account</Link>
                        </div>

                        <div class="signin-form">
                            <h2 class="form-title">Sign in</h2>
                            <form class="register-form" id="login-form">
                            <div class="form-group">
                                    <input type="email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} name="email" id="email" placeholder="Your Email"/>
                                </div>
                                <div class="form-group">
                                    <input type="password" value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} name="your_pass" id="your_pass" placeholder="Password"/>
                                </div>
                                {/* <div class="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                    <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                                </div> */}
                                <div class="form-group form-button">
                                    {/* <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/> */}
                                    <input type="btn btn-primary" style={{ "width" : "fit-content" }} onClick={signInApiCall} name="signin" id="signin" class="form-submit" value="Log in"/>
                                    {
                                        error ? <p style={{"color" : "red"}}>Please Enter Appropriate Data *</p> : ""
                                    }
                                    {/* <p style={{"color" : "red"}}>Please Enter Appropriate Data *</p> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}

export default Signin