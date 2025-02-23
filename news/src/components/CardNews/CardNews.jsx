import classes from './CardNews.module.css';

export default function CardNews({isMinCardNews, dataNews}){
  return (
    <div className={isMinCardNews ? classes.minCardNews : classes.maxCardNews}>
      <img src="images/temp.svg" alt="imageNews" />
      <div className={classes.infoCard}>
        <p className={classes.darkishText}> {dataNews.date} </p>
        <h1 className={classes.lightishText}> {dataNews.title} </h1>
        <p className={classes.darkishText}> {dataNews.contentNews} </p>
        <div className={classes.infoAuthor}>
          <img src="images/temp2.svg" alt="imageAuthor" />
          <p className={classes.lightishText}> {dataNews.nameAuthor} </p>
        </div>
      </div>
    </div>
  )
};