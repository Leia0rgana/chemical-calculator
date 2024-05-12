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
      .then((res) => setResult(res))
      .catch((error) => {
        console.log(error.message)
        setError(true)
      })
  }

  const getElement = async (elementSymbol) => {
    const response = await axios.post('http://localhost:3000/', {
      symbol: elementSymbol,
    })
    return response.data
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
      {result && (
        <>
          <h2>{result.name}</h2>
          <p>Обозначение: {result.symbol}</p>
          <p>Номер: {result.number}</p>
        </>
      )}
      {error && <h2>Something went wrong</h2>}
    </>
  )
}

export default EquationForm
