import { useState } from 'react'
import axios from 'axios'

const EquationForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    setResult('')
    setError(false)

    e.preventDefault()
    setInputValue('')

    await getElement(inputValue)
      .then((newResult) => setResult(newResult))
      .catch(() => setError(true))
  }

  const getElement = async (elementSymbol) => {
    try {
      const response = await axios.post('http://localhost:3000/', {
        symbol: elementSymbol,
      })
      return response.data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Уравнение реакции
          <input
            type="text"
            name="equation"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Уравнять</button>
      </form>
      {result && (
        <>
          <h2>{result.name}</h2>
          <p>Symbol: {result.symbol}</p>
          <p>Atomic Mass: {result.atomic_mass}</p>
        </>
      )}
      {error && <h2>Something went wrong</h2>}
    </>
  )
}

export default EquationForm
