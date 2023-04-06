import React, { Component } from 'react'
import '../../assets/css/bootstrap.min.css'
// import '../../assets/css/variable.scss'
// import '../Header/header.scss'
import '../../assets/css/style.css'
import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { ChapTruyen } from '../../assets/js/constant';
import { useParams } from 'react-router-dom';
import Comment from '../Comment';
import { TruyenTranh } from "../../assets/js/constant";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChapComic = () =>{
    const navigate = useNavigate();
    const [cookies] = useCookies(['idUser'])
    const {idTruyen1} = useParams()
    const {idChap1 }= useParams()
    const idChap = document.getElementById('idchap')
    const [chap,setchap] = useState(1)
    const [chapData,setChapData] = useState([])
    const [anhdata,setanhdata] = useState([])
    const {idChapTruyen,setidChapTruyen} = useContext(ChapTruyen)
    // const {idTruyen, setidTruyen} = useContext(TruyenTranh) 
    // console.log('id TruyenDetail ->', idTruyen)
    const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
    const [chaphienco,setchaphienco] = useState('')

    const commentUser = document.getElementById('textComment')
    // 
    const idKhachHang = cookies.idUser

    useEffect(() => {
        axios.get(`http://localhost:1337/api/truyens?populate=*&filters[id]=${idTruyen1}`)
        .then(res => {
            console.log('a123',res.data.data[0]?.attributes?.chap_truyens?.data)
           const listchapdata = res.data.data[0]?.attributes?.chap_truyens?.data.map(
                (chap) => chap?.id
           )
           console.log("list ->",listchapdata)
            setChapData(listchapdata)
        })
    },[])
    // console.log('id chap truyen ->', idChapTruyen)
    useEffect(() => {
        axios.get(`http://localhost:1337/api/anh-truyens?filters[chap_truyen]=${idChap1}&populate=*`)
        .then(res => {
            const renderAnh2 =res?.data?.data[0]?.attributes.noiDungAnh.data.map(
                (anh3) => `${href}${anh3?.attributes?.url}`
            )
            setanhdata(renderAnh2)
        })
    },[])


    const renderChap =() =>
        anhdata?.map((item,index) =>(
            <div key={anhdata[index]} className="blog__details__pic">
                <img src={item}></img>
            </div>
        ))

    useEffect(() =>{
        setchap(idChap)
    },idChap)

    

    //Render Binh Luan
    var now = new Date();
    const [gmailuser,setgmailuser] = useState([])
    const [timeComment,setTimeComment] = useState([])
    const [noidung,setnoidung] = useState([])
    // const [idNguoiBinhLuan,setidNguoiBinhLuan] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:1337/api/binh-luans?filters[chap_truyens]=${idChap1}&populate=*`)
        .then(res => {
            const returnGmail = res?.data?.data?.map(
                (gmail1) => gmail1?.attributes?.user?.data?.attributes?.email
            )
            console.log('gmail -->', returnGmail)
            const returnTimeComment = res?.data?.data?.map(
                // (timeComment) => ((timeComment?.attributes.user.data.attributes.createdAt).getTime() -now.getTime())
                (timeComment) => timeComment?.attributes?.createdAt 

            )
            const returnNoiDung = res?.data?.data?.map(
                (noidung) =>noidung?.attributes?.noiDung
            )
            console.log("noidung =>", returnNoiDung)
            // const returnidUserBL = res?.data?.data?.map(
            //     (idUBL) =>idUBL?.attributes?.user?.data.id
            // )
            // setidNguoiBinhLuan(returnidUserBL)
            setgmailuser(returnGmail)
            setTimeComment(returnTimeComment)
            setnoidung(returnNoiDung)
        })
    },[])
    // useEffect(()=> {
    //     axios.get(`http://localhost:1337/api/users/${idNguoiBinhLuan}?populate=*`)
    //     .then(res =>{
    //         console.log('user1 ->', res?.data)
    //         const returnAnhUser = res?.data?.data.map(
    //             (imgUser) => imgUser?.attributes
    //         )
    //     })
    // },[])
    const [anhUser,setanhUser] = useState([])
    
    useEffect(()=>{
            axios.get(`http://localhost:1337/api/users/4?populate=*`)
            .then(res=> {
                const returnAnhUser = res?.data?.avata?.url
                
                setanhUser(`${href}${returnAnhUser}`)
            }
        )
    },[])
        


    const renderBinhLuan = () =>
    noidung?.map((item,index) =>
    (
        <>
            <div key={index} class="anime__review__item">
                <div class="anime__review__item__pic">
                    <img src={anhUser} alt=""></img>
                </div>
                <div class="anime__review__item__text">
                    <h6>{gmailuser[index]} - <span>{timeComment[index]}</span></h6>
                    <p>{noidung[index]}</p>
                </div>
        </div>


        
        </>
    ))


    //Add BInh luan 
    
   // const AddComment =
    //  useEffect(()=>{
    //     axios.post('http://localhost:1337/api/binh-luans', 
    //     {
    //         "data": {
    //             "noiDung":commentUser,
    //             "users":idKhachHang,
    //             "chap_truyens": idChap1
    //         }
    //     })
    // },[])
    const AddComment = async (e) =>{
        // e.preventDefault()
        if(idKhachHang!=null)
        {
            const reponse = await axios.post('http://localhost:1337/api/binh-luans',{
            "data": {
                            "noiDung":commentUser.value,
                            "users":idKhachHang,
                            "chap_truyens": idChap1
                        }
        }) 
        }
        else{
            navigate("/Login");
        }
    }


    return(
        <>
        <section className="blog-details spad">
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                    <div className="blog__details__title">
                        <h6>Ngày up <span>- March 08, 2020</span></h6>
                        <h2>Tên truyện </h2>
                        <div className="d-flex justify-content-center select-box">
                            <button className="btn-control">
                                <i className="fa-solid fa-circle-caret-right"></i>
                                Back
                            </button>
                            <select id='idchap' className=" js-example-basic-single" name="state">
                                {chapData.map((e,index) => {
                                    return(
                                        <option key={e['id']} value="#">{index+1}</option>
                                    )
                                })}
                            </select>
                            <button className="btn-control">
                                <i className="fa-solid fa-circle-caret-right"></i>
                                Next
                            </button>
                            <button className="ep"><i className="fa-solid fa-heart"></i> Theo dõi</button>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-12">
                    
                    {/* <div className="blog__details__pic">
                        <img src="img/blog/details/blog-details-pic.jpg" alt=""></img>
                    </div> */}
                    {renderChap()}
                </div>
                <div className="d-flex justify-content-center select-box">
                            <button className="btn-control">
                                <i className="fa-solid fa-circle-caret-right"></i>
                                Back
                            </button>
                            <select id='idchap' className=" js-example-basic-single" name="state">
                                {chapData.map((e,index) => {
                                    return(
                                        <option key={e['id']} value="#">{index+1}</option>
                                    )
                                })}
                            </select>
                            <button className="btn-control">
                                <i className="fa-solid fa-circle-caret-right"></i>
                                Next
                            </button>
                            
                </div>
            </div>
        </div>
    </section>
     {/* Comment */}
     <section class="anime-details spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="anime__details__review">
                        <div class="section-title">
                            <h5>Reviews</h5>
                        </div>
                        {/* <div class="anime__review__item">
                            <div class="anime__review__item__pic">
                                <img src="img/anime/review-1.jpg" alt=""></img>
                            </div>
                            <div class="anime__review__item__text">
                                <h6>Chris Curry - <span>1 Hour ago</span></h6>
                                <p>whachikan Just noticed that someone categorized this as belonging to the genre
                                "demons" LOL</p>
                            </div>
                        </div>
                        
                        <div class="anime__review__item">
                            <div class="anime__review__item__pic">
                                <img src="img/anime/review-6.jpg" alt=""></img>
                            </div>
                            <div class="anime__review__item__text">
                                <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                                <p>Where is the episode 15 ? Slow update! Tch</p>
                            </div>
                        </div> */}
                        {renderBinhLuan()}
                    </div>
                    <div class="anime__details__form">
                        <div class="section-title">
                            <h5>Your Comment</h5>
                        </div>
                        <form>
                            <textarea id='textComment' placeholder="Your Comment"></textarea>
                            <button onClick={()=>AddComment()} type="submit"><i class="fa fa-location-arrow"></i> Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}
export default ChapComic