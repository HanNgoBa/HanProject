import React from "react";
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import { useEffect,useState,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ChapTruyen } from "../../assets/js/constant";
const Comment =() => {

    // const {idTruyen1} = useParams()
    const [cookies] = useCookies(['idUser'])
    const [noidungAdd,setnoidungAdd] = useState([])
    const [idchap,setidchap] = useState([])
    const [gmailuser,setgmailuser] = useState([])
    const [timeComment,setTimeComment] = useState([])
    const [noidung,setnoidung] = useState([])
    const {idChap,setidChap} = useContext(ChapTruyen)
    const binhluan = document.getElementById('textbinhluan')
    // console.log('the binh luan:',binhluan)
    const idKhachHang = cookies.idUser
    console.log('id chap ow comment->',idChap)
    // useEffect(() => {
    //     axios.post('http://localhost:1337/api/binh-luans', {data})
    //     .then(rest) => { this.

    //     }
    // })
    // hiển thị bình luận cho chap truyện 
    useEffect(()=>{
        axios.get(`http://localhost:1337/api/binh-luans?filters[chap_truyens]=${idChap}&populate=*`)
        .then(res => {
            console.log('data in cm->',res?.data?.data)
            const returnGmail = res?.data?.data?.map(
                (gmail1) => gmail1.attributes.user.data.attributes.gmail
            )
            const returnTimeComment = res?.data?.data?.map(
                (timeComment) => timeComment?.attributes.user.data.attributes.createdAt
            )
            const returnNoiDung = res?.data?.data?.map(
                (noidung) =>noidung?.attributes?.noiDung
            )
            
            setgmailuser(returnGmail)
            setTimeComment(returnTimeComment)
            setnoidung(returnNoiDung)

        })
    },[])
    

    const renderBinhLuan = () =>
    noidung?.map((item,index) =>
    (
        <>
        <div className="anime__review__item__pic">
                    <img src="img/anime/review-1.jpg" alt=""></img>
        </div>
        <div key={index} className="anime__review__item__text">
            <h6>{gmailuser[index]} - <span>{timeComment[index]}</span></h6>
            <p>{noidung[index]}</p>
        </div>
        </>
    ))

    //Add comment 
    // const clickComment =async(e) =>{
    //     const reponse = await axios.post('http://localhost:1337/api/binh-luans',{
    //         "noiDung": {binhluan},
    //         "users": {idKhachHang},
    //         "chap_truyens": 
    //     })
    // }


    return(
    <>
        <div className="anime__details__review">
            <div className="section-title">
                <h5>Bình luận</h5>
            </div>
            <div className="anime__review__item">
                <div className="anime__review__item__pic">
                    <img src="img/anime/review-1.jpg" alt=""></img>
                </div>
                {/* <div className="anime__review__item__text">
                    <h6>Chris Curry - <span>1 Hour ago</span></h6>
                    <p>whachikan Just noticed that someone categorized this as belonging to the genre
                    "demons" LOL</p>
                </div> */}
                {renderBinhLuan()}
                <div className="anime__details__form">
                        <div className="section-title">
                            <h5>Your Comment</h5>
                        </div>
                        <form >
                            <textarea id="textbinhluan" placeholder="Your Comment"></textarea>
                            <button type="submit"><i className="fa fa-location-arrow"></i> Review</button>
                        </form>
                    </div>
            </div>
        </div>
       
    </>
    )
}

export default Comment