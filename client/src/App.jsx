import './App.css'
import EquationForm from './components/EquationForm'
import Table from './components/Table'
import CaclulatorPanel from './components/CaclulatorPanel'
import Error from './components/UI/Error'

function App() {
  return (
    <div className="App">
      <Error />
      <div className="container">
        <EquationForm />
        <CaclulatorPanel />
        <Table isExtended={false} />
      </div>
    </div>
  )
}

export default App
