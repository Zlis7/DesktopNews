import classes from './NavMainContent.module.css';
import {NavLink} from 'react-router-dom';

export default function NavMainContent({namesElements, path}){
  return (
    <nav>
      <ul className={classes.ul}>
        {namesElements.map((nameElement, id) => {
          return (
          <li className={classes.li} key={id}>
            <NavLink to={path[id]} className={classes.navLink}>
              {nameElement}
            </NavLink>
          </li>
          )
        })}
      </ul>
    </nav>
  )
};