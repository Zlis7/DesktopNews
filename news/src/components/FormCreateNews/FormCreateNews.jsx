import classes from "./FormCreateNews.module.css";
import { useState, useEffect } from 'react';
import { ref, set, get, child} from "firebase/database";
import { auth, database } from '../../firebase';

export default function FormCreateNews(){
  const [loading, setLoading] = useState(true);
  const [messageSubmit, setMessageSubmit] = useState('');
  const [newsDataForm, setNewsDataForm] = useState({
      title: '',
      urlImage: '',
      content: '',
      dataCreated: new Date().toDateString()
  });

  useEffect(() => {
    const unsubscribe = () => {
      getDataUserNewsFromDB();
      setLoading(false); 
    };
  
    return () => unsubscribe();
    }, []
  );
  
  const getDataUserNewsFromDB = async() =>{
    console.log(auth);
    await get(child(ref(database), `users-news/${auth.currentUser.uid}`)).then((snapshot)=>{
      if (snapshot.exists()) {
        setNewsDataForm(snapshot.val());
      } else {
        setNewsDataForm({ title: '', urlImage: '', content: ''});
      }
    })
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsDataForm({
      ...newsDataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    await set(ref(database, 'news-users/' + auth.currentUser.uid), newsDataForm) 
    .then(()=>setMessageSubmit('Новость была успешно отправленна на рассмотрение администрации!'))
    .catch((error) => setMessageSubmit(error));
  };

  if (loading){
      return  <h2 className={classes.titleForm}>Загрузка ...</h2>
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.label} htmlFor='title'>Заголовок:</label>
      <input className={classes.input} onChange={handleChange} name='title' type='text' minLength={30} maxLength={70} required/>
      <label className={classes.label} htmlFor='urlImage'>URL фото новости:</label>
      <input className={classes.input} onChange={handleChange} name='urlImage' type='text' required/>
          
      <label className={classes.label} htmlFor='content'>Содержание:</label>
      <textarea className={`${classes.input} ${classes.inputBig}`} onChange={handleChange} name='content' type='text' minLength={600} maxLength={4000} required/>
            
      <button className={classes.submit} type='submit'>Отправить на рассмотрение</button>
    
      {
        messageSubmit.length > 0 
        ? <p className={classes.message}>{messageSubmit}</p>
        : undefined
      }
    </form>
  )
};