import classes from './HomeNews.module.css';
import CardNews from '../CardNews/CardNews';
import { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { ref, set, get, child} from "firebase/database";

export default function HomeNews(){
  const [dataNews, setDataNews] = useState(null);

  useEffect(() => {
    const getData = auth.onAuthStateChanged(user => {
      getDataNews();
    });

    return () => getData();
  }, []);

  const getDataNews = async() =>{
    await get(child(ref(database), 'news-under-consideration/')).then((snapshot)=>{
      if (snapshot.exists()) {
        setDataNews(snapshot.val());
      }
    })
  };

  if (dataNews === null){
      return <h2 className={classes.titleForm}>Загрузка ...</h2>
  }

  console.log(dataNews);

  return (
    <div className={classes.homeNews}>
      <CardNews isMinCardNews={false} dataNews={dataNews[0]} />
      <div className={classes.containerNews}>
        {dataNews.slice(1).map((data) => <CardNews key={dataNews.title} isMinCardNews={true} dataNews={dataNews} /> )}
      </div>
    </div>
  )
};