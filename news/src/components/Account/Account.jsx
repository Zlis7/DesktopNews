import classes from './Account.module.css';
import {NavLink} from 'react-router-dom';
import {signOut, deleteUser } from "firebase/auth";
import { auth } from '../../firebase';

export default function Account({userInfo, userImage, displayName}){
  const handleLogout = async() => {
    await signOut(auth).then(() => window.location.href = '#/account');
  }
  const handleDelete = async() =>{
    await deleteUser(auth.currentUser).then(() => window.location.href = '#/account');
  }

  return (
    <>
      <h1 className={classes.h1}>Добро пожаловать, <strong>{displayName}</strong>!</h1>
      <img  className={classes.userImage} src={userImage} alt="imageUser" />
      <article className={classes.article}>
        <h3>Данные профиля:</h3>
        <section className={classes.section}>
          <p>Псевдоним: <strong>{displayName}</strong></p>
          <p>Почта:  <strong>{userInfo.email}</strong></p>
          <p>Зашифрованный пароль: <strong>{userInfo.passwordHash}</strong></p>
          <p>Авторские права: 
            <strong>
              {
                userInfo.role == 'author'
                ? ' Присутствуют'
                : ' Отсутствует'
              }
            </strong>
          </p>
        </section>
      </article>

      <a className={classes.optionProfile} href='#' onClick={handleLogout}>Выйти из профиля</a>
      <a className={classes.optionProfile} href='#' onClick={handleDelete}>Удалить аккаунт</a>

      {
        userInfo.role == 'author' || userInfo.role == 'admin'? 
        (<NavLink to='../createNews' className={classes.optionProfile}>Создать статью</NavLink>):
        undefined
      }

      {
        userInfo.role == 'admin' ? 
        (<NavLink to='../adminPanel' className={classes.optionProfile}>Открыть админ панель</NavLink>):
        undefined
      }
    </>
  )
};