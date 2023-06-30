import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Badge,
  CardHeader,
  IconButton,
} from '@material-tailwind/react'

import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CustomCard() {
  return (
    <Card className="mt-4 w-full md:w-72 bg-gradient-to-b from-gray-800 to-gray-900  text-blue-gray-50">
      <CardBody className="py-3">
        <div className="flex justify-end">
          <IconButton
            color="red"
            className=" rounded-full h-5 w-5"
            // onClick={addForm}
          >
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <Typography variant="h5" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography className="font-semibold">Food intake:</Typography>
        <Typography className="text-center" color="blue">
          $ 0.0
        </Typography>
        <Typography className="font-semibold "> Total with tip:</Typography>
        <Typography className="text-center" color="green">
          $ 0.0
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 text-center">
        <Badge content="5" withBorder>
          <Button>Products</Button>
        </Badge>
      </CardFooter>
    </Card>
  )
}
