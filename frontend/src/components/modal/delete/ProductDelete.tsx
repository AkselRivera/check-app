import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { ModalProps } from "../modal.types";
import { closeModal } from "../../../utils/modal";

import "lord-icon-element";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../api/products/deleteProducts";
import { cleanProduct } from "../../../reducer/ui";
import { App_QueryCache } from "../../../constants/QueryCache";

export const ProductDelete = ({ setProps }: ModalProps) => {
  const { selectedProduct } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);

  const client = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (productID: string) => deleteProduct(productID),
  });

  function handleDelete() {
    setDisabled(true);
    if (!!selectedProduct?.id)
      deleteMutation.mutate(selectedProduct.id, {
        onSuccess: () => {
          setDisabled(false);
          client.invalidateQueries({ queryKey: [App_QueryCache.PRODUCT] });
          client.refetchQueries({ queryKey: [App_QueryCache.PRODUCT] });
          client.invalidateQueries({ queryKey: [App_QueryCache.FAMILY] });
          client.refetchQueries({ queryKey: [App_QueryCache.FAMILY] });
          handleModal();
        },
      });
    else alert("An error ocurred please try it again");
  }

  function handleModal() {
    dispatch(cleanProduct());
    closeModal({ setProps });
  }

  return (
    <div className="max-h-[70vh] ">
      <div className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto px-4 ">
        <div className="hidden  md:inline md:w-1/2 border h-96">
          {/* <Lord-icon
            src="https://cdn.lordicon.com/eeisfrmc.json"
            trigger="hover"
            colors="primary:#ebe6ef,secondary:#b26836"
            style="width:250px;height:250px"
          ></Lord-icon> */}
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-evenly border h-96 text-center  group">
          <span className="m-2 text-center text-lg font-semibold">
            Are you sure you want to delete{" "}
            <span className="capitalize group-hover:text-red-600 ease-in-out duration-300">
              {selectedProduct?.name}
            </span>{" "}
            ?
          </span>
          <div className="flex max-h-4/5 items-center justify-center">
            <ul className="text-left list-disc">
              <li>
                <label className="font-semibold">Quantity:</label>
                <span className="ml-2 group-hover:text-red-600 ease-in-out duration-300">
                  {selectedProduct?.quantity}
                </span>
              </li>
              <li>
                <label className="font-semibold">Unit price:</label>
                <span className="ml-2 group-hover:text-red-600 ease-in-out duration-300">
                  ${selectedProduct?.unitPrice.toFixed(2)}
                </span>
              </li>
              <li>
                <label className="font-semibold">Total:</label>
                <span className="ml-2 group-hover:text-red-600 ease-in-out duration-300">
                  ${selectedProduct?.total.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
          <span className="m-2 text-center text-sm font-semibold group-hover:text-red-600 ease-in-out duration-300 ">
            CAUTION: This action is irreversible
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-evenly w-full">
        <Button
          onClick={handleModal}
          variant="outlined"
          color="red"
          className="focus:ring-transparent outline-none "
        >
          Close
        </Button>
        <Button
          type="button"
          className="focus:ring-transparent outline-none disabled:cursor-not-allowed"
          color="green"
          onClick={handleDelete}
          disabled={disabled}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
