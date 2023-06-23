import { Button, Card, Checkbox, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Modal from '../share/Modal'

interface ButtonHeader {
  title: string
}

const TABLE_HEAD = [
  'Check',
  'Name',
  'Family',
  'Quantity',
  'Total',
  { title: 'Add' },
]

const TABLE_ROWS = [
  {
    check: true,
    name: 'John Michael',
    job: 'Manager',
    date: '23/04/18',
  },
  {
    check: true,
    name: 'Alexa Liras',
    job: 'Developer',
    date: '23/04/18',
  },
  {
    check: true,
    name: 'Laurent Perrier',
    job: 'Executive',
    date: '19/09/17',
  },
  {
    check: true,
    name: 'Michael Levi',
    job: 'Developer',
    date: '24/12/08',
  },
  {
    check: true,
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    check: true,
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    check: true,
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    check: true,
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
  {
    check: true,
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21',
  },
]

export default function BillTable() {
  const [props, setProps] = useState({
    title: '',
    isOpen: false,
  })

  function openModal() {
    setProps((state) => ({ ...state, isOpen: true }))
  }

  function addForm() {
    openModal()
    setProps((state) => ({
      ...state,
      title: 'Add Simulation',
      isOpen: true,
      disabled: false,
    }))
  }
  return (
    <Card className="overflow-auto h-full w-full rounded-md max-h-[80%] ">
      <table className="w-full min-w-max table-auto text-center bg-gradient-to-b from-gray-800 to-gray-900 text-blue-gray-50">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: string | ButtonHeader) => {
              if (typeof head == 'string')
                return (
                  <th
                    key={head}
                    className="border-b border-gray-800 bg-gray-900 p-4 sticky top-0 z-10 "
                  >
                    <Typography
                      variant="small"
                      className="uppercase  font-semibold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                )
              else
                return (
                  <th
                    key={new Date().toISOString()}
                    className="border-b border-gray-800 bg-gray-900 p-4 sticky top-0 z-10"
                  >
                    <Button variant="outlined" onClick={addForm}>
                      {head.title}
                    </Button>
                  </th>
                )
            })}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ check, name, job, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1
            const classes = isLast ? 'p-4' : 'p-4 border-b border-gray-800'

            return (
              <tr key={name}>
                <td className={classes}>
                  <Checkbox defaultChecked={check} />
                </td>
                <td className={classes}>
                  <Typography variant="small" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" className="font-normal">
                    Familia
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" className="font-normal">
                    {job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" className="font-normal">
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Button onClick={() => alert('Editar')} variant="text">
                    Edit
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal title={props.title} isOpen={props.isOpen}>
        <Dummy setProps={setProps} />
      </Modal>
    </Card>
  )
}

type DummyProps = {
  setProps: React.Dispatch<
    React.SetStateAction<{
      title: string
      isOpen: boolean
    }>
  >
}

export const Dummy = ({ setProps }: DummyProps) => {
  const closeModal = () => {
    setProps((prev) => ({ ...prev, isOpen: false }))
  }

  return <div onClick={closeModal}>Dummy</div>
}
