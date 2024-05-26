import styles from './EquationForm.module.css'
import { useGetEquationMutation } from '../redux/elementsApi'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectEquation,
  selectIsActiveEqualizeBtn,
  selectBalancedEquation,
  resetEquation,
  removeSymbol,
  setBalancedEquation,
  resetBalancedEquation,
} from '../redux/slices/equationSlice'

const EquationForm = () => {
  const equation = useSelector(selectEquation)
  const isActiveEqualizeBtn = useSelector(selectIsActiveEqualizeBtn)
  const balancedEquation = useSelector(selectBalancedEquation)
  const dispatch = useDispatch()

  const [getEquation, { isLoading, error }] = useGetEquationMutation()

  const handleSubmit = async (e) => {
    dispatch(resetBalancedEquation())
    dispatch(resetEquation())
    e.preventDefault()

    await getEquation({ equation: equation }) //запрос на балансировку реакции
      .unwrap()
      .then((payload) => dispatch(setBalancedEquation(payload.outChem)))
      .catch((error) => console.log(error.status, error.data))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && equation) dispatch(removeSymbol()) //TODO
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="equation"
          value={equation}
          readOnly={true}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.button}
          disabled={isActiveEqualizeBtn ? null : 'disabled'}
        >
          {' '}
          Уравнять
        </button>
      </form>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{`Error: ${error.data}`}</h2>
      ) : (
        balancedEquation && (
          <>
            <h2>{balancedEquation}</h2>
          </>
        )
      )}
    </>
  )
}

export default EquationForm
