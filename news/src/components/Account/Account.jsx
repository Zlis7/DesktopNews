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
    await signOut(auth).then(() => location.reload());
  };

  const handleDelete = async() =>{
    await set(ref(database, 'users/' + auth.currentUser.uid), null);
    await set(ref(database, 'news-under-consideration/' + auth.currentUser.uid), null);
    await deleteUser(auth.currentUser);
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

  const handleOnMouseEnter = (e) => {
    document.querySelector('#aboutRights').style.display = 'block';
  }

  const handleOnMouseLeave = (e) => {
    document.querySelector('#aboutRights').style.display = 'none';
  }

  if (userDataDB === null){
    return <h2 className={classes.titleForm}>Загрузка ...</h2>
  }

  return (
    <>
      <h1 className={classes.h1}>Добро пожаловать, <strong>{accountData.displayName}</strong>!</h1>
      <img className={classes.userImage} src={accountData.userImage} alt="imageUser" onError={handleOnError}/>
      <article className={classes.article}>
        <h3>Данные профиля:</h3>
        <section className={classes.section}>
          <p>ID: <strong>{accountData.localId.slice(0, 6)}</strong></p>
          <p>Псевдоним: <strong>{accountData.displayName}</strong></p>
          <p>Почта:  <strong>{accountData.email}</strong></p>
          <p>Возраст:  <strong>{userDataDB.age}</strong></p>
          <p>Зашифрованный пароль: <strong>{accountData.passwordHash}</strong></p>
          <p className={classes.underlinePopupWindow} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>Авторские права: 
            <strong>
              {
                userDataDB.role == 'author'
                ? ' Присутствуют'
                : ' Отсутствуют'
              }
            </strong>
          </p>
          <p className={classes.underlinePopupWindow} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>Права администратора: 
            <strong>
              {
                userDataDB.role == 'admin'
                ? ' Присутствуют'
                : ' Отсутствуют'
              }
            </strong>
          </p>
          <p className={classes.aboutRights} id='aboutRights'>Чтобы получить права, свяжитесь с администратором сервиса. В сообщении укажите ваш ID и опишите мотивацию получение прав.</p>
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

          <a className={classes.optionProfile} href='#/account' onClick={handleDelete}>Удалить аккаунт</a>
          <a className={classes.optionProfile} href='#/account' onClick={handleLogout}>Выйти из профиля</a>
        </section>
      </article>

      <article className={classes.article}>
        <h3>Контакты администрации:</h3>
        <section  className={classes.section}>
          <p>Почта:<a className={classes.optionProfile} href='mailto:denkalmy@gmail.com' target='blank'>denkalmy@gmail.com</a></p>
          <p>Телеграм: <a className={classes.optionProfile} href='https://web.telegram.org/k/#@Zlis77' target='blank'>@Zlis77</a></p>
        </section>
      </article>
    </>
  )
};