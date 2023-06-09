// import logo from './logo.svg';
import './App.css';
// import HomePage from './page/HomePage';
import Header from './page/Header';
import './assets/css/style.css'
import Footer from './page/Footer';
import Search from './page/Search';
import RouterPage from './routers';
import { useEffect, useState } from 'react';
import $ from "jquery"
import jQuery from 'jquery'

import { TruyenTranhProvider } from './assets/js/constant';
import { ChapTruyenProvider } from './assets/js/constant';
function App() {
  useEffect(()=>{
    (function ($) {

    

      /*------------------
          Scroll To Top
      --------------------*/
      $("#scrollToTopButton").click(function() {
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
       });
  
  })(jQuery);
  })

  const [clickSearch,setclickSearch] = useState('')
  // const [closeSearch,setcloseSearch] = useState('')
  console.log('search', clickSearch)
  const [inputtext,setinputtext] = useState('')

  // const elementSearch = 
  // if(clickSearch==1)
  // {

  // }
  console.log('input search= ',inputtext);


  return (
    <div className='App'>
        
        <Header setclickSearch={setclickSearch}/>
        <TruyenTranhProvider>
        <ChapTruyenProvider>
          <RouterPage/>
        </ChapTruyenProvider>
        </TruyenTranhProvider>
        <Footer/>
        <Search clickSearch={clickSearch} setclickSearch={setclickSearch} setinputtext={setinputtext} inputtext={inputtext}/>
    </div>
    
  );
}

export default App;
