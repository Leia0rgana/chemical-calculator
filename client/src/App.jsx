import './App.css'
import EquationForm from './components/EquationForm'
import Table from './components/Table'
import CaclulatorPanel from './components/CaclulatorPanel'
import Error from './components/UI/Error'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Info from './components/Info'

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])
  return (
    <div className="App">
      <Error />
      <h1 style={{ marginBottom: '10px' }}> Балансировка химических реакций</h1>
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
        <Table isExtended={false} />
      </div>
      <div id="info">
        <Info />
      </div>
    </div>
  )
}

export default App
