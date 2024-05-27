import styles from './EquationForm.module.css'
import { useGetEquationMutation } from '../redux/elementsApi'
import { useSelector, useDispatch } from 'react-redux'
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
} from '../redux/slices/equationSlice'
import { setError } from '../redux/slices/errorSlice'
import { useState } from 'react'

const EquationForm = () => {
  const equation = useSelector(selectEquation)
  const isActiveEqualizeBtn = useSelector(selectIsActiveEqualizeBtn)
  const balancedEquation = useSelector(selectBalancedEquation)
  const dispatch = useDispatch()

  const [getEquation, { isLoading }] = useGetEquationMutation()
  const [initialEquation, setInitialEquation] = useState('')

  const handleSubmit = async (e) => {
    setInitialEquation(equation)

    dispatch(resetBalancedEquation())
    dispatch(resetEquation())
    dispatch(toggleEqualizeBtn())
    e.preventDefault()

    await getEquation({ equation: equation })
      .unwrap()
      .then((payload) => dispatch(setBalancedEquation(payload.outChem)))
      .catch((error) => {
        dispatch(setError(error.data))
        console.log(error)
      })
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
        <ImSpinner2 className="spinner" />
      ) : (
        balancedEquation && (
          <div>
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
