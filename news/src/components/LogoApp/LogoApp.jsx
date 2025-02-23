import classes from './LogoApp.module.css';

export default function LogoApp(){
  return (
    <div className={classes.logoApp}>
      <strong>Новости</strong>
      <div className={classes.icon}>В теме</div>
    </div>
  )
};