import classes from './AdminCard.module.css';
import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, set, get, child} from "firebase/database";

export default function AdminCard({newsData, userData}){
  const [userDataDB, setUserDataDB] = useState(null);

  useEffect(() => {
    const getData = () => {
      if (newsData === null){
        getDataUserFromDB();
      } else{

      }
      
      };
    
      return () => getData();
    }, 
  []);

  const getDataUserFromDB = async() =>{
      await get(child(ref(database), `users/${userData.uid}`)).then((snapshot)=>{
        if (snapshot.exists()) {
          setUserDataDB(snapshot.val());
        }
      })
  };

  const disabelUserByID = async(e, uid, isDisabled) => {
    e.target.onClick = ()=>{};
 
    fetch('http://localhost:3000/disabelUserByID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: '7dbd6be92a7faeebcc1395f9f8c5d19dc77c8340',
        uid: uid,
        disabled: isDisabled
      })
    })
    .then(()=> e.target.style.color = '#69b46d')
    .catch(()=> e.target.style.color = '#b46969');
  }

  const updateUserByID = async(e, uid, age, role) => {
    e.target.onClick = ()=>{};
 
    fetch('http://localhost:3000/updateUserByID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: '7dbd6be92a7faeebcc1395f9f8c5d19dc77c8340',
        uid: uid,
        age: age,
        role: role
      })
      })
    .then(()=> e.target.style.color = '#69b46d')
    .catch(()=> e.target.style.color = '#b46969');
  }

  const changePublicationStatusNews = async(e, newsData, isPublications) => {
    e.target.onClick = ()=>{};
    e.target.style.color = '#69b46d'

    const authorID = newsData[0];
    const data = newsData[1];
    
    await set(ref(database, 'news-under-consideration/' + authorID), {
      content:data.content,
      dataLastChange: data.dataLastChange,
      isShow: isPublications,
      title: data.title,
      urlImage: data.urlImage
    })
    .catch(()=> e.target.style.color = '#b46969');

    if (isPublications === 'false'){
      return;
    }

    let userNameAndPhoto = []
    await fetch(`http://localhost:3000/getNameAndPhotoUserByID?uid=${authorID}&apiKey=7dbd6be92a7faeebcc1395f9f8c5d19dc77c8340`, {
      method: 'GET'
    })
    .then((response)=> response.json())
    .then((data) => {
      userNameAndPhoto = [data.userName, data.photoURL];
    })
    .catch(()=> e.target.style.color = '#b46969');
 
    let numberLastNews = 0;
    await get(child(ref(database), 'application-news/')).then((snapshot)=>{
      numberLastNews = Object.keys(snapshot.val()).length;
    })
    .catch(()=> e.target.style.color = '#b46969');

    await set(ref(database, 'application-news/' + numberLastNews), {
      content:data.content,
      dataLastChange: data.dataLastChange,
      title: data.title,
      urlImage: data.urlImage,
      authorName: userNameAndPhoto[0],
      authorImage: userNameAndPhoto[1]
    })
    .catch(()=> e.target.style.color = '#b46969');
  }

  const showUserData = () =>{
    if (userDataDB === null){
      return (
        <article className={classes.article}>
          <h3 className={classes.h3}>Загрузка...</h3>
        </article>
      )
    }

    return (
      <article className={classes.article}>
        <h3 className={classes.h3}>{userData.uid}</h3>
        <section className={classes.section}>
          <img src={userData.photoURL} className={classes.userImage}/>
          <p className={classes.p}>Псевдоним - {userData.displayName}</p>
          <p className={classes.p}>Почта - {userData.email}</p>
          <p className={classes.p}>Заблокирован - {userData.disabled ? 'Да':'Нет'}</p>
          <p className={classes.p}>Полных лет - {userDataDB.age}</p>
          <p className={classes.p}>Роль - {userDataDB.role}</p>

        </section>
        <section className={classes.section}>
          <h3 className={classes.h3}>Опции:</h3>
          <section>
            <a className={classes.optionProfile} onClick={(e)=>{disabelUserByID(e, userData.uid, !userData.disabled)}}>Заблокировать/Разблокировать</a>
            <a className={classes.optionProfile} onClick={(e)=>{updateUserByID(e, userData.uid, userDataDB.age, 'user')}}>Выдать права пользователя</a>
            <a className={classes.optionProfile} onClick={(e)=>{updateUserByID(e, userData.uid, userDataDB.age, 'author')}}>Выдать авторские права</a>
            <a className={classes.optionProfile} onClick={(e)=>{updateUserByID(e, userData.uid, userDataDB.age, 'admin')}}>Выдать права администратора</a>
          </section>
        </section>
      </article>
    )
  }

  const showNewsData = () =>{
    const authorID = newsData[0];
    const data = newsData[1];

    return (
      <article className={classes.articleNews}>
        <h3 className={classes.h3}>ID Автора - {authorID}</h3>
        <section className={classes.section}>
          <img src={data.urlImage} className={classes.userImage}/>
          <p className={classes.p}>Заголовок - {data.title}</p>
          <p className={classes.pNews}>{data.content}</p>
          <p className={classes.p}>Дата последнего изменения - {data.dataLastChange}</p>
        </section>
        <section className={classes.section}>
          <h3 className={classes.h3}>Опции:</h3>
          <section>
            <a className={classes.optionProfile} onClick={(e)=>{changePublicationStatusNews(e,newsData, 'true')}}>Опубликовать</a>
            <a className={classes.optionProfile} onClick={(e)=>{changePublicationStatusNews(e,newsData, 'false')}}>Отклонить</a>
          </section>
        </section>
      </article>
    )
  }

  return (
    <>
      {
        newsData === null 
        ? showUserData()
        : showNewsData()
      }
    </>
  )
};