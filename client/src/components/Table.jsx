import styles from './Table.module.css'
import { useGetElementsQuery } from '../redux/elementsApi'

const Table = () => {
  const { data, isLoading, error } = useGetElementsQuery()

  return (
    <div className={styles.table}>
      {error ? (
        <h2>{error.error}</h2>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        data &&
        data.map((element) => (
          <div className={styles.element} key={element.number}>
            <p>{element.number}</p>
            <p>{element.symbol}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Table
