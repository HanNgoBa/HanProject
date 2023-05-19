import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import axios from "axios";
import { useState, useEffect,useContext } from "react";
import { TruyenTranh } from "../../assets/js/constant";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const ComicNew = () => {
  const {trang1} = useParams()
  const [truyen, settruyen] = useState([]);
  const [anhbia, setanhbia] = useState([]);
  const [chaphtai, setchaphtai] = useState([]);
  const [idtruyen,setidtruyen] = useState([])
  const [pagecount,setpagecount] = useState('')
  const [loai,setloai] = useState([])
  const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
  const {idTruyen,setidTruyen} = useContext(TruyenTranh)
  //truyen mới ra mắt
  const [loaiNew, setLoaiNew] = useState([])
  const [anhNew,setanhNew] = useState([])
  const [chapNew,setchapNew] = useState([])
  const [tenTruyenNew,settenTruyenNew] = useState([])
  const [idTruyenNew,setidTruyenNew] = useState([])
  const [trang,settrang] = useState('')
  useEffect(()=>{
    axios.get(`http://localhost:1337/api/truyens?pagination[page]=1&pagination[pageSize]=4&populate=*&sort=publishedAt:DESC`)
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
  const arr = []
  useEffect(() => {
    axios.get(`http://localhost:1337/api/truyens?pagination[page]=${trang1}&pagination[pageSize]=9&populate=*&sort=chap_truyens.createdAt:DESC`)
    .then((res) =>{
        console.log('id ',res.data.data[2] )
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
        const returnPageCount = res?.data?.meta?.pagination.pageCount
        const returnchaphtai = res?.data?.data.map(
            (chaphientai) => chaphientai?.attributes?.chapHienCo
        )

        let arrnew = []
        arr.push(returnAnh)
        console.log("anh1 ->",arr)
        arrnew = new Set(arr[0])
        let arrnew1= [...arrnew]
        console.log('anh2->',arrnew1)
        
        setpagecount(returnPageCount)
        setanhbia(arrnew1)
        
        console.log('anh bia 1=>',anhbia)
        
        settruyen(returnTruyen)
        // setanhbia(returnAnh)
        setchaphtai(returnchaphtai)
    })
},[trang1])


  // useEffect ngu
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:1337/api/truyens?pagination[page]=${trang1}&pagination[pageSize]=9&populate=*`
  //     )
  //     .then((res) => {
  //       // console.log('123434',res?.data?.meta?.pagination.pageCount)
  //       const returnPageCount = res?.data?.meta?.pagination.pageCount
        
        
  //       const returnTruyen = res?.data?.data.map(
  //         (truyen) => truyen?.attributes?.tenTruyen
  //       );
  //       const returnAnh = res?.data?.data.map(
  //         (item) => `${href}${item.attributes.anhBia.data[0]?.attributes?.url}`
  //       );
  //       const returnchaphtai = res?.data?.data.map(
  //         (chaphientai) => chaphientai?.attributes?.chapHienCo
  //       );
  //       const returnidTruyen = res.data.data?.map(
  //         (id) => id?.id
  //       )
  //       setpagecount(returnPageCount)
  //       setidtruyen(returnidTruyen)
  //       settruyen(returnTruyen);
  //       setanhbia(returnAnh);
  //       setchaphtai(returnchaphtai);
  //     });
  // }, [trang1]);


  const renderitem = () =>
    anhbia?.map((item, index) => (
      <div key={index} className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
          {/* <img src={item} alt='image'/> */}
          <div
            className="product__item__pic set-bg"
            style={{ backgroundImage: `url(${item})` }}
          >
            <div key={index} className="ep" style={{ color: "#ffffff" }}>
                Chap {chaphtai[index]}
            </div>
            {/* <div className="comment">
              <i className="fa fa-comments"></i> 11
            </div> */}
            {/* <div className="view">
              <i className="fa-solid fa-heart"></i> 9141
            </div> */}
          </div>
          <div key={index} className="product__item__text">
            <h5>
              <Link onClick={()=>setidTruyen(idtruyen[index])} to={"/ComicDetail"+idtruyen[index]}> {truyen[index]} </Link>
              {/* <a href="/ComicDetail">{truyen[index]}</a> */}
            </h5>
          </div>
        </div>
        {/* <img src={item}></img> */}
      </div>
    ));
      
      
     const ComponentPage = ({i})=>{
        return (
          <>
            <li id={i} className="aaa">
              <Link to={'/NewComic/'+i}>{i}</Link>
            </li>
          </>
        )
     } 
      let PageCount =({index})=>{
        return(
          Array.from({length: index}).map((_item, index) => <ComponentPage i={index+1}/>)
         )
          
      }
     
    //  console.log('lll', pagecount)

    //   useEffect(()=>{
    //     const text = document.getElementsByClassName('aaa')
    //     console.log(text);
    //   })
      
    // useEffect(()=>{

    // },[])



  return (
    <>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                  <Link to={'/'}>
                    <i className="fa fa-home"></i> Trang chủ
                  </Link>
                <span>Truyện mới</span>
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
                        <h4>Truyện mới</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  
                  {renderitem()}
                </div>
              </div>
              <ul id="countPageUL" className="product__pagination">
              <PageCount index={pagecount}></PageCount>
                
                <li id="aa" value={pagecount} className="" >
                  <Link to={'/NewComic/'+pagecount}>
                    <i className="fa fa-angle-double-right"></i>
                  </Link>
                  
                </li> 
              </ul>
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
};

export default ComicNew;
