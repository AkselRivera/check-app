import { Button, Input, Option, Select } from "@material-tailwind/react";
import { ModalProps } from "../modal.types";
import { closeModal } from "../../../utils/modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postProduct } from "../../../api/products/postProducts";
import { App_QueryCache } from "../../../constants/QueryCache";
import { getFamilies } from "../../../api/family/getFamily";
import { Product } from "../../../types/types";

type Inputs = {
  name: string;
  quantity: number;
  unitPrice: number;
  family_id: string;
  total: number;
};

export const ProductForm = ({ setProps }: ModalProps) => {
  const [disable, setDisable] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      family_id: "default",
    },
  });

  const watchQuantity: number = watch("quantity");
  const watchPrice: number = watch("unitPrice");

  const [total, setTotal] = useState(0);

  const { data } = useQuery({
    queryKey: [App_QueryCache.FAMILY_SHORT],
    queryFn: getFamilies,
  });

  const postMutation = useMutation({
    mutationFn: (data: Inputs) => postProduct(data),
  });

  const client = useQueryClient();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setDisable(true);
    postMutation.mutate(
      { ...data, total },
      {
        onSuccess: () => {
          setDisable(false);
          client.invalidateQueries({ queryKey: [App_QueryCache.PRODUCT] });
          client.refetchQueries({ queryKey: [App_QueryCache.PRODUCT] });
          client.invalidateQueries({ queryKey: [App_QueryCache.FAMILY] });
          client.refetchQueries({ queryKey: [App_QueryCache.FAMILY] });
          closeModal({ setProps });
        },
      }
    );
  };

  useEffect(() => {
    if (!!watchPrice && !!watchQuantity) {
      setTotal(Number(watchPrice) * Number(watchQuantity));
    }
  }, [watchQuantity, watchPrice]);

  return (
    <div className=" ">
      <form
        className="mb-4 flex flex-wrap py-4 -mx-2 w-full max-h-[75vh] justify-center overflow-auto px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(errors.name ||
          errors.quantity ||
          errors.unitPrice ||
          errors.family_id) && (
          <div className="w-full text-center p-2 m-3 rounded bg-red-500">
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.name?.message}
            </p>
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.quantity?.message}
            </p>
            <p className="text-white font-semibold text-sm tracking-wider">
              {errors.unitPrice?.message}
            </p>
            <p className="text-white font-semibold text-sm tracking-wider ">
              {errors.family_id?.message}
            </p>
          </div>
        )}
        <Input
          {...register("name", {
            required: "Product name is required",
          })}
          autoComplete="off"
          variant="standard"
          label="Product name"
          color="white"
          error={!!errors.name}
          labelProps={{
            className: " text-base text-gray-400",
          }}
          containerProps={{
            className: " w-full  pt-2 mb-6 ",
          }}
          className="text-gray-50 bg-transparent"
        />

        <Controller
          rules={{ required: "Family is required" }}
          name="family_id"
          control={control}
          render={({ field: { value, onChange, ref } }) => (
            <Select
              value={value}
              ref={ref}
              onChange={onChange as any}
              label="Family"
              error={!!errors.family_id}
              variant="standard"
              labelProps={{
                className: " text-base text-gray-400",
              }}
              containerProps={{
                className: " w-full pt-2 mb-6 ",
              }}
              className="text-gray-50 bg-transparent"
              menuProps={{
                className: "text-gray-50 h-28 bg-custom border-0 ",
              }}
            >
              {!data?.data ? (
                <Option disabled>No data</Option>
              ) : (
                data?.data?.map((item: Product) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))
              )}
            </Select>
          )}
        />

        <Input
          {...register("quantity", {
            required: "Quantity must be greater than 1",
            min: 1,
            valueAsNumber: true,
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
          {...register("unitPrice", {
            required: "Price must be greater than $ 0.0",
            min: 0.1,
            valueAsNumber: true,
          })}
          variant="standard"
          label="Unit price"
          type="number"
          step="any"
          color="white"
          error={!!errors.unitPrice}
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
            className="focus:ring-transparent outline-none disabled:cursor-not-allowed"
            disabled={disable}
          >
            Close
          </Button>
          <Button
            type="submit"
            className="focus:ring-transparent outline-none disabled:cursor-not-allowed"
            color="green"
            disabled={disable}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
