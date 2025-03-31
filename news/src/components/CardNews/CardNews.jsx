import classes from './CardNews.module.css';

export default function CardNews({isMinCardNews, dataNews}){
  return (
    <div className={
      isMinCardNews ? 
      classes.minCardNews : classes.maxCardNews}
      >

      <img className={`${isMinCardNews ? classes.smallImage : classes.bigImage}`} src={dataNews.urlImage}  />
      <div className={classes.infoCard}>
        <p className={classes.darkishText}> {dataNews.dataLastChange} </p>
        <h1 className={classes.lightishText}> {dataNews.title} </h1>
        <p className={classes.darkishText}> {dataNews.content} </p>
        <div className={classes.infoAuthor}>
          <img className={classes.userImage} src={dataNews.authorImage} />
          <p className={classes.lightishText}> {dataNews.authorName} </p>
        </div>
      </div>
    </div>
  )
};