import React from "react";
import "../../assets/css/bootstrap.min.css";
// import '../../assets/css/variable.scss'
// import '../Header/header.scss'
import "../../assets/css/style.css";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { TruyenTranh } from "../../assets/js/constant";
import { Link } from "react-router-dom";
import { ChapTruyen } from "../../assets/js/constant";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";


const ComicDetail = () => {
  const [idFollow,setidFollow] = useState('')
  const {idTruyen1} = useParams()
  const href =
    window.location.protocol + "//" + window.location.hostname + ":" + 1337;
  const [cookies] = useCookies(['idUser'])
  const [listtenchap, setlisttenchap] = useState([]);
  // const [idTruyen, setidTruyen] = useState(17);
  const [imgtruyen, setimgtruyen] = useState([]);
  const [tentruyen, settentruyen] = useState([]);
  const [theloai, settheloai] = useState([]);
  const [tacgia, settacgia] = useState([]);
  const [chapHienCo, setchapHienCo] = useState([]);
  const [gioithieu, setgioithieu] = useState([]);
  const [idChapTruyen,setidChapTruyen]= useState([])
  const {idChap,setidChap} = useContext(ChapTruyen)
  const [idtruyentranh,setidtruyentranh] = useState('')

  const {idTruyen, setidTruyen} = useContext(TruyenTranh) 

  console.log(idTruyen)
  const [btnFollow,setbtnFollow] = useState('Follow')
  const ClickFollow = ()=>{
  
      if(cookies.idUser!= null)
      {
        if(btnFollow=='Follow')
        {
          
          clickTheoDoi()
          setbtnFollow('UnFollow')
        }
        if(btnFollow=='UnFollow')
        {
          ClickUnFollow()
          setbtnFollow('Follow')
        }
      }
      else{
        alert('Bạn cần đăng nhập trước!')
      }
      
    // console.log('vao onclick')
    
       
  }

  
  const ClickUnFollow = async (btnFollow)=>{
    const reponse = await axios.delete(`http://localhost:1337/api/theo-dois/${idFollow}`)
  }


  const idKhachHang = cookies.idUser
  console.log('id user->>', idKhachHang)
  console.log('id Truyen ->', idTruyen)
  const clickTheoDoi = async (e) =>{
    const reponse = await axios.post('http://localhost:1337/api/theo-dois',{
      "data":{
        "IdTruyen": idTruyen1,
        "IdUser": idKhachHang,
        "truyens":   [idTruyen1],
        "users": [idKhachHang]
      }
     
    })
    .then(
      ()=>{
        if(reponse.data.jwt!==null)
        {
          alert('Đã theo dõi')
        }
      }
    )
    
  }

  useEffect(() => {
    console.log('123490', idTruyen1)
    axios
      .get(
        `http://localhost:1337/api/truyens?filters[id]=${idTruyen1}&populate=*`
      )
      .then((rest) => {
        // console.log("hehe", rest?.data?.data[0].id);
        const renderimg = `${href}${rest?.data?.data[0]?.attributes?.anhBia?.data[0].attributes?.url}`;
        const ChapDangCo = rest?.data?.data[0].attributes?.chapHienCo;
        const Tac = rest?.data?.data[0].attributes?.tacGia;
        const loai =
          rest?.data?.data[0].attributes?.the_loai?.data?.attributes?.tenLoai;
        const text = rest?.data?.data[0].attributes?.gioiThieu;
        const name = rest?.data?.data[0].attributes?.tenTruyen;
        const returnidChapTruyen = rest?.data?.data[0].attributes?.chap_truyens?.data.map(
          (idchaptruyentranh) => idchaptruyentranh?.id
        )
        const returnidTruyen = rest?.data?.data[0].id
        setidtruyentranh(returnidTruyen)
        setidChapTruyen(returnidChapTruyen)
        setimgtruyen(renderimg);
        settentruyen(name);
        settacgia(Tac);
        setgioithieu(text);
        setchapHienCo(ChapDangCo);
        settheloai(loai);
        // const listchap = rest?.data?.data[0].attributes?.chap_truyens?.data.map(
        //   (tap) => tap?.attributes?.tap
        // );
        // setListChap(listchap);
        const listtentap =
          rest?.data?.data[0].attributes?.chap_truyens?.data.map(
            (tentap) => tentap?.attributes?.tenTap
          );
          setlisttenchap(listtentap);
        // console.log(" tap :", listchap);
        // console.log("ten tap :", listtentap);
      });
  }, []);
  // console.log('list uihijkh : ',listtenchap )
  // const listChapTruyen = () =>
  //     ListChap?.map((item, index) =>(
  //         <td className='listchap'><a href="">Chương {item} : </a></td>
  //     ))
  
  const listTenChapTruyen = () =>
    listtenchap?.map((item, index) => (
      <tbody key={index+1}>
      <tr >
        <td className="listchap">
          <Link key={idChapTruyen[index+1]} onClick={()=>setidChap(idChapTruyen[index]) }  to={'/ChapComic/'+idTruyen1+'/'+idChapTruyen[index]}> Chương {index+1} :</Link>
        </td>
        <td>{item}</td>
      </tr>
      </tbody>
    ));
    // console.log('list ', listTenChapTruyen())

  // const ListChuong = () =>
  /// Bo theo doi
  

  
    useEffect(() =>{
      axios.get(`http://localhost:1337/api/theo-dois?populate=*&filters[truyens]=${idTruyen1}&filters[users]=${cookies.idUser}`)
      .then((res)=>{
        console.log('total',res.data.meta.pagination.total)
        const returnTotal = res.data.meta.pagination.total
        
        if(returnTotal==0)
        {
            setbtnFollow('Follow')
          
        }
        else {
          console.log('btn->',btnFollow)
          const returntidFollow = res.data.data[0].id

          console.log('idFollow',res.data.data[0].id)
          setidFollow(returntidFollow)
          setbtnFollow('UnFollow')
        }
        })
        },[btnFollow])
  
  
  

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
                
                <span>{tentruyen}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb End --> */}

      {/* <!-- Anime Section Begin --> */}
      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="anime__details__pic set-bg"
                  style={{ backgroundImage: `url(${imgtruyen})` }}
                >
                  {/* <div className="comment">
                    <i className="fa fa-comments"></i> 11
                  </div> */}
                  {/* <div className="view">
                    <i className="fa fa-eye"></i> 9141
                  </div> */}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3>{tentruyen}</h3>
                  </div>

                  <p>{gioithieu}</p>
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Thể loại:</span> {theloai}
                          </li>
                          <li>
                            <span>Tác giả:</span> {tacgia}
                          </li>
                          <li>
                            <span>Chap hiện có:</span> {chapHienCo}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__btn">
                    <button onClick={ClickFollow}  className="follow-btn">
                      <i className="fa fa-heart-o"></i> {btnFollow}
                    </button>
                    <Link className="watch-btn" onClick={()=>setidChap(idChapTruyen[0])} to={"/ChapComic/"+idTruyen1+"/"+idChapTruyen[0]}>
                      <span>Watch Now</span>{" "}
                      <i className="fa fa-angle-right"></i>
                    </Link>
                    {/* <a href="#" className="watch-btn">
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="anime__details__sidebar">
                <div className="section-title">
                  <h5>Số chương</h5>
                </div>

                <div>
                  <table>
                    {/* <tr>
                      <td className="listchap">
                        <a href="">Chương 1 : </a>
                      </td>
                      <td>48738478</td>
                    </tr> */}
                    {listTenChapTruyen()}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ComicDetail;
