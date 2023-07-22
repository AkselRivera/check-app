import { Button, Input, Option, Select } from "@material-tailwind/react";
import { ModalProps } from "../modal.types";
import { closeModal } from "../../../utils/modal";
import { useForm, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";

type Inputs = {
  product_name: string;
  quantity: Number;
  price: Number;
  family: string;
  total: Number;
};

export const AddForm = ({ setProps }: ModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const watchQuantity: Number = watch("quantity");
  const watchPrice: Number = watch("price");

  const [value, setValue] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!!watchPrice && !!watchQuantity) {
      setTotal(Number(watchPrice) * Number(watchQuantity));
    }
  }, [watchQuantity, watchPrice]);

  function handleChange(value: any) {
    setValue(value);
  }

  return (
    <div className="max-h-[70vh] ">
      <form
        className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto px-4"
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
          {...register("product_name", {
            required: "Product name is required",
          })}
          autoComplete="off"
          variant="standard"
          label="Product name"
          color="white"
          error={!!errors.product_name}
          labelProps={{
            className: " text-base text-gray-400",
          }}
          containerProps={{
            className: " w-full  pt-2 mb-6 ",
          }}
          className="text-gray-50 bg-transparent"
        />

        <Select
          {...register("family", {
            required: "Family is required",
            setValueAs: () => value,
          })}
          label="Family"
          value={value}
          error={!!errors.family}
          onChange={handleChange}
          variant="standard"
          labelProps={{
            className: " text-base text-gray-400",
          }}
          containerProps={{
            className: " w-full  pt-2 mb-6 ",
          }}
          className="text-gray-50 bg-transparent"
          menuProps={{
            className: "text-gray-50 bg-custom border-0 ",
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
          {...register("quantity", {
            required: "Quantity must be greater than one",
            min: 1,
          })}
          variant="standard"
          label="Quantity"
          type="number"
          color="white"
          error={!!errors.quantity}
          labelProps={{
            className: "md:px-2  text-base text-gray-400",
          }}
          containerProps={{
            className: " w-full md:w-1/3 md:px-2 pt-2 mb-6",
          }}
          className="text-gray-50 bg-transparent"
        />
        <Input
          {...register("price", {
            required: "Price must be greater than $ 0.0",
            min: 0.1,
            pattern: /\d+/,
          })}
          variant="standard"
          label="Unit price"
          type="number"
          step="any"
          color="white"
          error={!!errors.price}
          labelProps={{
            className: "md:px-2 text-base text-gray-400",
          }}
          containerProps={{
            className: " w-full md:w-1/3  md:px-2 pt-2 mb-6",
          }}
          className="text-gray-50 text-base bg-transparent"
        />
        <div className=" w-full md:w-1/3 flex flex-col mb-6">
          <label className="w-full text-sm">Total</label>
          <label className="w-full border-0 border-b"> $ {total}</label>
        </div>

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
  );
};
