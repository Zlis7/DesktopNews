import classes from './Account.module.css';
import { useState } from 'react';

export default function Account(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rights: 'user',
    phone:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label} >Псевдоним:</label>
        <input className={classes.input} onChange={handleChange} name='name' type='text' minLength={8} maxLength={15} required/>
        <label className={classes.label}>Почта:</label>
        <input className={classes.input} onChange={handleChange} name='email' type='email' required/>
        <label className={classes.label}>Пароль:</label>
        <input className={classes.input} onChange={handleChange} name='password' type='password'  minLength={8} maxLength={30} required/>
        <label className={classes.label} >Номер телефона:</label>
        <input className={classes.input} onChange={handleChange} name='phone' type='tel'  minLength={11} maxLength={12} required/>
        <label className={classes.label} >Права аккаунта:</label>
        <select className={`${classes.input} ${classes.select}`} onChange={handleChange} name='rights'>
          <option className={classes.label} value='user'>Пользователь</option>
          <option className={classes.label} value='author'>Автор</option>
          <option className={classes.label} value='admin'>Администратор</option>
        </select>
        <button className={classes.submit} type='submit'>Сохранить</button>
      </form>
    </>
  )
};