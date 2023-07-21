import { Button, Input } from '@material-tailwind/react'
import { ModalProps } from '../modal.types'
import { closeModal } from '../../../utils/modal'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  percentage: string
}

export const TipForm = ({ setProps }: ModalProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { percentage: "10" },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="max-h-[70vh] ">
      <form
        className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.percentage && (
          <div className="w-full text-center p-2 m-3 rounded bg-red-500">
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.percentage?.message}
            </p>
          </div>
        )}
        <Input
          {...register('percentage', {
            required: 'Tip percentage is required',
            min:1
          })}
          autoComplete="off"
          variant="standard"
          label="Tip percentage %"
          color="white"
          error={!!errors.percentage}
          labelProps={{
            className: ' text-base text-gray-400',
          }}
          containerProps={{
            className: ' w-full  pt-2 mb-6 ',
          }}
          className="text-gray-50 bg-transparent"
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
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
