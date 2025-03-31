import classes from './AdminPanel.module.css';
import { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { ref, set, get, child} from "firebase/database";
import AdminCard from '../AdminCard/AdminCard';

export default function AdminPanel(){
  const [dataUsers, setDataUsers] = useState(null);
  const [underConsiderationNews, setUnderConsiderationNews] = useState(null);
  const [isShowDataUsers, setIsShowDataUsers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [numberPage, setNumberPage] = useState(1);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user && user.disabled === false){
          window.location.href = '#/account'
        } else{
          getDataUsersByPageNumber(numberPage);
        }
      });

      document.querySelector('#user').style.borderBottom = "1px solid #9cadc2";
  
      return () => unsubscribe();
    }, []);

  
  const getDataUsersByPageNumber = async(page) => {
    await fetch(
      'http://localhost:3000/listAllUsersByPageNumber?'
      + 'apiKey=7dbd6be92a7faeebcc1395f9f8c5d19dc77c8340'
      + '&'
      + `page=${page}`
    )
    .then((response)=> response.json())
    .then((data) => {
      setDataUsers(data.listAllUsers);
      setLoading(false);
    })
  }

  const getUnderConsiderationNews = async() =>{
    await get(child(ref(database), 'news-under-consideration')).then((snapshot)=>{
      if (snapshot.exists()) {
        setUnderConsiderationNews(Object.entries(snapshot.val()));
      }
    })
    .then(()=> setLoading(false));
  };

  const showPanel = () => {
    if((dataUsers===null && isShowDataUsers ===true) || (underConsiderationNews===null && isShowDataUsers ===false)){
      setLoading(true);
    }

    if (isShowDataUsers){
      return (
        <div className={classes.panelUser}>
          {
            dataUsers.map((userData, index)=>{
              return <AdminCard key={index} newsData={null} userData={userData}/>
            })
          }
        </div>
      )
    }

    return (
      <div className={classes.panelNews}>
        { 
          underConsiderationNews
          .filter((newsData) => newsData[1].isShow === 'none')
          .map((newsData, index)=>{
            return <AdminCard key={index} newsData={newsData} userData={null}/>
          })
        }
      </div>
    )
  }

  const handleClickChangePanel = async(isShowDataUsers) => {
    if(isShowDataUsers){
      document.querySelector('#user').style.borderBottom = "1px solid #9cadc2";
      document.querySelector('#news').style.border = "none";
    } else{
      document.querySelector('#news').style.borderBottom = "1px solid #9cadc2";
      document.querySelector('#user').style.border = "none";
    }

    setLoading(true);
    setIsShowDataUsers(isShowDataUsers);

    isShowDataUsers 
    ? await getDataUsersByPageNumber(numberPage)
    : await getUnderConsiderationNews()
  }

  return (
    <>
      <h1 className={classes.h1}>Панель администратора</h1>
      <div className={classes.horizontal} >
        <a className={classes.optionProfile} id='user' onClick={()=>handleClickChangePanel(true)}>Пользователи системы</a>
        <a className={classes.optionProfile} id='news' onClick={()=>handleClickChangePanel(false)}>Предложенные новости</a>
      </div>

      <div>
        {
        loading 
        ? (<h2 className={classes.titleForm}>Загрузка ...</h2>)
        : showPanel()
        }
      </div>
    </>
  )
};