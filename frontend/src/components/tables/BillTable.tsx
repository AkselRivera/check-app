import { ProductForm } from "../modal/form/ProductForm";
import { Button, Card, Checkbox, Typography } from "@material-tailwind/react";
import { openModal } from "../../utils/modal";
import { useState } from "react";

import Modal from "../share/Modal";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products/getProducts";
import { DefaultColumn } from "../share/table/DefaultColumn";
import { App_QueryCache } from "../../constants/QueryCache";

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

export default function BillTable() {
  const [props, setProps] = useState({
    title: "",
    isOpen: false,
  });

  const { data } = useQuery({
    queryKey: [App_QueryCache.PRODUCT],
    queryFn: getProducts,
  });

  function addForm() {
    openModal({ setProps });
    setProps((state) => ({
      ...state,
      title: "Add order",
      isOpen: true,
      disabled: false,
    }));
  }

  function editForm(item: any) {
    //TODO: Hacer el tipo que recibe este metodo

    setProps((state) => ({
      ...state,
      title: "Edit order",
      isOpen: true,
      disabled: false,
    }));

    console.log(item);
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
                      variant="outlined"
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
          {!!data?.data ? (
            data?.data.map((row: any, index: number) => {
              const isLast = index === data?.data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-800";
              const { check, name, family_id, quantity, total } = row;
              return (
                <tr key={name}>
                  <td className={classes}>
                    <Checkbox defaultChecked={check} />
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {family_id}
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
                  <td className={classes}>
                    <Button onClick={() => editForm(row)} variant="text">
                      Edit
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
