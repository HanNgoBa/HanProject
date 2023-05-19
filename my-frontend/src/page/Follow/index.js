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
    const [pagecount,setpagecount] = useState('')
    const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
    const idDocGia = cookies.idUser


    //truyeenj moi ra mat :
    const [loaiNew, setLoaiNew] = useState([])
    const [anhNew,setanhNew] = useState([])
    const [chapNew,setchapNew] = useState([])
    const [tenTruyenNew,settenTruyenNew] = useState([])
    const [idTruyenNew,setidTruyenNew] = useState([])

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
            <div className="view">
              <i className="fa-solid fa-heart"></i> 9141
            </div>
            <h5>
              <Link onClick={()=>setidTruyen(idTruyenNew[index])} to={"/ComicDetail/"+idTruyenNew[index]}> {tenTruyenNew[index]} </Link>
            </h5>
          </div>
        </>
    ));
    //truyen fl
    useEffect(()=>{
        axios.get(`http://localhost:1337/api/theo-dois?populate[0]=users&populate[1]=truyens&filters[users]=${idDocGia}&pagination[page]=1&pagination[pageSize]=9`)
        .then((res)=>{
            const returnpagecount = res?.data?.meta?.pagination.pageCount
            const returnidfl = res.data.data.map(
                (idtruyen) => idtruyen.attributes.truyens.data[0].id
            )
            const returnTenTruyenfl = res.data.data.map(
                (tentruyen) =>tentruyen.attributes.truyens.data[0].attributes.tenTruyen
            )
            const returnchap = res.data.data.map(
                (chapfl)=>chapfl.attributes.truyens.data[0].attributes.chapHienCo
            )
            setpagecount(returnpagecount)
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
                    
            })
        }
        )
    },[])

    const rederTruyenFL = ()=> anhtruyenfl.map((item,index)=>(
   
            <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                    <div className="product__item__pic set-bg" 
                    style={{ backgroundImage: `url(${item})` }}>
                        <div className="ep">Chap {chaphiencofl[index]}</div>
                        {/* <div className="comment"><i className="fa fa-comments"></i> 11</div>
                        <div className="view"><i className="fa-solid fa-heart"></i> 9141</div> */}
                    </div>
                    <div className="product__item__text">
                        <ul>
                            <li>{theloaifl[index]}</li>
                        </ul>
                        {/* <h5><a href="#">Sen to Chihiro no Kamikakushi</a></h5> */}
                        <Link onClick={()=>setidTruyen(idtruyenfl[index])} to={"/ComicDetail/"+idtruyenfl[index]}> {tentruyenfl[index]} </Link>

                        {/* <Link onClick={()=>setidTruyen(idtruyenfl[index])} to={"/ComicDetail/"+idtruyenfl[index]}> {tentruyenfl[index]} </Link> */}
                        
                    </div>
                </div>
            </div>
        
    ))
    //Phan trang :
    // const ComponentPage = ({i})=>{
    //     return (
    //       <>
    //         <li id={i} >{i}</li>
    //       </>
    //     )
    //  } 
    //   let PageCount =({index})=>{
    //     return(
    //       Array.from({length: index}).map((_item, index) => <ComponentPage i={index+1}/>)
    //      )
          
    //   }



    return(
        <>
        
    <div className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                    <Link to={'/'}>
                        <i className="fa fa-home"></i> Trang chủ
                    </Link>
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
                    {/* <ul className="product__pagination">
                        
                        <PageCount index={pagecount}></PageCount>
                        <a href="#"><i className="fa fa-angle-double-right"></i></a> 
                    </ul> */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <div className="product__sidebar">
                        <div className="product__sidebar__view">
                            <div className="section-title">
                                <h5>Truyện mới ra mắt</h5>
                            </div>
                            {/* <ul className="filter__controls">
                                <li className="active" data-filter="*">Day</li>
                                <li data-filter=".week">Week</li>
                                <li data-filter=".month">Month</li>
                                <li data-filter=".years">Years</li>
                            </ul> */}
                            <div className="filter__gallery">
                                {/* <div className="product__sidebar__view__item set-bg mix day years"
                                data-setbg="img/sidebar/tv-1.jpg">
                                <div className="ep">Chap 18</div>
                                <div className="view"><i className="fa-solid fa-heart"></i> 9141</div>
                                <h5><a href="#">Boruto: Naruto next generations</a></h5>
                                
                                </div> */}
                                {renderTruyenNew()}
                                
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