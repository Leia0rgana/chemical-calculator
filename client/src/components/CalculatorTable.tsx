import styles from './CalculatorTable.module.css'
import { useGetElementsQuery } from '../redux/elementsApi'
import { useAppSelector, useAppDispatch } from '../hooks'
import { ImSpinner2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import {
  setEquation,
  toggleEqualizeBtn,
  selectIsActiveEqualizeBtn,
} from '../redux/slices/equationSlice'
import { useEffect } from 'react'
import { getElementLocation } from '../data/lanthanoidAndActinoid.ts'

const Table = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetElementsQuery()
  const isActiveEqualizeBtn = useAppSelector(selectIsActiveEqualizeBtn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }),
    [error]

  const handleClick = (symbol: string): void => {
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
