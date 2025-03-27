import classes from './Account.module.css';
import {NavLink} from 'react-router-dom';

export default function Account({userData}){
  return (
    <>
      <h1 className={classes.h1}>Добро пожаловать, <strong>{userData.name}</strong>!</h1>
      <article className={classes.article}>
        <h3>Данные профиля:</h3>
        <section className={classes.section}>
          <p>Псевдоним: <strong>{userData.name}</strong></p>
          <p>Почта:  <strong>{userData.email}</strong></p>
          <p>Пароль: <strong>{userData.password}</strong></p>
          <p>Авторские права: 
            <strong>
              {
                userData.role == 'author' ? 
                ' Присутствуют' :
                ' Отсутствуют'
              }
            </strong>
          </p>
        </section>
      </article>

      {
        userData.role == 'author' || userData.role == 'admin'? 
        (<NavLink to='../createNews' className={classes.createNews}>Создать статью</NavLink>):
        undefined
      }

      {
        userData.role == 'admin' ? 
        (<NavLink to='../adminPanel' className={classes.createNews}>Открыть админ панель</NavLink>):
        undefined
      }
    </>
  )
};