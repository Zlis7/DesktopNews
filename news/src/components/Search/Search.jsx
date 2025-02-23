import classes from './Search.module.css';

export default function Search(){
  return (
    <div className={classes.search}>
      <img className={classes.iconSearch} src="images/search.svg" alt="search" />
      <input className={classes.inputSearch} placeholder='Поиск' />
    </div>
  )
};