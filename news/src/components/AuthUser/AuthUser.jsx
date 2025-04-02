import classes from './AuthUser.module.css';
import Account from '../Account/Account';
import { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { ref, set} from "firebase/database";

export default function AuthUser(){
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser , setCurrentUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataForm, setUserDataForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    password2: '',
    photoURL: ''
  });
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false); 
  });

  return () => {
    unsubscribe();
  };
  }, []);

  const handleClickChangeForm = () => {
    setErrorMessage('');
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataForm({
      ...userDataForm,
      [name]: value,
    });
  };

  const handleSubmitLogin = async(e) =>{
    e.preventDefault();
    setErrorMessage('')

    await signInWithEmailAndPassword(
      auth, 
      userDataForm.email, 
      userDataForm.password
    )
    .then(()=> window.location.reload())
    .catch((error)=> setErrorMessage(error.message));
  };

  const handleSubmitRegistration = async(e) =>{
    e.preventDefault();

    if (userDataForm.password != userDataForm.password2){
      setErrorMessage('Пароли не совпадают!');
      return;

    } else{
      setErrorMessage('');
    }
    
    await createUserWithEmailAndPassword(
      auth, 
      userDataForm.email, 
      userDataForm.password

    )
    .then((userCredential)=>{
        updateProfile(userCredential.user, {
          displayName: userDataForm.name,
          photoURL: userDataForm.photoURL
        });

        set(ref(database, 'users/' + userCredential.user.uid), {
          role: 'user',
          age: userDataForm.age
        });
      })
    .catch((error)=> setErrorMessage(error.message));
  };

  const loginForm = () => {
    return(
      <form className={classes.form} onSubmit={handleSubmitLogin}>
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
      <form className={classes.form} onSubmit={handleSubmitRegistration}>
        <label className={classes.label} htmlFor='name'>Псевдоним:</label>
        <input className={classes.input} onChange={handleChange} name='name' type='text' minLength={8} maxLength={15} required/>
        <label className={classes.label} htmlFor='email'>Почта:</label>
        <input className={classes.input} onChange={handleChange} name='email' type='email' required/>
        <label className={classes.label} htmlFor='age'>Полных лет:</label>
        <input className={classes.input} onChange={handleChange} name='age' type='number' min={18} max={90} required/>
        <label className={classes.label} htmlFor='password'>Пароль:</label>
        <input className={classes.input} onChange={handleChange} name='password' type='password'  minLength={8} maxLength={30} required/>
        <label className={classes.label} htmlFor='password2'>Повторите пароль:</label>
        <input className={classes.input} onChange={handleChange} name='password2' type='password'  minLength={8} maxLength={30} required/>
        <label className={classes.label} htmlFor='photoURL'>URL фото профиля:</label>
        <input className={classes.input} onChange={handleChange} name='photoURL' type='text' required/>
        <button className={classes.submit} type='submit'>Зарегистрироваться</button>
      </form>
    )
  }

  const showAccount = () => {
    const accountData = {
      displayName: currentUser.displayName,
      userImage: currentUser.photoURL,
      ...currentUser.reloadUserInfo,
    };

    return  <Account  accountData={accountData} />
  }

  const showForm = () => {
    return(
      <>
        <button onClick={handleClickChangeForm} className={classes.changeForm}>{isLogin ? '---Регистрация---' : '---Вход---'}</button>

        <h2 className={classes.titleForm}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        
        { isLogin ? loginForm() : registrationForm() }

        {
          errorMessage.length > 0 ?
          (<p className={classes.errorMessage}>{errorMessage}</p>) :
          undefined
        }
      </>
    )
  }

  if (loading){
    return  <h2 className={classes.titleForm}>Загрузка ...</h2>
  }

  return (
    <>
      {currentUser ? showAccount() : showForm()}
    </>
  )
};
