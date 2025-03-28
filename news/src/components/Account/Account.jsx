import classes from './Account.module.css';
import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {signOut, deleteUser } from "firebase/auth";
import { auth, database } from '../../firebase';
import { ref, set, get, child} from "firebase/database";

export default function Account({accountData}){
  const [userDataDB, setUserDataDB] = useState(null);

  useEffect(() => {
      const getData = () => {
        getDataUserFromDB();
      };
  
      return () => getData();
    }, []);

  const handleLogout = async() => {
    await signOut(auth).then(() => window.location.href = '#/account');
  };

  const handleDelete = async() =>{
    await set(ref(database, 'users/' + auth.currentUser.uid), null);
    await deleteUser(auth.currentUser);
    
    location.reload();
  };

  const getDataUserFromDB = async() =>{
    await get(child(ref(database), `users/${auth.currentUser.uid}`)).then((snapshot)=>{
      if (snapshot.exists()) {
        setUserDataDB(snapshot.val());
      }
    })
  };

  const handleOnError = (e) =>{
    e.target.style.display = 'none';
  }

  if (userDataDB === null){
    return <h2 className={classes.titleForm}>Загрузка ...</h2>
  }

  return (
    <>
      <h1 className={classes.h1}>Добро пожаловать, <strong>{accountData.displayName}</strong>!</h1>
      <img  className={classes.userImage} src={accountData.userImage} alt="imageUser" onError={handleOnError}/>
      <article className={classes.article}>
        <h3>Данные профиля:</h3>
        <section className={classes.section}>
          <p>Псевдоним: <strong>{accountData.displayName}</strong></p>
          <p>Почта:  <strong>{accountData.email}</strong></p>
          <p>Возраст:  <strong>{userDataDB.age}</strong></p>
          <p>Зашифрованный пароль: <strong>{accountData.passwordHash}</strong></p>
          <p>Авторские права: 
            <strong>
              {
                userDataDB.role == 'author'
                ? ' Присутствуют'
                : ' Отсутствует'
              }
            </strong>
          </p>
          <p>Права администратора: 
            <strong>
              {
                userDataDB.role == 'admin'
                ? ' Присутствуют'
                : ' Отсутствует'
              }
            </strong>
          </p>
        </section>
      </article>

      <article className={classes.article}>
        <h3>Опции:</h3>
        <section  className={classes.section}>
          {
            userDataDB.role == 'admin'
            ? (<NavLink to='../adminPanel' className={classes.optionProfile}>Открыть админ панель</NavLink>)
            : undefined
          }
          {
            userDataDB.role == 'author'
            ? (<NavLink to='../createNews' className={classes.optionProfile}>Написать новостную статью</NavLink>)
            : undefined
          }

          <a className={classes.optionProfile} href='#' onClick={handleDelete}>Удалить аккаунт</a>
          <a className={classes.optionProfile} href='#' onClick={handleLogout}>Выйти из профиля</a>
        </section>
      </article>
    </>
  )
};