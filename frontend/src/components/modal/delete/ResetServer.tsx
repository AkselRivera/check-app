import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { ModalProps } from "../modal.types";
import { closeModal } from "../../../utils/modal";

import "lord-icon-element";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App_QueryCache } from "../../../constants/QueryCache";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetServer } from "../../../api/default/postDefault";

import { toast } from "react-toastify";

export const ResetServer = ({ setProps }: ModalProps) => {
  const [disabled, setDisabled] = useState(false);

  const client = useQueryClient();
  const resetMutation = useMutation({
    mutationFn: (familyID: { password: string }) => resetServer(familyID),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<{ password: string }> = (data) => {
    setDisabled(true);

    resetMutation.mutate(data, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: [App_QueryCache.PRODUCT] });
        client.refetchQueries({ queryKey: [App_QueryCache.PRODUCT] });
        client.invalidateQueries({ queryKey: [App_QueryCache.FAMILY] });
        client.refetchQueries({ queryKey: [App_QueryCache.FAMILY] });
        handleModal();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.data?.data);
      },
      onSettled: () => {
        setDisabled(false);
      },
    });
  };

  function handleModal() {
    closeModal({ setProps });
  }

  return (
    <div className="max-h-[70vh] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto px-4 ">
          <div className="hidden  md:inline md:w-1/2 border h-96">
            {/* <Lord-icon
    src="https://cdn.lordicon.com/eeisfrmc.json"
    trigger="hover"
    colors="primary:#ebe6ef,secondary:#b26836"
    style="width:250px;height:250px">
</Lord-icon> */}
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-evenly border h-96 text-center  group">
            <span className="m-2 text-center text-lg font-semibold">
              Are you sure you want to reset{" "}
              <span className="capitalize group-hover:text-red-600 ease-in-out duration-300">
                the current check
              </span>{" "}
              ?
            </span>
            <div className="flex max-h-4/5 items-center justify-center">
              <ul className="text-left list-disc">
                <li>
                  <label className="font-semibold">Products:</label>
                  <span className="ml-2 group-hover:text-red-600 ease-in-out duration-300">
                    All products will be removed
                  </span>
                </li>

                <li>
                  <label className="font-semibold">Families:</label>
                  <span className="ml-2 group-hover:text-red-600 ease-in-out duration-300">
                    Only the "DEFAULT" family will remain
                  </span>
                </li>
              </ul>
            </div>
            <span className="m-2 text-center text-sm font-semibold group-hover:text-red-600 ease-in-out duration-300 ">
              CAUTION: This action is irreversible
            </span>
            <div className="mx-4">
              <label className="pb-4 text-sm font-semibold text-amber-300">
                Please enter the administrator's password to confirm:
              </label>
              <Input
                {...register("password", {
                  required: "Password  is required",
                })}
                autoComplete="off"
                variant="standard"
                label="Password"
                color="white"
                error={!!errors.password}
                labelProps={{
                  className: " text-base text-gray-400",
                }}
                containerProps={{
                  className: " w-full  pt-2 mb-6 ",
                }}
                className="text-gray-50 bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-evenly w-full">
          <Button
            onClick={handleModal}
            variant="outlined"
            color="red"
            className="focus:ring-transparent outline-none "
            disabled={disabled}
          >
            Close
          </Button>
          <Button
            type="submit"
            className="focus:ring-transparent outline-none disabled:cursor-not-allowed"
            color="green"
            disabled={disabled}
          >
            Accept
          </Button>
        </div>
      </form>
    </div>
  );
};
