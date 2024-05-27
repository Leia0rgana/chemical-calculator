import styles from './Table.module.css'
import { useGetElementsQuery } from '../redux/elementsApi'
import { useDispatch, useSelector } from 'react-redux'
import { ImSpinner2 } from 'react-icons/im'
import {
  setEquation,
  toggleEqualizeBtn,
  selectIsActiveEqualizeBtn,
} from '../redux/slices/equationSlice'

let lanthanoidAndActinoid = []

for (let i = 57; i <= 71; i += 1) {
  lanthanoidAndActinoid.push(i)
}

for (let i = 89; i <= 103; i += 1) {
  lanthanoidAndActinoid.push(i)
}

const Table = ({ isExtended }) => {
  const { data, isLoading } = useGetElementsQuery()
  const isActiveEqualizeBtn = useSelector(selectIsActiveEqualizeBtn)
  const dispatch = useDispatch()

  const handleClick = (symbol) => {
    dispatch(setEquation(symbol))
    !isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
  }

  const getElementLocation = (number, period, group) => {
    if (lanthanoidAndActinoid.includes(number)) {
      return {
        gridColumn: group + 1,
        gridRow: period + 2,
      }
    } else
      return {
        gridColumn: group,
        gridRow: period,
      }
  }

  return (
    <div className={styles.table}>
      {isLoading ? (
        // <div className={styles.spinnerContainer}>
        <ImSpinner2 className="spinner" />
      ) : (
        // </div>
        data &&
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
              {isExtended ? (
                <>
                  <div>{element.number}</div>
                  <div>{element.symbol}</div>
                  <div>{parseFloat(element.atomic_mass).toFixed(2)}</div>
                </>
              ) : (
                <>
                  <div>{element.number}</div>
                  <div>{element.symbol}</div>
                </>
              )}
            </button>
          )
        })
      )}
    </div>
  )
}

export default Table
