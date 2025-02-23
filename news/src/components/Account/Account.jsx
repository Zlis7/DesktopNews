import classes from './Account.module.css';

export default function Account(){
  return (
    <>
      <form className={classes.form} action="POST">
        <label className={classes.label} >Псевдоним:</label>
        <input className={classes.input} type="text"/>
        <label>Почта:</label>
        <input className={classes.input} type="email"/>
        <label>Пароль:</label>
        <input className={classes.input} type="password"/>

        <label className={classes.label} >Права аккаунта:</label>

        <select className={classes.input}>
          <option value="user">Пользователь</option>
          <option value="author">Автор</option>
          <option value="admin">Администратор</option>
        </select>
        
        <button className={classes.submit} type='submit'>Сохранить</button>
      </form>
    </>
  )
};