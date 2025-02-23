import CardNews from '../CardNews/CardNews';
import classes from './HomeNews.module.css';

export default function HomeNews({arrayNews}){
  return (
    <div className={classes.homeNews}>
      <CardNews isMinCardNews={false} dataNews={arrayNews[0]} />
      <div className={classes.containerNews}>
        {arrayNews.slice(1).map((dataNews) => <CardNews key={dataNews.title} isMinCardNews={true} dataNews={dataNews} /> )}
      </div>
    </div>
  )
};