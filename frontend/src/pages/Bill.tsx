
import gopherBill from '../assets/gopher-notes.svg'
import BillTable from '../components/tables/BillTable'

export const Bill = () => {
  return (
    <div className='flex flex-col w-1/2 border border-blue-200 shadow-xl  ease-in-out duration-300 p-3'>
        <div className='flex w-full items-center'>
        <span className='w-3/4 text-center text-lg font-semibold'>YOUR CHECK</span>
        <img src={gopherBill} className="logo w-1/4 p-2 " alt="Gopher Bill" />
        </div>
        <BillTable />
    </div>
  )
}



