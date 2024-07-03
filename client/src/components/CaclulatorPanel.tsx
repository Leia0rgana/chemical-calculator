import styles from './CalculatorPanel.module.css'
import { useAppSelector, useAppDispatch } from '../hooks'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { GrPowerReset } from 'react-icons/gr'
import {
  selectEquation,
  selectIsActiveEqualizeBtn,
  setEquation,
  resetEquation,
  removeSymbol,
  toggleEqualizeBtn,
  resetBalancedEquation,
  resetInitialEquation,
} from '../redux/slices/equationSlice'

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '=']

const CaclulatorPanel = () => {
  const equation = useAppSelector(selectEquation)
  const isActiveEqualizeBtn = useAppSelector(selectIsActiveEqualizeBtn)
  const dispatch = useAppDispatch()

  const isValidInput = (symbol: string | number): boolean => {
    if (equation) {
      if (symbol.toString().match(/[+=]/g) && equation.slice(-1).match(/[+=]/g))
        return false
      else return true
    } else {
      if (!symbol.toString().match(/[a-z]/i)) return false
      else return true
    }
  }
  const handleSymbolBtnClick = (symbol: string | number): void => {
    if (isValidInput(symbol)) {
      dispatch(setEquation(symbol.toString()))
      !isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
    } else return
  }

  const handleClearBtnClick = (): void => {
    dispatch(resetEquation())
    dispatch(resetInitialEquation())
    dispatch(resetBalancedEquation())
    isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
  }

  const handleRemoveBtnClick = (): void => {
    dispatch(removeSymbol())
    equation.length === 1 && dispatch(toggleEqualizeBtn())
  }

  return (
    <div className={styles.table}>
      {DATA.map((symbol, index) => (
        <button
          className={styles.tableItem}
          key={index}
          onClick={() => handleSymbolBtnClick(symbol)}
        >
          {symbol}
        </button>
      ))}
      <button className={styles.tableItem} onClick={handleClearBtnClick}>
        <GrPowerReset />
      </button>
      <button className={styles.tableItem} onClick={handleRemoveBtnClick}>
        <RiDeleteBack2Line />
      </button>
    </div>
  )
}

export default CaclulatorPanel
