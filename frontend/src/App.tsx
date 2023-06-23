import './App.css'
import CustomNav from './components/Navbar'


import { MainPage } from './pages/MainPage'

function App() {

  return (
    <div className='flex flex-col w-full h-screen'>
    <CustomNav />
     <MainPage />
    </div>
  )
}

export default App
