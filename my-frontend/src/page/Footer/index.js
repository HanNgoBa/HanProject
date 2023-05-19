import React from 'react'
import '../../assets/css/bootstrap.min.css'
// import '../../assets/css/variable.scss'
// import '../Header/header.scss'
import '../../assets/css/style.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="page-up">
                <a href="#" id="scrollToTopButton"><i className="fa-solid fa-arrow-up"></i></a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer__logo">
                            <Link to={'/'}><img src={require("../../assets/img/logo.png")} alt=""></img></Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav">
                            <ul>
                                <li className="active">
                                    <Link to={'/'}>Homepage</Link>
                                </li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <p>Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet.</p>
                        
        
                    </div>
                </div>
            </div>
        </footer>
        )
}

export default Footer;