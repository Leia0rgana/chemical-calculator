import { NavLink, Outlet } from 'react-router-dom'
import styles from './Menu.module.css'
const Menu = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.menu}>
          <NavLink to={'/'} className={styles.link}>
            <img
              src="/assets/chem-react.svg"
              width="32px"
              height="32px"
              style={{ margin: '0 7px' }}
            />
            <h1>ChemReact</h1>
          </NavLink>
          <NavLink to={'/element-list'} className={styles.link}>
            Элементы
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Menu
