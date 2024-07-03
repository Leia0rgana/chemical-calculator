import styles from './EquationForm.module.css'
import { useGetEquationMutation } from '../redux/elementsApi'
import { useAppSelector, useAppDispatch } from '../hooks'
import { ImSpinner2 } from 'react-icons/im'
import { IoArrowForwardOutline } from 'react-icons/io5'
import {
  selectEquation,
  selectIsActiveEqualizeBtn,
  selectBalancedEquation,
  resetEquation,
  removeSymbol,
  setBalancedEquation,
  resetBalancedEquation,
  toggleEqualizeBtn,
  selectInitialEquation,
  setInitialEquation,
} from '../redux/slices/equationSlice'
import { setError } from '../redux/slices/errorSlice'

interface IError {
  status: string
  originalStatus: number
  data: string
  error: string
}

const EquationForm = () => {
  const equation = useAppSelector(selectEquation)
  const isActiveEqualizeBtn = useAppSelector(selectIsActiveEqualizeBtn)
  const balancedEquation = useAppSelector(selectBalancedEquation)
  const initialEquation = useAppSelector(selectInitialEquation)
  const dispatch = useAppDispatch()

  const [getEquation, { isLoading }] = useGetEquationMutation()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    dispatch(setInitialEquation(equation))

    dispatch(resetBalancedEquation())
    dispatch(resetEquation())
    dispatch(toggleEqualizeBtn())
    e.preventDefault()

    await getEquation({ equation: equation })
      .unwrap()
      .then((payload) => dispatch(setBalancedEquation(payload.outChem)))
      .catch((error: IError) => {
        dispatch(setError(error.data))
        console.log(error)
      })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace' && equation) dispatch(removeSymbol()) //TODO
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="equation"
          placeholder="Введите реакцию"
          value={equation}
          readOnly={true}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.button}
          disabled={isActiveEqualizeBtn ? false : true}
        >
          {' '}
          Уравнять
        </button>
      </form>
      {isLoading ? (
        <ImSpinner2 className="spinner" />
      ) : (
        balancedEquation && (
          <div className={styles.container}>
            <h2 className={styles.equations}>
              {initialEquation}
              <IoArrowForwardOutline />
              {balancedEquation}
            </h2>
          </div>
        )
      )}
    </>
  )
}

export default EquationForm
