import React, { useEffect } from "react";
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Login = (user) =>{
    const navigate = useNavigate();

    const [userName, setuserName] = useState('')
    const [pass, setpass] = useState('')
    const [email,setemail] =useState('')
    
    const [getPage,setgetPage] = useState('')
    const [cookies, setCookie] = useCookies(['TKUser']);
    
    const handleSubmit =async (e) =>{
        e.preventDefault()
        
        const reponse = await axios.post('http://localhost:1337/api/auth/local',{
            "identifier": document.getElementById('user').value,
            "password": document.getElementById('pass').value
        }) 
        console.log(reponse.data.user.email)
        // alert(reponse.data.jwt)
    if(reponse.data.jwt!=null)
    {
        alert("Đăng nhập thành công")
        // setgetPage('/')
        navigate("/");
        setCookie('gmail',reponse.data.user.email, {path:'/'})
        setCookie('idUser',reponse.data.user.id,{path:'/'})
    }
    else{
        alert("Kiểm tra lại thông tin đăng nhập")
        navigate("/Login");
    }

    }
    return(
        <>
    <section className="normal-breadcrumb set-bg" data-setbg="./src/assets/img/normal-breadcrumb.jpg">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="normal__breadcrumb__text">
                        <h2>Login</h2>
                        <p>Chào mừng đến Web Comic</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Normal Breadcrumb End --> */}

    {/* <!-- Login Section Begin --> */}
    <section className="login spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="login__form">
                        <h3>Login</h3>
                        <form onSubmit={handleSubmit} action="#">
                            <div className="input__item">
                                <input id="user"   onChange={(e)=> setuserName(e.target.value)} type="text" placeholder="User Name"></input>
                                <span className="icon_mail"><i className="fa-solid fa-user"></i></span>
                            </div>
                            <div className="input__item">
                                <input id="pass"  onChange={(e)=> setpass(e.target.value)} type="password" placeholder="Password"></input>
                                <span className="icon_lock"><i className="fa-solid fa-lock"></i></span>
                            </div>
                            <button type="submit"  className="site-btn">Login Now</button>
                        </form>
                        <a href="#" className="forget_pass">Forgot Your Password?</a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="login__register">
                        <h3>Dont’t Have An Account?</h3>
                        <a href="/Register" className="primary-btn">Register Now</a>
                    </div>
                </div>
            </div>
            <div className="login__social">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6">
                        <div className="login__social__links">
                            <span>or</span>
                            <ul>
                                <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With
                                Facebook</a></li>
                                <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
                                <li><a href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}


export default Login