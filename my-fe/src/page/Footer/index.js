import React from 'react'
import '../../assets/css/bootstrap.min.css'
// import '../../assets/css/variable.scss'
// import '../Header/header.scss'
import '../../assets/css/style.css'

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
                            <a href="/"><img src={require("../../assets/img/logo.png")} alt=""></img></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav">
                            <ul>
                                <li className="active"><a href="/">Homepage</a></li>
                                <li><a href="./categories.html">Categories</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <p>Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.</p>
                        
        
                    </div>
                </div>
            </div>
        </footer>
        )
}

export default Footer;