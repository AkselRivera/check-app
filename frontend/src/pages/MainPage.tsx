import CustomNav from '../components/Navbar'
import { Bill } from './Bill'
import { Families } from './Families'

export const MainPage = () => {
  return (
    <div className="flex flex-col w-[100vw] h-screen">
      <CustomNav />

      <div className="max-h-[90vh] flex flex-row md:flex-col flex-wrap ">
        <Bill />
        <Families />
      </div>
    </div>
  )
}
