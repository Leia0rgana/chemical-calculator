import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './Table.module.css'

const Table = () => {
  const [error, setError] = useState(false)
  const [result, setResult] = useState([])

  useEffect(() => {
    setError(false)

    async function fecthData() {
      try {
        const res = await axios.get('http://localhost:3000/')
        setResult(res.data)
      } catch (error) {
        setError(true)
      }
    }
    fecthData()
  }, [])

  return (
    <div className={styles.table}>
      {!error &&
        result.map((element) => (
          <div className={styles.element} key={element.number}>
            <p>{element.number}</p>
            <p>{element.symbol}</p>
          </div>
        ))}
    </div>
  )
}

export default Table
