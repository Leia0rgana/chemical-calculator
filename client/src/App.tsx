import './App.css'
import EquationForm from './components/EquationForm'
import Table from './components/CalculatorTable'
import CaclulatorPanel from './components/CaclulatorPanel'
import Error from './components/UI/Error'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Info from './components/Info'

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const itemOnPage = document.querySelector(location.hash)
      if (itemOnPage) {
        itemOnPage.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])
  return (
    <div className="App">
      <Error />
      <h1> Балансировка химических реакций</h1>
      <h2 style={{ margin: '10px' }}>
        <Link
          to="#info"
          style={{ textDecoration: 'underline', color: '#5CC4E0' }}
        >
          Воспользуйтесь
        </Link>{' '}
        калькулятором для расстановки стехиометрических коэффициентов в реакциях
      </h2>{' '}
      <div className="container">
        <EquationForm />
        <CaclulatorPanel />
        <Table />
      </div>
      <div id="info">
        <Info />
      </div>
    </div>
  )
}

export default App
