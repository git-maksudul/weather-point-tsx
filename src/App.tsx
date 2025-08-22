import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div className='px-5 mx-auto text-center lg:py-10 py-4'>
        <h1 className='lg:text-5xl text-xl font-bold text-blue-500'>Weather Forecast</h1>
        <WeatherDashboard></WeatherDashboard>
      </div>
    </>
  )
}

export default App
