import classes from "./FormCreateNews.module.css";
import { useState } from 'react';


export default function FormCreateNews(){
  const [newsDataForm, setNewsDataForm] = useState({
      title: '',
      urlImage: '',
      content: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsDataForm({
      ...newsDataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
   
    await fetch(`http://localhost:3000/create-news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newsDataForm),
    })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {});
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor='title'>Заголовок:</label>
        <input className={classes.input} onChange={handleChange} name='title' type='text' minLength={30} maxLength={70} required/>
        <label className={classes.label} htmlFor='url-image'>URL фото новости:</label>
        <input className={classes.input} onChange={handleChange} name='url-image' type='text' required/>
         
        <label className={classes.label} htmlFor='content'>Содержание:</label>
        <textarea className={`${classes.input} ${classes.inputBig}`} onChange={handleChange} name='content' type='text' minLength={600} maxLength={4000} required/>
           
        <button className={classes.submit} type='submit'>Отправить на рассмотрение</button>
    </form>
  )
};