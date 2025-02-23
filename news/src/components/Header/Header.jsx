import LogoApp from "../LogoApp/LogoApp";
import NavMainContent from "../NavMainContent/NavMainContent";
import Search from "../Search/Search";
import classes from "./Header.module.css";

export default function Header(){
  const namesElements = ["Главная", "Новости приложения", "Личный кабинет"];
  const path = ["homeAll", "homeApp", "account"];

  return (
    <header className={classes.header}>
      <LogoApp />
      <NavMainContent namesElements={namesElements} path={path}/>
      <Search />
    </header>
  )
};