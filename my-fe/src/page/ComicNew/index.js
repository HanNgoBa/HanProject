import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import axios from "axios";
import { useState, useEffect,useContext } from "react";
import { TruyenTranh } from "../../assets/js/constant";
import { Link } from "react-router-dom";

const ComicNew = () => {
  const [truyen, settruyen] = useState([]);
  const [anhbia, setanhbia] = useState([]);
  const [chaphtai, setchaphtai] = useState([]);
  const [idtruyen,setidtruyen] = useState([])
  const [pagecount,setpagecount] = useState('')
  const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
  const {idTruyen,setidTruyen} = useContext(TruyenTranh)
  //truyen mới ra mắt
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


  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/api/truyens?pagination[page]=1&pagination[pageSize]=9&populate=*`
      )
      .then((res) => {
        // console.log('123434',res?.data?.meta?.pagination.pageCount)
        const returnPageCount = res?.data?.meta?.pagination.pageCount
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
        setpagecount(returnPageCount)
        setidtruyen(returnidTruyen)
        settruyen(returnTruyen);
        setanhbia(returnAnh);
        setchaphtai(returnchaphtai);
      });
  }, []);


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


      const CountPage = document.getElementsByClassName('aaa')
      // console.log(document.getElementsByClassName('p1')[0].innerHTML)
      
      // const [Countpg, setCountpg] = useState(1)

      console.log('hdjkas',document.getElementsByClassName('aaa'))
      const PageCount =()=>{
      const pageNumber = []
      for (let i = 1; i <= pagecount; i++) {
          {text1(i)}
        }
      }
      function text1(i) {
        return(
          <>
             <li id={i} className="aaa">{i}</li>
          </>
        )
      }
     console.log('lll', PageCount)

      useEffect(()=>{
        const text = document.getElementsByClassName('aaa')
        console.log(text);
      })
      
    useEffect(()=>{

    },[])



  return (
    <>
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <a href="./index.html">
                  <i className="fa fa-home"></i> Trang chủ
                </a>
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
                  {renderitem()}
                </div>
              </div>
              <ul className="product__pagination">
                {PageCount()}
                {/* <li  id="jj"  className="current-page aaa">
                  1
                </li>
                <li id="" className="aaa">2</li>
                <li id="1" className="aaa">3</li>
                <li id="1" className="aaa">4</li>
                <li id="1" className="aaa">5</li>
                <li id="1" className="" >
                  <i className="fa fa-angle-double-right"></i>
                </li> */}
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
