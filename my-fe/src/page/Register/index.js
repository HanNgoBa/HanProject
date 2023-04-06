import React from "react";
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import { useState } from "react";
import axios from "axios";

const Register = () =>{
    const [userName,setuserName] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const handleSubmit = (e)=>{
        alert(userName + email + pass)
        axios.post('http://localhost:1337/api/auth/local/register',{
            "username":  userName,
            "email": email,
            "password":pass
        })
        .then((res)=> {
            console.log('111', res)
        })
        .catch((error)=>{
            console.log("loi", error)
        })
    }

return(
<>
    <section className="normal-breadcrumb set-bg" data-setbg="img/normal-breadcrumb.jpg">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="normal__breadcrumb__text">
                        <h2>Sign Up</h2>
                        <p>Welcome to the official Anime blog.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Normal Breadcrumb End --> */}

    {/* <!-- Signup Section Begin --> */}
    <section className="signup spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="login__form">
                        <h3>Sign Up</h3>
                        <form onSubmit={handleSubmit} action="/Login">
                            <div className="input__item">
                                <input  type="text" onChange={(event) => setemail(event.target.value)} placeholder="Email address"/>
                                <span className="icon_mail">
                                    <i className="fa-solid fa-envelope"></i>
                                </span>
                            </div>
                            <div className="input__item">
                                <input type="text" onChange={(event) => setuserName(event.target.value)} placeholder="User Name"/>
                                <span className="icon_profile"><i className="fa-solid fa-user"></i></span>
                            </div>
                            <div className="input__item">
                                <input  type="password" onChange={(event) => setpass(event.target.value)} placeholder="Password"/>
                                <span className="icon_lock"><i className="fa-solid fa-lock"></i></span>
                            </div>
                            <button type="submit" className="site-btn">Login Now</button>
                        </form>
                        <h5>Already have an account? <a href="#">Log In!</a></h5>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="login__social__links">
                        <h3>Login With:</h3>
                        <ul>
                            <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With Facebook</a>
                            </li>
                            <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
                            <li><a href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}


export default Register