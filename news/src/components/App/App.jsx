import {HashRouter, Routes, Route} from 'react-router-dom';
import Header from "../Header/Header";
import HomeNews from '../HomeNews/HomeNews'
import AuthUser from '../AuthUser/AuthUser';
import FormCreateNews from '../FormCreateNews/FormCreateNews';
import AdminPanel from '../AdminPanel/AdminPanel';
import PageNotFound from '../PageNotFound/PageNotFound';

export default function App(){
  return (
    <>
      <HashRouter>
        <Header />
        <main>
          <Routes>
            <Route path='' element={<HomeNews/>}/>
            <Route path='homeAll' element={<HomeNews/>}/>
            <Route path='homeApp' element={<HomeNews/>}/>
            <Route path='account' element={<AuthUser/>}/>
            <Route path='createNews' element={<FormCreateNews/>}/>
            <Route path='adminPanel' element={<AdminPanel/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </main>
      </HashRouter>
    </>
  )
};