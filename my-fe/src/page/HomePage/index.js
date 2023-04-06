import React from 'react'
// import "../../assets/css/bootstrap.min.css"
// import "../../assets/css/elegant-icons.css"
import "../../assets/css/font-awesome.min.css"
import "../../assets/css/nice-select.css"
// import "../../assets/css/owl.carousel.min.css"
import "../../assets/css/plyr.css"
import "../../assets/css/slicknav.min.css"
import "../../assets/css/style.css"
import $ from 'jquery'
import axios from "axios";
import { useState, useEffect,useContext, Component } from "react";
import { TruyenTranh } from "../../assets/js/constant";
import { Link } from "react-router-dom";
// 

function HomePage() {
    const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
    //Truyen new 
    const [truyen,settruyen] = useState([])
    const [anhbia,setanhbia] = useState([])
    const [chaphtai,setchaphtai] = useState([])
    const [loai,setloai] = useState([])

    const [idtruyen,setidtruyen] = useState([])
    const {idTruyen,setidTruyen} = useContext(TruyenTranh)

    //Truyen moi ra mat
    const [loaiNew, setLoaiNew] = useState([])
    const [anhNew,setanhNew] = useState([])
    const [chapNew,setchapNew] = useState([])
    const [tenTruyenNew,settenTruyenNew] = useState([])
    const [idTruyenNew,setidTruyenNew] = useState([])

    // hero form slidebar
    const [anhslide,setanhslide] = useState([])
    const [tenbia,settenbia] = useState([])
    const [idtruyenslide,setidtruyenslide] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:1337/api/truyens?pagination[page]=1&pagination[pageSize]=3&populate=*&sort=publishedAt:DESC')
        .then((res)=>{
            const returnanhslide = res?.data?.data.map(
                (anhbiaslide) =>`${href}${anhbiaslide.attributes.anhBia.data[0]?.attributes?.url}`
            )
            const returntenslide = res?.data?.data.map(
                (tenslide) => tenslide?.attributes?.tenTruyen
            )
            const returnidtruyenslide = res.data.data?.map(
                (idslide) => idslide?.id
            ) 
            setidtruyenslide(returnidtruyenslide)
            setanhslide(returnanhslide)
            settenbia(returntenslide)
        })
    },[])
    const renderslides=() => anhslide.map((item,index) =>(
        <>
            <div className="hero__items set-bg" style={{ backgroundImage: `url(${item})` }} >
                <div className="row">
                    <div className="col-lg-6">
                        <div className="hero__text">
                            {/* <div className="label">Adventure</div> */}
                            <h2>{tenbia[index]}</h2>
                            {/* <p>After 30 days of travel across the world...</p> */}
                            {/* <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a> */}
                            <Link key={index} onClick={()=>setidTruyen(idtruyenslide[index])} to={"/ComicDetail/"+idtruyenslide[index]}><span>Watch Now</span> <i className="fa fa-angle-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ))
    useEffect(()=>{
        axios.get('http://localhost:1337/api/truyens?pagination[page]=1&pagination[pageSize]=4&populate=*&sort=publishedAt:DESC')
          .then((res) =>{
            const returnAnhNew= res?.data?.data.map(
              (anhnew) => `${href}${anhnew.attributes.anhBia.data[0]?.attributes?.url}`
            )
            const returnChapNew = res?.data?.data.map(
              (ChapNew) => ChapNew?.attributes?.chapHienCo
            )
            const returnTruyenNew = res?.data?.data.map(
              (TruyenNew) => TruyenNew?.attributes?.tenTruyen
            )
            const returnLoaiNew = res?.data?.data.map(
              (LoaiNew) => LoaiNew?.attributes?.the_loai?.data?.attributes?.tenLoai
            )
            const returnidTruyenNew = res.data.data?.map(
              (idNew) => idNew?.id
            )
            setidTruyenNew(returnidTruyenNew)
            setLoaiNew(returnLoaiNew)
            setanhNew(returnAnhNew)
            setchapNew(returnChapNew)
            settenTruyenNew(returnTruyenNew)
          })
    },[])

    const renderTruyenNew = () => anhNew.map((item,index) =>(
        <>
          <div key={index}
            className="product__sidebar__view__item set-bg mix day years"
            style={{ backgroundImage: `url(${item})` }}
          >
            <div className="ep">Chap {chapNew[index]}</div>
            {/* <div className="view">
              <i className="fa-solid fa-heart"></i> 9141
            </div> */}
            <h5>
              <Link key={index} onClick={()=>setidTruyen(idTruyenNew[index])} to={"/ComicDetail/"+idTruyenNew[index]}> {tenTruyenNew[index]} </Link>
            </h5>
          </div>
        </>
    ));

    //Truyen moi ra mat 
    const [idTruyenNewAdd,setidTruyenNewAdd] = useState([])
    const [anhTruyenNewAdd,setAnhTruyenNewAdd] = useState([])
    const [chapHienTaiNewAdd,setchapHienTaiNewAdd] = useState([])
    const [tenTruyenNewAdd,settenTruyenNewAdd] = useState([])
    const [loaiNewAdd,setloaiNewAdd] = useState([])
    useEffect(() => {
        axios
          .get(
            `http://localhost:1337/api/truyens?pagination[page]=1&pagination[pageSize]=6&populate=*&sort=publishedAt:DESC`
          )
          .then((res) => {
            // console.log('123434',res?.data?.meta?.pagination.pageCount)
            // const returnPageCount = res?.data?.meta?.pagination.pageCount
            const returnTruyen = res?.data?.data.map(
              (truyen) => truyen?.attributes?.tenTruyen
            );
            const returnAnh = res?.data?.data.map(
              (item) => `${href}${item.attributes.anhBia.data[0]?.attributes?.url}`
            );
            const returnchaphtai = res?.data?.data.map(
              (chaphientai) => chaphientai?.attributes?.chapHienCo
            );
            const returnidTruyen = res.data.data?.map(
              (id) => id?.id
            )
            const returnLoaiNew = res?.data?.data.map(
                (LoaiNew) => LoaiNew?.attributes?.the_loai?.data?.attributes?.tenLoai
              )
            // setpagecount(returnPageCount)
            
            setloaiNewAdd(returnLoaiNew)
            setAnhTruyenNewAdd(returnAnh)
            setchapHienTaiNewAdd(returnchaphtai)
            setidTruyenNewAdd(returnidTruyen)
            settenTruyenNewAdd(returnTruyen)
          });
      }, []);

    const renderitemnewadd = () =>
    anhTruyenNewAdd?.map((item, index) => (
      <div key={index} className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
          {/* <img src={item} alt='image'/> */}
          <div
            className="product__item__pic set-bg"
            style={{ backgroundImage: `url(${item})` }}
          >
            {/* {renderChapNow()} */}
            <div className="ep" >
                Chap {chapHienTaiNewAdd[index]}
            </div>
            {/* <div className="comment">
              <i className="fa fa-comments"></i> 11
            </div>
            <div className="view">
              <i className="fa-solid fa-heart"></i> 9141
            </div> */}
          </div>
            <div className="product__item__text">
                <ul>
                    <li>{loaiNewAdd[index]}</li>
                </ul>
                <h5>
                    <Link onClick={()=>setidTruyen(idTruyenNewAdd[index])} to={"/ComicDetail/"+idTruyenNewAdd[index]}> {tenTruyenNewAdd[index]} </Link>
                </h5>
            </div>
        </div>
      </div>
    ));

    // truyen moi up chap
    useEffect(() => {
        axios.get('http://localhost:1337/api/truyens?pagination[page]=1&pagination[pageSize]=15&populate=*&sort=chap_truyens.createdAt:DESC')
        .then((res) =>{
            // console.log('id ',res.data.data[2].id )
            const returnidTruyen = res.data.data?.map(
                (id) => id?.id
              )
              setidtruyen(returnidTruyen)
            // console.log(res.data.data.attributes.tenTruyen)/*2*/ 
            const returnLoai = res?.data?.data?.map(
                (loai) => loai?.attributes?.the_loai?.data?.attributes?.tenLoai
            )
            setloai(returnLoai)
            const returnTruyen = res?.data?.data.map(
                (truyen) => truyen?.attributes?.tenTruyen
            )
            const returnAnh = res?.data?.data.map(
                (anhbia) => `${href}${anhbia.attributes.anhBia.data[0]?.attributes?.url}`
            )
            const returnchaphtai = res?.data?.data.map(
                (chaphientai) => chaphientai?.attributes?.chapHienCo
            )
            const returnloai = res?.data.data.map(
                (theloai) => theloai?.IdLoaithe_loai?.data?.attributes?.tenLoai
            )
            let ArrAnh =[ ]
            returnAnh.filter((item,index) => returnAnh.indexOf(item)===index)
            
            settruyen(returnTruyen)
            setanhbia(returnAnh)
            setchaphtai(returnchaphtai)
        })
    },[])

    

    const renderitem = () =>
    anhbia?.map((item, index) => (
      <div key={index} className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
          {/* <img src={item} alt='image'/> */}
          <div
            className="product__item__pic set-bg"
            style={{ backgroundImage: `url(${item})` }}
          >
            {/* {renderChapNow()} */}
            <div className="ep" >
                Chap {chaphtai[index]}
            </div>
            {/* <div className="comment">
              <i className="fa fa-comments"></i> 11
            </div>
            <div className="view">
              <i className="fa-solid fa-heart"></i> 9141
            </div> */}
          </div>
            <div className="product__item__text">
                <ul>
                    <li>{loai[index]}</li>
                </ul>
                <h5>
                    <Link onClick={()=>setidTruyen(idtruyen[index])} to={"/ComicDetail/"+idtruyen[index]}> {truyen[index]} </Link>
                </h5>
            </div>
        </div>
      </div>
    ));
    

// const hero_s = document.querySelector(".hero__slider");
// const items = hero_s.querySelectorAll('.owl-item');
// const dots = hero_s.querySelector('.owl-dots');
// const prev = hero_s.querySelector('.owl-prev');
// const next = hero_s.querySelector('.owl-next');
// const width = hero_s.clientWidth;

// let current = 0;

// prev.addEventListener('click', (e) => {
//   e.preventDefault();
//   if (current > 0) {
//     current -= 1;
//   } else {
//     current = items.length - 1;
//   }
//   scrollTo(current * width);
// });

// next.addEventListener('click', (e) => {
//   e.preventDefault();
//   if (current < items.length - 1) {
//     current += 1;
//   } else {
//     current = 0;
//   }
//   scrollTo(current * width);
// });

// dots.addEventListener('click', (e) => {
//   e.preventDefault();
//   if (e.target.tagName === 'SPAN') {
//     current = Array.from(dots.children).indexOf(e.target);
//     scrollTo(current * width);
//   }
// });

// function scrollTo(pos) {
//   items.forEach((item) => {
//     item.style.transform = `translateX(-${pos}px)`;
//   });
// }
    
    return(
            <>
            {/* <section className="hero">
                <div className="container">
                    <div  className="hero__slider owl-carousel" >
                        {renderslides()}
                    </div>
                </div>
            </section> */}
           
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trending__product">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <div className="section-title">
                                            <h4>Truyện mới</h4>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="btn__all">
                                            <a href="/NewComic" className="primary-btn">View All <span className="arrow_right"></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {renderitem()}
                                </div>
                            </div>
                            
                            <div className="recent__product">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <div className="section-title">
                                            <h4>Truyện mới ra mắt</h4>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="btn__all">
                                            <a href="/ComicNewAdd" className="primary-btn">View All <span className="arrow_right"></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <div className="col-lg-4 col-md-6 col-sm-6">
                                        <div className="product__item">
                                            <div className="product__item__pic set-bg" data-setbg="img/recent/recent-1.jpg">
                                                <div className="ep">Chap 18</div>
                                                
                                            </div>
                                            <div className="product__item__text">
                                                <ul>
                                                    <li>Active</li>
                                                </ul>
                                                <h5><a href="#">Great Teacher Onizuka</a></h5>
                                            </div>
                                        </div>
                                    </div> */}
                                    {renderitemnewadd()}
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="product__sidebar">
                                <div className="product__sidebar__view">
                                    <div className="section-title">
                                        <h5>Truyện mới ra mắt</h5>
                                    </div>
                                    
                                    <div className="filter__gallery">
                                        
                                        {renderTruyenNew()}
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
</>
    );
         
}

export default HomePage;

