import React, { createContext, useState } from "react";

export const MyTheLoai= createContext(null);

export const MyTheLoaiProvider = ({ children }) => {
  const [theLoai, setTheLoai] = useState(1);
  return (
    <MyTheLoai.Provider value={{ theLoai, setTheLoai}}>
      {children}
    </MyTheLoai.Provider>
  );
};

export const TruyenTranh = createContext(null)
export const TruyenTranhProvider = ({children}) =>{
  const [idTruyen, setidTruyen] = useState(1)
  return (
    <TruyenTranh.Provider value={{idTruyen,setidTruyen}}>
      {children}
    </TruyenTranh.Provider>
  )
}

export const ChapTruyen = createContext(null)
export const ChapTruyenProvider = ({children}) =>{
  const [idChap,setidChap] = useState(1)
  return(
    <ChapTruyen.Provider value={{idChap,setidChap}}>
      {children}
    </ChapTruyen.Provider>
    
  )
}