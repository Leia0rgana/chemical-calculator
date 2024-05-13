import { useState } from 'react'
import { useGetElementBySymbolMutation } from '../redux/elementsApi'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectElementSymbol,
  setElementSymbol,
} from '../redux/slices/elementSlice'

const EquationForm = () => {
  const dispatch = useDispatch()
  const elementSymbol = useSelector(selectElementSymbol)

  const [result, setResult] = useState('')

  const [getElementBySymbol, { isLoading, error }] =
    useGetElementBySymbolMutation()

  const handleSubmit = async (e) => {
    setResult('')
    e.preventDefault()
    await getElementBySymbol({ symbol: elementSymbol })
      .unwrap()
      .then((payload) => setResult(payload))
      .catch((error) => console.log(error.status, error.data))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Уравнение реакции </label>
        <input
          type="text"
          name="equation"
          value={elementSymbol}
          onChange={(e) => dispatch(setElementSymbol(e.target.value))}
        />
        <button type="submit">Уравнять</button>
      </form>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{`Error: ${error.data}`}</h2>
      ) : (
        result && (
          <>
            <h2>{result.name}</h2>
            <p>Обозначение: {result.symbol}</p>
            <p>Номер: {result.number}</p>
          </>
        )
      )}
    </>
  )
}

export default EquationForm
