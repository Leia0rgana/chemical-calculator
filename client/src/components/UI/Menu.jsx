import { NavLink, Outlet } from 'react-router-dom'
import styles from './Menu.module.css'
const Menu = () => {
  return (
    <>
      <header>
        <NavLink to={'/'} className={`${styles.link} ${styles.logo}`}>
          ChemReact
        </NavLink>
        <NavLink to={'/elementList'} className={styles.link}>
          Элементы
        </NavLink>
      </header>
      <Outlet />
    </>
  )
}

export default Menu
