import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { MyTheLoai } from "../../assets/js/constant";
import { TruyenTranh } from "../../assets/js/constant";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const {search1} = useParams()
  const { theLoai, setTheLoai } = useContext(MyTheLoai);
  // console.log("haha", theLoai);
  // const [theloai, settheloai] = useState(1)
  const [tenLoai, settenLoai] = useState([]);
  const [truyen, settruyen] = useState([]);
  const [anhbia, setanhbia] = useState([]);
  const [chaphtai, setchaphtai] = useState([]);

  const [idtruyen,setidtruyen] = useState([])
  const {idTruyen,setidTruyen} = useContext(TruyenTranh)


  //truyen mới ra mắt
  const [loaiNew, setLoaiNew] = useState([])
  const [anhNew,setanhNew] = useState([])
  const [chapNew,setchapNew] = useState([])
  const [tenTruyenNew,settenTruyenNew] = useState([])
  const [idTruyenNew,setidTruyenNew] = useState([])


  const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;

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
        `http://localhost:1337/api/truyens?filters[tenTruyen][$containsi]=${search1}&populate=*&sort=publishedAt:DESC`
      )
      .then((res) => {
        const returnidTruyen = res.data.data?.map(
          (id) => id?.id
        )
        setidtruyen(returnidTruyen)
        const returnLoai = res?.data?.data?.map(
          (loai) => loai?.attributes?.the_loai?.data?.attributes?.tenLoai
        );
        settenLoai(returnLoai);
        const returnTruyen = res?.data?.data.map(
          (truyen) => truyen?.attributes?.tenTruyen
        );
        const returnAnh = res?.data?.data.map(
          (item) => `${href}${item.attributes.anhBia.data[0]?.attributes?.url}`
        );
        const returnchaphtai = res?.data?.data.map(
          (chaphientai) => chaphientai?.attributes?.chapHienCo
        );
        settruyen(returnTruyen);
        setanhbia(returnAnh);
        setchaphtai(returnchaphtai);
      });
  }, []);

  // viet arrow func ma return ve 1 ReactNode thi k dung obj

  const renderitem = () =>
    anhbia?.map((item, index) => (
      <div id={idtruyen[index]} key={idtruyen[index]} className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
          {/* <img src={item} alt='image'/> */}
          <div
            className="product__item__pic set-bg"
            style={{ backgroundImage: `url(${item})` }}
          >
            {/* {renderChapNow()} */}
            <div className="ep">Chap {chaphtai[index]}</div>
            <div className="comment">
              <i className="fa fa-comments"></i> 11
            </div>
            <div className="view">
              <i className="fa-solid fa-heart"></i> 9141
            </div>
          </div>
          {/* {rendertruyen()} */}
          <div className="product__item__text">
            <ul>
              <li>{tenLoai[index]}</li>
            </ul>
            <h5>
              {/* <a href="/ComicDetail">{truyen[index]}</a> */}
              {/* <Link onClick={()=>setTheLoai(index+1)} to="/theloai">{item}</Link> */}
              <Link onClick={()=>setidTruyen(idtruyen[index])} to="/ComicDetail"> {truyen[index]} </Link>
            </h5>
          </div>
        </div>
      </div>
    ));


    //Phân trang 
    
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
                <span>Tìm kiếm</span>
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
                        <h4>Tìm kiếm : {search1}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div
                        className="product__item__pic set-bg"
                      >
                        <div className="ep">Chap 18</div>
                        <div className="comment">
                          <i className="fa fa-comments"></i> 11
                        </div>
                        <div className="view">
                          <i className="fa-solid fa-heart"></i> 9141
                        </div>
                      </div>
                      <div className="product__item__text">
                        <h5>
                          <a href="#">Sen to Chihiro no Kamikakushi</a>
                        </h5>
                      </div>
                    </div>
                  </div> */}
                  {renderitem()}
                </div>
              </div>
              <div className="product__pagination">
                <a href="#" className="current-page">
                  1
                </a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">
                  <i className="fa fa-angle-double-right"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="product__sidebar">
                <div className="product__sidebar__view">
                  <div className="section-title">
                    <h5>Truyện mới ra mắt</h5>
                  </div>

                  <div className="filter__gallery">
                    {/* <div
                      className="product__sidebar__view__item set-bg mix day years"
                      data-setbg="img/sidebar/tv-1.jpg"
                    >
                      <div className="ep">Chap 18</div>
                      <div className="view">
                        <i className="fa-solid fa-heart"></i> 9141
                      </div>
                      <h5>
                        <a href="#">Boruto: Naruto next generations</a>
                      </h5>
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
  );
};

export default SearchPage;
