import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Badge,
} from '@material-tailwind/react'

export default function CustomCard() {
  return (
    <Card className="mt-6 w-full md:w-72 bg-gradient-to-b from-gray-800 to-gray-900  text-blue-gray-50">
      <CardBody className="">
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
