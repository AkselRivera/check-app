import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Badge,
  IconButton,
} from "@material-tailwind/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { openModal } from "../../utils/modal";
import { FamilyDetails } from "../modal/details/FamilyDetails";
import { FamilyDelete } from "../modal/delete/FamilyDelete";

const FORM_TYPES = {
  TIP_FORM: "TIP_FORM",
  FAMILY_FORM: "FAMILY_FORM",
} as const;

export default function CustomCard(props: any) {
  const { name, total, products_count } = props;
  const [customProps, setProps] = useState({
    title: "",
    isOpen: false,
  });

  const [formType, setFormType] = useState<keyof typeof FORM_TYPES | "">("");

  function addForm() {
    setProps((state) => ({
      ...state,
      title: "Add a new Family",
      isOpen: true,
      disabled: false,
    }));
    openModal({ setProps });
    setFormType(FORM_TYPES.FAMILY_FORM);
  }

  function tipForm() {
    setProps((state) => ({
      ...state,
      title: "Tip details",
      isOpen: true,
      disabled: false,
    }));
    openModal({ setProps });
    setFormType(FORM_TYPES.TIP_FORM);
  }

  return (
    <Card className="mt-4 w-full md:w-72 bg-gradient-to-b from-gray-800 to-gray-900  text-blue-gray-50">
      <CardBody className="py-3">
        <div className="flex justify-end">
          <IconButton
            color="red"
            className=" rounded-full h-5 w-5"
            onClick={tipForm}
          >
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <Typography variant="h5" className="mb-2">
          {name}
        </Typography>
        <Typography className="font-semibold">Food intake:</Typography>
        <Typography className="text-center" color="blue">
          $ {total}
        </Typography>
        <Typography className="font-semibold "> Total with tip:</Typography>
        <Typography className="text-center" color="green">
          $ {(total * 1.1).toFixed(2)}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 text-center">
        <Badge content={products_count}>
          <Button onClick={addForm}>Products</Button>
        </Badge>
      </CardFooter>
      <Modal title={customProps.title} isOpen={customProps.isOpen}>
        {formType === FORM_TYPES.TIP_FORM ? (
          <FamilyDelete setProps={setProps} />
        ) : (
          <FamilyDetails setProps={setProps} />
        )}
      </Modal>
    </Card>
  );
}
