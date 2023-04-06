import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import axios from "axios";
import { useState, useEffect,useContext } from "react";
import { MyTheLoai } from "../../assets/js/constant";
import { Link } from "react-router-dom";
import { Cookie } from "universal-cookie";
import { useCookies } from "react-cookie";

const Header = ({setclickSearch}) => {
  const [cookies] = useCookies(['gmail'])
  const { theLoai, setTheLoai} = useContext(MyTheLoai);
  // console.log('log', theLoai)
  const [theloai, settheloai] = useState([]);

  function toggle(id) {
      setclickSearch(1)
    }

  useEffect(() => {
    axios.get('http://localhost:1337/api/the-loais').then((res) => {
      // clg res ra roi muon lay cai gi thi lay cai do
      // day muon lay the loai thoi
      // viet js thi khi lam viec voi .map() thi nen ? vi k biet cai do co du lieu k, neu null thi se loi,
      // lay res ve thi nen dat 1 cai bien de nhan biet;
      const resultType = res?.data?.data?.map(
        (item) => item?.attributes?.tenLoai
      ); // lay ra arr[] ten loai
      settheloai(resultType); //sai ni dependency thu 2 cua useEffect la 1 ham // set State tenLoai
    });
  }, []);
  
 

  const renderItem = () =>
    theloai?.map((item, index) => (
      <li  key={index}>
        <Link onClick={()=>setTheLoai(index+1)} to="/theloai">{item}</Link>
      </li>
    ));

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to='/'>
                <img src={require("../../assets/img/logo.png")} alt=""></img>
              </Link>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active">
                    {/* <a href="./">Trang chủ</a> */}
                    <Link to={'/'}>Trang chủ</Link>
                  </li>
                  <li>
                    {/* <Link ></Link> */}
                    <Link to={'/theloai'} >
                      Thể loại <span className="arrow_carrot-down"></span>
                    </Link>
                    <ul className="dropdown">
                      {/* {theloai.map((item, index) => {
                        console.log('item', item)
                        return (
                          <li key={index}>
                            <a href="/theloai">{item}</a>
                          </li>
                        );
                      })} */}
                      {renderItem()}
                    </ul>
                  </li>
                  <li>
                    {/* <a href="./Follow">Theo dõi</a> */}
                    <Link to={'/Follow'}>Theo dõi</Link>
                  </li>
                  <li>
                    <a href="#">Panpage</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right">
              <b className="HiUser">{cookies.gmail}</b>
              <a href="#" onClick={()=>toggle()} className="search-switch">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
              <Link to={'/Login'}>
                <i className="fa-solid fa-user"></i>
              </Link>
              {/* <a href="./Login">
              </a> */}
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
};

export default Header;
