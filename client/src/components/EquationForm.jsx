import { useState } from 'react'
import { useGetElementBySymbolMutation } from '../redux/elementsApi'

const EquationForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')

  const [getElementBySymbol, { isLoading, error }] =
    useGetElementBySymbolMutation()

  const handleSubmit = async (e) => {
    setResult('')
    e.preventDefault()

    await getElementBySymbol({ symbol: inputValue })
      .unwrap()
      .then((payload) => setResult(payload))
      .catch((error) => console.log(error.status, error.data))
      .finally(setInputValue(''))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Уравнение реакции </label>
        <input
          type="text"
          name="equation"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
