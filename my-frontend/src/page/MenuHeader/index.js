import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'react-cookie';
// import '../node_modules/bootstrap/dist/js/bootstrap';
function BasicExample() {
  const navigate = useNavigate()

  const [cookies,setcookies,removecookies] = useCookies(['gmail'])
  const [cookies1,setcookies1,removecookies1] = useCookies(['idUser'])


  const gmail = cookies.gmail
  const [btnLogin,setbtnLogin]= useState('')

  // useEffect(ShowUser(gmail),[gmail])

  // function ShowUser(gmail)
  // {
  //   if(gmail!=null)
  //   {
  //     let user =document.getElementsByClassName('HiUser')
  //     let dangxuat = document.getElementById('dangxuat')
  //     let hoso =document.getElementById('hoso')
  //     console.log('aaa123',user)
  //     user.style.display="none"
  //     dangxuat.style.display="none"
  //     hoso.style.display="none"
  //   }
  //   else{
  //     document.getElementById('dangnhap').style.display="none"
  //   }
  // }

  let dangxuat = document.getElementsByClassName('btnDangNhap1')

  function btnDangXuat()
  {
     removecookies('gmail')
     removecookies1('idUser')
    // cookies.remove('idUser')
    // document.cookie = "username=gmail; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // document.cookie = "username=idUser; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/Login')
  }
  function btnDangNhap()
  {
    navigate('/Login')
  }
 
    if(gmail!=null)
    {
      return(
      <Dropdown>
      <Dropdown.Toggle 
      // variant="success"
      >
        <i className="fa-solid fa-user"></i>
      </Dropdown.Toggle>
        
      <Dropdown.Menu>
        <Dropdown.Item style={{color:'#222'}}>
          <b className="HiUser">{cookies.gmail}</b>
        </Dropdown.Item>
        
        {/* <Dropdown.Item style={{color:'#222'}}
        id='dangnhap'
        className='btnDangNhap1'
        onClick={()=>btnDangNhap()}>
          Đăng nhập
        </Dropdown.Item> */}
        <Dropdown.Item style={{color:'#222'}}
          id='dangxuat'
        onClick={()=>btnDangXuat()}
        >
          Đăng xuất
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      )
    }
    else{
      return(
        <Dropdown>
      <Dropdown.Toggle 
      // variant="success"
      >
        <i className="fa-solid fa-user"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {/* <Dropdown.Item style={{color:'#222'}}>
          <b className="HiUser">{cookies.gmail}</b>
        </Dropdown.Item> */}
        <Dropdown.Item style={{color:'#222'}}
          id='dangxuat'
        onClick={()=>btnDangNhap()}
        >
          Đăng nhập
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      )

    }
  
  

  // return (
  //   <Dropdown>
  //     <Dropdown.Toggle 
  //     // variant="success"
  //     >
  //       <i className="fa-solid fa-user"></i>
  //     </Dropdown.Toggle>
      
  //     <Dropdown.Menu>
  //       <Dropdown.Item style={{color:'#222'}}>
  //         <b className="HiUser">{cookies.gmail}</b>
  //       </Dropdown.Item>
  //       {/* <Dropdown.Item style={{color:'#222'}}
  //       id='hoso'
  //       // href="#/action-1"
  //       >
  //         <Link to={'/Follow'}>Hồ sơ người dùng</Link>
  //       </Dropdown.Item> */}
  //       {/* <Dropdown.Item 
  //       id='changepass'
  //       // href="#/action-2"
  //       >
  //         <Link to={'/'}>Đổi mật khẩu</Link>
  //       </Dropdown.Item> */}
  //       <Dropdown.Item style={{color:'#222'}}
  //       id='dangnhap'
  //       className='btnDangNhap1'
  //       onClick={()=>btnDangNhap()}>
  //         Đăng nhập
  //       </Dropdown.Item>
  //       <Dropdown.Item style={{color:'#222'}}
  //         id='dangxuat'
  //       onClick={()=>btnDangXuat()}
  //       >
  //         Đăng xuất
  //       </Dropdown.Item>
  //     </Dropdown.Menu>
  //   </Dropdown>
  // );
}

export default BasicExample;

