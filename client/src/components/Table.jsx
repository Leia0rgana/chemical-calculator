import styles from './Table.module.css'
import { useGetElementsQuery } from '../redux/elementsApi'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEquation,
  toggleEqualizeBtn,
  selectIsActiveEqualizeBtn,
} from '../redux/slices/equationSlice'

const Table = () => {
  const { data, isLoading, error } = useGetElementsQuery()
  const isActiveEqualizeBtn = useSelector(selectIsActiveEqualizeBtn)
  const dispatch = useDispatch()

  const handleClick = (symbol) => {
    dispatch(setEquation(symbol))
    !isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
  }

  return (
    <div className={styles.table}>
      {error ? (
        <h2>{error.error}</h2>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        data &&
        data.map((element) => (
          <button
            className={styles.element}
            key={element.number}
            onClick={() => handleClick(element.symbol)}
          >
            <div>{element.number}</div>
            <div>{element.symbol}</div>
          </button>
        ))
      )}
    </div>
  )
}

export default Table
