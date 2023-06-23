import { Button, Typography } from '@material-tailwind/react'
import gopherData from '../assets/gopher-data.svg'
import CustomCard from '../components/share/CustomCard'

export const Families = () => {
  return (
    <div className="h-[100%] flex flex-col w-full md:w-1/2  shadow-xl md:shadow-none  ease-in-out duration-300 p-4">
      <div className="flex w-full items-center">
        <div className="w-3/4 text-center">
          <Typography className="text-lg font-semibold">FAMILIES</Typography>
          <Typography className="text-xs">
            Currently you have selected 10% tip
          </Typography>
          <Button variant="text" className="text-xs p-0 capitalize">
            Change tip percentage
          </Button>
        </div>
        <img src={gopherData} className="logo w-1/4 p-2 " alt="Gopher Bill" />
      </div>

      <div className="flex flex-wrap gap-2 justify-center overflow-auto  px-2 ">
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </div>
    </div>
  )
}
