import classes from './AuthUser.module.css';
import Account from '../Account/Account';
import { useState } from 'react';

export default function AuthUser(){
  const [userDataForm, setUserDataForm] = useState({
    uid: '',
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const savedUserData = localStorage.getItem('userData');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataForm({
      ...userDataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const pathResponce = isLogin ? 'login' : 'registration';
    
    await fetch(`http://localhost:3000/${pathResponce}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDataForm),
    })
    .then((response) => response.json())
    .then((data) => {
      setUserDataForm(data);
      localStorage.setItem('userData', data);
      location.reload();
    })
    .catch((error) => {setErrorMessage(error)});
  }

  const handleClickChangeForm = (e) => {
    setIsLogin(!isLogin);
  };

  const loginForm = () => {
    return(
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>Почта:</label>
        <input className={classes.input} onChange={handleChange} name='email' type='email' required/>
        <label className={classes.label}>Пароль:</label>
        <input className={classes.input} onChange={handleChange} name='password' type='password'  minLength={8} maxLength={30} required/>
        
        <button className={classes.submit} type='submit'>Войти</button>
      </form>
    )
  }

  const registrationForm = () => {
    return(
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor='name'>Псевдоним:</label>
        <input className={classes.input} onChange={handleChange} name='name' type='text' minLength={8} maxLength={15} required/>
        <label className={classes.label} htmlFor='email'>Почта:</label>
        <input className={classes.input} onChange={handleChange} name='email' type='email' required/>
        <label className={classes.label} htmlFor='password1'>Пароль:</label>
        <input className={classes.input} onChange={handleChange} name='password1' type='password'  minLength={8} maxLength={30} required/>
        <label className={classes.label} htmlFor='password2'>Повторите пароль:</label>
        <input className={classes.input} onChange={handleChange} name='password2' type='password'  minLength={8} maxLength={30} required/>
        <label className={classes.label} htmlFor='url-image'>URL фото профиля:</label>
        <input className={classes.input} onChange={handleChange} name='url-image' type='text' required/>
        
        <button className={classes.submit} type='submit'>Зарегистрироваться</button>
      </form>
    )
  }

  const showForm = () => {
    return(
      <>
        <button onClick={handleClickChangeForm} className={classes.changeForm}>{isLogin ? '---Регистрация---' : '---Вход---'}</button>

        <h2 className={classes.titleForm}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        {
          isLogin ? 
          (loginForm()) :
          (registrationForm())
        }

        {
          errorMessage.length != 0 ?
          (<p className={classes.errorMessage}>{errorMessage}</p>) :
          undefined
        }
      </>
    )
  }

  return (
    <>
      {
        savedUserData != undefined ?
        (<Account userData={JSON.parse(savedUserData)} />) :
        (showForm())
      }
    </>
  )
};