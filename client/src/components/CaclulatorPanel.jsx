import styles from './CalculatorPanel.module.css'
import { useDispatch, useSelector } from 'react-redux'
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
  const equation = useSelector(selectEquation)
  const isActiveEqualizeBtn = useSelector(selectIsActiveEqualizeBtn)
  const dispatch = useDispatch()

  const isValidInput = (symbol) => {
    if (equation) {
      if (symbol.toString().match(/[+=]/g) && equation.slice(-1).match(/[+=]/g))
        return false
      else return true
    } else {
      if (!symbol.match(/[a-z]/i)) return false
      else return true
    }
  }
  const handleSymbolBtnClick = (symbol) => {
    if (isValidInput(symbol)) {
      dispatch(setEquation(symbol))
      !isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
    } else return
  }

  const handleClearBtnClick = () => {
    dispatch(resetEquation())
    dispatch(resetInitialEquation())
    dispatch(resetBalancedEquation())
    isActiveEqualizeBtn && dispatch(toggleEqualizeBtn())
  }

  const handleRemoveBtnClick = () => {
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
