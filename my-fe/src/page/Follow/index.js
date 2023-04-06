import React from "react";
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'
import { Link } from "react-router-dom";
import { useState,useContext,useEffect } from "react";
import axios from "axios";
import { TruyenTranh } from "../../assets/js/constant";

import { useCookies } from "react-cookie";
const Follow =() =>{
    const {idTruyen,setidTruyen} = useContext(TruyenTranh)
    const [cookies] = useCookies(['idUser'])
    const [anhtruyenfl,setanhtruyenfl] = useState([])
    const [tentruyenfl,settentruyenfl] = useState([])
    const [chaphiencofl,setchaphiencofl] = useState([])
    const [idtruyenfl,setidtruyenfl] = useState([])
    const [theloaifl,settheloaifl] = useState([])
    const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
    const idDocGia = cookies.idUser
    useEffect(()=>{
        axios.get(`http://localhost:1337/api/theo-dois?populate[0]=users&populate[1]=truyens&filters[users]=${idDocGia}`)
        .then((res)=>{
            const returnidfl = res.data.data.map(
                (idtruyen) => idtruyen.attributes.truyens.data[0].id
            )
            const returnTenTruyenfl = res.data.data.map(
                (tentruyen) =>tentruyen.attributes.truyens.data[0].attributes.tenTruyen
            )
            const returnchap = res.data.data.map(
                (chapfl)=>chapfl.attributes.truyens.data[0].attributes.chapHienCo
            )

            setchaphiencofl(returnchap)
            settentruyenfl(returnTenTruyenfl)
            setidtruyenfl(returnidfl)
            return returnidfl
        })
        .then((idtruyenfl)=>{
            let theloai= [];
            let anh=[];
            let users = [];
            let promises = [];
             idtruyenfl.map((item,index)=>{
                console.log(index)
                promises.push(
                    axios.get(`http://localhost:1337/api/truyens?filters[id]=${item}&populate=*`)
                )
                Promise.all(promises).then((responses) => {
                  if(responses.length == idtruyenfl.length){
                    users = responses;
                       users.map(
                            (anhdata) =>{ anh.push(`${href}${anhdata.data.data[0].attributes.anhBia.data[0].attributes.url}`)}
                        ) 
                        setanhtruyenfl(anh)
                        users.map((theloaidata)=>{
                                    theloai.push(theloaidata.data.data[0].attributes.the_loai.data.attributes.tenLoai)
                               })
                               settheloaifl(theloai)
                               console.log(theloai) 
                       
                        }
                    })
                      // users.map(
                    //         (anhdata) =>{  anh.push(`${href}${anhdata.data.data[0].attributes.anhBia.data[0].attributes.url}`)}
                    //     )    
                //     // const returnanh = users.data.data.map(()=>{
                //     //     (anhdata) =>`${href}${anhdata.attributes.anhBia.data[0].attributes.url}`
                //     //     anh.push(returnanh)
                //     // }
                //     // )
                //     // const returntheloai = users.data.data.map(()=>{
                //     //     (theloadata)=>theloadata.attributes.the_loai.data.attributes.tenLoai
                //     //     theloai.push(returntheloai)
                //     // }
                //     // )
                   
                
                // }).then(console.log("check",anh));



            //  axios.get(`http://localhost:1337/api/truyens?filters[id]=${item}&populate=*`)
            //     .then((res1)=>{
                 
            //         const returnanh = res1.data.data.map(
            //             (anh) =>`${href}${anh.attributes.anhBia.data[0].attributes.url}`
            //         )
            //         const returntheloai = res1.data.data.map(
            //             (theloai)=>theloai.attributes.the_loai.data.attributes.tenLoai
            //         )
            //             theloai.push(returntheloai)
            //             anh.push(returnanh)
            //             return {"theloai": theloai, "anh": anh};
            //     }).then((data)=>{
            //         //console.log('anh2 ->',data.length)
            //         console.log(data.anh)
            //         console.log(data.theloai)
            //         console.log(data.anh.length)
              
            //         console.log('anh4 ->')
            //         //console.log('anh3 ->',typeof(anh))
            //         // setanhtruyenfl(data.anh)
            //         // settheloaifl(data.theloai)
            //     }) 
            })
        }
        )
    },[])

    const rederTruyenFL = ()=> anhtruyenfl.map((item,index)=>(
   
            <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                    <div className="product__item__pic set-bg" 
                    style={{ backgroundImage: `url(${item})` }}>
                        <div className="ep">Chap ${chaphiencofl[index]}</div>
                        {/* <div className="comment"><i className="fa fa-comments"></i> 11</div>
                        <div className="view"><i className="fa-solid fa-heart"></i> 9141</div> */}
                    </div>
                    <div className="product__item__text">
                        {/* <h5><a href="#">Sen to Chihiro no Kamikakushi</a></h5> */}
                        {/* <Link onClick={()=>setidTruyen(idtruyenfl[index])} to={"/ComicDetail/"+idtruyenfl[index]}> {tentruyenfl[index]} </Link> */}
                        
                    </div>
                </div>
            </div>
        
    ))


    return(
        <>
        
    <div className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                        <a href="./index.html"><i className="fa fa-home"></i> Trang chủ</a>
                        <span>Truyện theo dõi</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section className="product-page spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="product__page__content">
                        <div className="product__page__title">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-6">
                                    <div className="section-title">
                                        <h4>Truyện theo dõi</h4>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/popular/popular-1.jpg">
                                        <div className="ep">Chap 18</div>
                                        <div className="comment"><i className="fa fa-comments"></i> 11</div>
                                        <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                                    </div>
                                    <div className="product__item__text">
                                        <h5><a href="#">Sen to Chihiro no Kamikakushi</a></h5>
                                    </div>
                                </div>
                            </div> */}
                            {rederTruyenFL()}
                            {/* {anhtruyenfl.map((item,index)=>(
        
      console.log('bb',item[0])
    
))} */}
                            
                            
                            
                            
                        </div>
                    </div>
                    <div className="product__pagination">
                        <a href="#" className="current-page">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#"><i className="fa fa-angle-double-right"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <div className="product__sidebar">
                        <div className="product__sidebar__view">
                            <div className="section-title">
                                <h5>Top Truyện hot</h5>
                            </div>
                            <ul className="filter__controls">
                                <li className="active" data-filter="*">Day</li>
                                <li data-filter=".week">Week</li>
                                <li data-filter=".month">Month</li>
                                <li data-filter=".years">Years</li>
                            </ul>
                            <div className="filter__gallery">
                                <div className="product__sidebar__view__item set-bg mix day years"
                                data-setbg="img/sidebar/tv-1.jpg">
                                <div className="ep">Chap 18</div>
                                <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                                <h5><a href="#">Boruto: Naruto next generations</a></h5>
                            </div>
                            <div className="product__sidebar__view__item set-bg mix month week"
                            data-setbg="img/sidebar/tv-2.jpg">
                            <div className="ep">Chap 18</div>
                            <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                            <h5><a href="#">The Seven Deadly Sins: Wrath of the Gods</a></h5>
                        </div>
                        <div className="product__sidebar__view__item set-bg mix week years"
                        data-setbg="img/sidebar/tv-3.jpg">
                        <div className="ep">Chap 18</div>
                        <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                        <h5><a href="#">Sword art online alicization war of underworld</a></h5>
                    </div>
                    <div className="product__sidebar__view__item set-bg mix years month"
                    data-setbg="img/sidebar/tv-4.jpg">
                    <div className="ep">Chap 18</div>
                    <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                    <h5><a href="#">Fate/stay night: Heaven's Feel I. presage flower</a></h5>
                </div>
                <div className="product__sidebar__view__item set-bg mix day"
                data-setbg="img/sidebar/tv-5.jpg">
                <div className="ep">Chap 18</div>
                <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                <h5><a href="#">Fate stay night unlimited blade works</a></h5>
            </div>
        </div>
    </div>
    
</div>
</div>
</div>
</div>
</section>
        </>
    )
}

export default Follow