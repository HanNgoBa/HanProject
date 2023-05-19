import React from 'react'
import '../../assets/css/bootstrap.min.css'
// import '../../assets/css/variable.scss'
// import '../Header/header.scss'
import '../../assets/css/style.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Search = ({clickSearch,setclickSearch,setinputtext,inputtext}) =>{
    const navigate = useNavigate()
    const [displaystyle,setdisplaystyle] = useState('none')
    const handleKeyPress = document.getElementById('search-input')
    const inputSearch= ()=>{

        if(handleKeyPress !=null)
        {
            console.log("first")
            console.log()
            handleKeyPress.addEventListener("keypress", (e)=>{
            console.log(handleKeyPress.value) 
            if(e.key ==='Enter')
            {   
                setinputtext(handleKeyPress.value)
                // console.log(6666)
                navigate(`/SearchPage/`+handleKeyPress.value)
            }
            })
        }
    }
    
    useEffect(() =>{
        if(clickSearch===1)
            {
                setdisplaystyle('block')
            }
    },[clickSearch])
    const TurnOff = () =>{
        setclickSearch(0)
        setdisplaystyle('none')
    }
    return(

    <div style={{display: displaystyle}} className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div onClick={()=>TurnOff()} className="search-close-switch"><i className="fa-solid fa-xmark"></i></div>
            <form className="search-model-form">
                <input type="text"
                 //value={inputtext}
                 onChange={()=>inputSearch()}
                  id="search-input" placeholder="Search here....."></input>
            </form>
        </div>
    </div>

    )
}
export default Search
