import React from "react";

import HomePage from "../page/HomePage";
import ComicDetail from "../page/ComicDetail";
import ChapComic from "../page/ChapTruyen";
import Follow from "../page/Follow";
import Login from "../page/Login";
import Register from "../page/Register";
import {Route, Routes} from 'react-router-dom';
import ShowLoai from "../page/ShowLoai";
import ComicNew from "../page/ComicNew";
import SearchPage from "../page/SearchPage";
import ComicNewAdd from "../page/ComicNewAdd";
const RouterPage =() => {
    return(
        <Routes>
            <Route path="/theloai" element={<ShowLoai/>}></Route>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/ComicDetail/:idTruyen1" element={<> <ComicDetail/> </>}></Route>
            <Route path="/ChapComic/:idTruyen1/:idChap1" element={<> <ChapComic/> </>}></Route>
            <Route path="/Follow" element={<Follow/>}></Route>
            <Route path="/Login/" element={<Login/>}></Route>
            <Route path="/Register" element={<Register/>}></Route>
            <Route path="/NewComic" element={<ComicNew/>}></Route>
            <Route path="/SearchPage/:search1" element={<SearchPage/>}></Route>
            <Route path="/ComicNewAdd" element={<ComicNewAdd/>}></Route>
        </Routes>

    )
}

export default RouterPage
