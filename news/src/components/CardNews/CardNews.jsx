import classes from './CardNews.module.css';
import { useState } from 'react';

export default function CardNews({isMinCardNews, dataNews}){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal = () => {
    if (!isModalOpen) return null;
  
    return (
      <div className= {classes.modalOverlay} onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}>
        <div className={classes.modalContent}>
          <p className={classes.p}> {dataNews.dataLastChange} </p>
          <h1 className={classes.hContant}> {dataNews.title} </h1>
          <div className={classes.infoAuthor}>
            <img className={classes.userImage} src={dataNews.authorImage} />
            <p className={classes.p}> {dataNews.authorName} </p>
          </div>
          <img className={classes.imageModal} src={dataNews.urlImage}  />
          <p className={classes.pContant}> {dataNews.content} </p>
        </div>
      </div>
    );
  };

  return (
    <div onClick={()=>{setIsModalOpen(true)}} className={
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
      <Modal />
    </div>
  )
};