import gopher from '../assets/gopher-data.svg'
import { Bill } from './Bill'


export const MainPage = () => {
  return (
    <div className="flex-1 flex flex-wrap  border ">
    <Bill />
    <Bill />
    <img src={gopher} className="logo" alt="Vite logo" />
    <img src={gopher} className="logo" alt="Vite logo" />
    <img src={gopher} className="logo" alt="Vite logo" />
    <img src={gopher} className="logo" alt="Vite logo" />
        
    </div>
  )
}
