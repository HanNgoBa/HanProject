import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MyTheLoaiProvider } from './assets/js/constant';
import {CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MyTheLoaiProvider >
        <CookiesProvider>
          <App/>
        </CookiesProvider>
      </MyTheLoaiProvider>
    </React.StrictMode>
  </BrowserRouter>
);


