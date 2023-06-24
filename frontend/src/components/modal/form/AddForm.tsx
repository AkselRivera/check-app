import { Button, Input, Option, Select } from '@material-tailwind/react'
import { ModalProps } from '../modal.types'
import { closeModal } from '../../../utils/modal'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useState } from 'react'

type Inputs = {
  product_name: string
  quantity: string
  price: string
  family: string
}

export const AddForm = ({ setProps }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const [value, setValue] = useState('')

  function handleChange(value: any) {
    setValue(value)
  }

  return (
    <div className="max-h-[70vh] ">
      <form
        className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(errors.product_name ||
          errors.quantity ||
          errors.price ||
          errors.family) && (
          <div className="w-full text-center p-2 m-3 rounded bg-red-500">
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.product_name?.message}
            </p>
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.quantity?.message}
            </p>
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.price?.message}
            </p>
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.family?.message}
            </p>
          </div>
        )}
        <Input
          {...register('product_name', {
            required: 'Product name is required',
          })}
          autoComplete="off"
          variant="standard"
          label="Product name"
          color="white"
          error={!!errors.product_name}
          labelProps={{
            className: ' text-base text-gray-400',
          }}
          containerProps={{
            className: ' w-full  pt-2 mb-6 ',
          }}
          className="text-gray-50 bg-transparent"
        />

        <Select
          {...register('family', {
            required: 'Family is required',
            setValueAs: () => value,
          })}
          label="Family"
          value={value}
          error={!!errors.family}
          onChange={handleChange}
          variant="standard"
          labelProps={{
            className: ' text-base text-gray-400',
          }}
          containerProps={{
            className: ' w-full  pt-2 mb-6 ',
          }}
          className="text-gray-50 bg-transparent"
          menuProps={{
            className: 'text-gray-50 bg-custom border-0 ',
          }}
        >
          <Option className=" " value="123">
            Material Tailwind HTML
          </Option>
          <Option>Material Tailwind React</Option>
          <Option>Material Tailwind Vue</Option>
          <Option>Material Tailwind Angular</Option>
          <Option>Material Tailwind Svelte</Option>
        </Select>

        <Input
          {...register('quantity', {
            required: 'Quantity must be greater than one',
            min: 1,
          })}
          variant="standard"
          label="Quantity"
          type="number"
          color="white"
          error={!!errors.quantity}
          labelProps={{
            className: 'md:px-2  text-base text-gray-400',
          }}
          containerProps={{
            className: ' w-full md:w-1/2 md:px-2 pt-2 mb-6',
          }}
          className="text-gray-50 bg-transparent"
        />
        <Input
          {...register('price', {
            required: 'Price must be greater than $ 0.0',
            min: 0.1,
            pattern: /\d+/,
          })}
          variant="standard"
          label="Price"
          type="number"
          step="any"
          color="white"
          error={!!errors.price}
          labelProps={{
            className: 'md:px-2 text-base text-gray-400',
          }}
          containerProps={{
            className: ' w-full md:w-1/2  md:px-2 pt-2 mb-6',
          }}
          className="text-gray-50 text-base bg-transparent"
        />

        <div className="flex flex-row gap-2 justify-evenly w-full">
          <Button
            onClick={() => closeModal({ setProps })}
            variant="outlined"
            color="red"
            className="focus:ring-transparent outline-none "
          >
            Close
          </Button>
          <Button
            type="submit"
            className="focus:ring-transparent outline-none"
            color="green"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}
