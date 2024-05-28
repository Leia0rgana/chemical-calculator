import styles from './Table.module.css'
import { useGetElementsQuery } from '../redux/elementsApi'
import { useDispatch, useSelector } from 'react-redux'
import { ImSpinner2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import {
  setEquation,
  toggleEqualizeBtn,
  selectIsActiveEqualizeBtn,
} from '../redux/slices/equationSlice'
import { useEffect } from 'react'
import { getElementLocation } from '../data/lanthanoidAndActinoid'

const Table = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetElementsQuery()
  const isActiveEqualizeBtn = useSelector(selectIsActiveEqualizeBtn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }),
    [error]

  const handleClick = (symbol) => {
    dispatch(setEquation(symbol))
    !isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
  }

  if (isLoading) {
    return <ImSpinner2 className="spinner" />
  }

  return (
    <div className={styles.table}>
      {data &&
        data.map((element) => {
          return (
            <button
              key={element.number}
              className={styles.element}
              style={getElementLocation(
                element.number,
                element.period,
                element.group
              )}
              onClick={() => handleClick(element.symbol)}
            >
              <div>{element.symbol}</div>
            </button>
          )
        })}
    </div>
  )
}

export default Table
