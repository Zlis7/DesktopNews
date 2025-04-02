import classes from "./FormCreateNews.module.css";
import { useState, useEffect } from 'react';
import { ref, set, get, child} from "firebase/database";
import { auth, database } from '../../firebase';

export default function FormCreateNews(){
  const [message, setMessage] = useState('');
  const [newsDataForm, setNewsDataForm] = useState(null);

  useEffect(() => {
    const getData = auth.onAuthStateChanged(user => {
      if (user) {
        getDataUserNewsFromDB(user.uid);
      } else {
        setMessage('Доступ запрещен!')
      }
    });

    return () => getData();
    }, []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsDataForm({
      ...newsDataForm,
      [name]: value,
    });
  };
  
  const getDataUserNewsFromDB = async(uid) =>{
    await get(child(ref(database), 'news-under-consideration/'+ uid)).then((snapshot)=>{
      if (snapshot.exists()) {
        setNewsDataForm(snapshot.val());
      } else {
        setNewsDataForm({ title: '', urlImage: '', content: ''});
      }
    })
  };
  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    await set(ref(database, 'news-under-consideration/' + auth.currentUser.uid), {
      ...newsDataForm,
      dataLastChange: new Date().toDateString(),
      isShow: 'none'
    }) 
    .then(()=>setMessage('Статья была успешно отправленна на рассмотрение администрации!'))
    .catch((error) => setMessage(error));
  };

  if (!newsDataForm){
      return  <h2 className={classes.titleForm}>Загрузка ...</h2>
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.label} htmlFor='title'>Заголовок:</label>
      <input className={classes.input} onChange={handleChange} value={newsDataForm.title} name='title' type='text' minLength={30} maxLength={70} required/>
      <label className={classes.label} htmlFor='urlImage'>URL фото новости:</label>
      <input className={classes.input} onChange={handleChange} value={newsDataForm.urlImage} name='urlImage' type='text' required/>
          
      <label className={classes.label} htmlFor='content'>Содержание:</label>
      <textarea className={`${classes.input} ${classes.inputBig}`} onChange={handleChange} value={newsDataForm.content} name='content' type='text' minLength={600} maxLength={4000} required/>
            
      <button className={classes.submit} type='submit'>Отправить на рассмотрение</button>
    
      {
        message.length > 0 ?
        <p className={classes.message}>Ваша статья в списке на рассмотрении, ожидайте ответа...</p>
        : newsDataForm.isShow === 'none'
        ? <p className={classes.message}>Ваша статья в списке на рассмотрении, ожидайте ответа...</p>
        : newsDataForm.isShow === 'true'
        ? <p className={classes.message}>Ваша статья была опубликована, спасибо!</p>
        : newsDataForm.isShow === 'false'
        ? <p className={classes.badMessage}>Ваша статья была отклонена</p>
        : undefined
      }
    </form>
  )
};