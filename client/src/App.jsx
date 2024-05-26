import './App.css'
import EquationForm from './components/EquationForm'
import Table from './components/Table'
import CaclulatorPanel from './components/CaclulatorPanel'

function App() {
  return (
    <div className="App">
      <div className="container">
        <EquationForm />
        <CaclulatorPanel />
        <Table />
      </div>
    </div>
  )
}

export default App
