import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import gopherData from '../assets/gopher-data.svg'
import CustomCard from '../components/share/CustomCard'
import { PlusIcon } from '@heroicons/react/24/solid'
import { openModal } from '../utils/modal'
import { useState } from 'react'
import Modal from '../components/share/Modal'
import { FamilyForm } from '../components/modal/form/FamilyForm'

export const Families = () => {
  const [props, setProps] = useState({
    title: '',
    isOpen: false,
  })

  function addForm() {
    openModal({ setProps })
    setProps((state) => ({
      ...state,
      title: 'Add a new Family',
      isOpen: true,
      disabled: false,
    }))
  }

  return (
    <div className="h-[100%] flex flex-col w-full md:w-1/2  shadow-xl md:shadow-none  ease-in-out duration-300 p-4">
      <div className="flex w-full items-center">
        <div className="w-3/4 text-center">
          <div className="flex justify-center items-center gap-x-2 ">
            <Typography className="text-lg font-semibold">FAMILIES</Typography>
            <Tooltip content="Add a new family">
              <IconButton className="rounded-full h-5 w-5" onClick={addForm}>
                <PlusIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
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
      <Modal title={props.title} isOpen={props.isOpen}>
        <FamilyForm setProps={setProps} />
      </Modal>
    </div>
  )
}
