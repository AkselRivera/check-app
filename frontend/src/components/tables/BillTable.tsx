import { ProductForm } from "../modal/form/ProductForm";
import { Button, Card, Checkbox, Typography } from "@material-tailwind/react";
import { openModal } from "../../utils/modal";
import { useState } from "react";

import Modal from "../share/Modal";
import { DefaultColumn } from "../share/table/DefaultColumn";
import { useDispatch } from "react-redux";
import { selectProduct } from "../../reducer/ui";
import { IProduct } from "../../api/products/getProducts";

interface ButtonHeader {
  title: string;
}

const TABLE_HEAD = [
  "Check",
  "Name",
  "Family",
  "Quantity",
  "Total",
  { title: "Add" },
];

type BillProps = {
  products: IProduct[] | null | undefined;
};

export default function BillTable({ products }: BillProps) {
  const dispatch = useDispatch();

  const [props, setProps] = useState({
    title: "",
    isOpen: false,
  });

  function addForm() {
    openModal({ setProps });
    setProps((state) => ({
      ...state,
      title: "Add product",
      isOpen: true,
      disabled: false,
    }));
  }

  function editForm(item: IProduct) {
    //TODO: Hacer el tipo que recibe este metodo
    dispatch(selectProduct(item));

    setProps((state) => ({
      ...state,
      title: "Edit product",
      isOpen: true,
      disabled: false,
    }));

    openModal({ setProps });
  }

  function deleteForm(item: IProduct) {
    //TODO: Hacer el tipo que recibe este metodo
    dispatch(selectProduct(item));

    setProps((state) => ({
      ...state,
      title: "Delete product",
      isOpen: true,
      disabled: false,
    }));

    openModal({ setProps });
  }

  return (
    <Card className="overflow-auto h-full w-full rounded-md max-h-[80%] bg-custom">
      <table className="w-full min-w-max table-auto text-center bg-gradient-to-b from-gray-800 to-gray-900 text-blue-gray-50">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: string | ButtonHeader) => {
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
              else
                return (
                  <th
                    key={new Date().toISOString()}
                    className="border-b border-gray-800 bg-gray-900 p-4 sticky top-0 z-10"
                  >
                    <Button
                      color="green"
                      onClick={addForm}
                      className="focus:ring-transparent focus-visible:ring-0 "
                    >
                      {head.title}
                    </Button>
                  </th>
                );
            })}
          </tr>
        </thead>
        <tbody>
          {!!products ? (
            products.map((row, index: number) => {
              const isLast = index === products.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-800";
              const { id, name, familyId, quantity, total } = row;
              return (
                <tr key={id}>
                  <td className={classes}>
                    <Checkbox />
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {familyId}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      $ {total}
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
            <DefaultColumn cols={6} />
          )}
        </tbody>
      </table>

      <Modal title={props.title} isOpen={props.isOpen}>
        <ProductForm setProps={setProps} />
      </Modal>
    </Card>
  );
}
