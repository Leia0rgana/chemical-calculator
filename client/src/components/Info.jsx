import styles from './Info.module.css'

const Info = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.item}>Использование </h2>
        <div className={styles.item}>
          Для ввода химической реакции необходимо кликать по соответствующим
          элементам, цифрам и операторам, а после нажать ``Уравнять``. Исходное
          и сбалансированное уравнения появятся на экране.
        </div>
      </div>
      <div>
        <h2
          className={styles.item}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          Это важно
          <img src="./public/assets/important.svg" width="27px" height="27px" />
        </h2>
        <ul className={`${styles.item} ${styles.ul}`}>
          <li>
            Условия взаимодействия веществ и протекания реакций не проверяются -
            приложение только демонстрирует принцип балансировки реакций
          </li>
          <li>Неизменные группы в соединениях не будут приняты в расчет</li>
        </ul>
      </div>
    </div>
  )
}

export default Info
