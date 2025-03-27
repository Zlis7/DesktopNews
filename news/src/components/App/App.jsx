import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import {HashRouter, Routes, Route} from 'react-router-dom';

export default function App(){
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='' element={<Main path='homeAll' />}  />
          <Route path='homeAll' element={<Main path='homeAll' />} />
          <Route path='homeApp' element={<Main path='homeApp' />}  />
          <Route path='account' element={<Main path='account' />}  />
          <Route path='createNews' element={<Main path='createNews' />}  />
          <Route path='adminPanel' element={<Main path='adminPanel' />}  />
        </Routes>
      </HashRouter>
    </>
  )
};