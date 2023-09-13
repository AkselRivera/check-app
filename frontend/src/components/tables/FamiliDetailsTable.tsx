import { ProductForm } from "../modal/form/ProductForm";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";

import Modal from "../share/Modal";
import { DefaultColumn } from "../share/table/DefaultColumn";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../reducer/ui";
import { IProduct, getProductsByFamily } from "../../api/products/getProducts";
import { ProductDelete } from "../modal/delete/ProductDelete";
import { useQuery } from "@tanstack/react-query";
import { App_QueryCache } from "../../constants/QueryCache";
import { RootState } from "../../reducer/store";
import { openModal } from "../../utils/modal";

const FORM_TYPES = {
  DELETE_FORM: "PORDUCT_DELETE",
  PRODUCT_FORM: "PRODUCT_FORM",
} as const;

const TABLE_HEAD = ["Name", "Details", "Total", "Actions"];

export default function FamilyDetailsTable() {
  const { selectedFamily } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const {
    data: productData,
    // refetch: refetchProduct,
    isFetching,
  } = useQuery({
    queryKey: [App_QueryCache.PRODUCT_BY_FAMILY + selectedFamily?.id],
    queryFn: () => getProductsByFamily(selectedFamily?.id),
    retry: false,
  });

  const [formType, setFormType] = useState<keyof typeof FORM_TYPES | "">("");
  const [props, setProps] = useState({
    title: "",
    isOpen: false,
  });

  function editForm(item: IProduct) {
    setFormType("PRODUCT_FORM");
    dispatch(selectProduct(item));

    setProps((state) => ({
      ...state,
      title: "Edit product",
      disabled: false,
    }));

    openModal({ setProps });
  }

  function deleteForm(item: IProduct) {
    setFormType("DELETE_FORM");
    dispatch(selectProduct(item));

    setProps((state) => ({
      ...state,
      title: "Delete product",
      disabled: false,
    }));

    openModal({ setProps });
  }

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="overflow-auto h-full w-full rounded-md max-h-[60vh] bg-custom">
      <table className="w-full min-w-max table-auto text-center bg-gradient-to-b from-gray-800 to-gray-900 text-blue-gray-50">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: string) => {
              if (typeof head == "string")
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
                );
            })}
          </tr>
        </thead>
        <tbody>
          {!!productData && productData?.length > 0 ? (
            productData.map((row, index: number) => {
              const isLast = index === productData.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-800";
              const { id, name, unitPrice, quantity, total } = row;
              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {`${quantity} x $ ${unitPrice.toFixed(2)}`}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      $ {total.toFixed(2)}
                    </Typography>
                  </td>
                  <td className={`${classes} flex flex-col`}>
                    <Button onClick={() => editForm(row)} variant="text">
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteForm(row)}
                      variant="text"
                      color="red"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <DefaultColumn cols={4} />
          )}
        </tbody>
      </table>

      <Modal title={props.title} isOpen={props.isOpen}>
        {formType === "PRODUCT_FORM" ? (
          <ProductForm setProps={setProps} />
        ) : (
          <ProductDelete setProps={setProps} />
        )}
      </Modal>
    </div>
  );
}
