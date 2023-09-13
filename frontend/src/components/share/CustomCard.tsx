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
import { useDispatch } from "react-redux";
import { selectFamily } from "../../reducer/ui";

const FORM_TYPES = {
  TIP_FORM: "TIP_FORM",
  FAMILY_FORM: "FAMILY_FORM",
} as const;

export default function CustomCard(props: any) {
  const { name, total, productsCount, tip } = props;
  const dispatch = useDispatch();
  const [customProps, setProps] = useState({
    title: "",
    isOpen: false,
  });

  const [formType, setFormType] = useState<keyof typeof FORM_TYPES | "">("");

  function detailsForm() {
    setFormType(FORM_TYPES.FAMILY_FORM);
    dispatch(selectFamily(props));
    setProps((state) => ({
      ...state,
      title: `Family details ${props?.name}`,
      disabled: false,
    }));

    openModal({ setProps });
    // alert("Almost complete!!");
  }

  function deleteForm() {
    setFormType(FORM_TYPES.TIP_FORM);
    dispatch(selectFamily(props));
    setProps((state) => ({
      ...state,
      title: "Tip details",
      disabled: false,
    }));

    openModal({ setProps });
  }

  return (
    <Card className="mt-4 w-full md:w-72 bg-gradient-to-b from-gray-800 to-gray-900  text-blue-gray-50">
      <CardBody className="py-3">
        <div className="flex justify-end">
          <IconButton
            color="red"
            className=" rounded-full h-5 w-5"
            onClick={deleteForm}
          >
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <Typography variant="h5" className="mb-2">
          {name}
        </Typography>
        <div className="flex justify-between">
          <Typography className="font-semibold">Food intake:</Typography>
          <Typography className="text-center" color="blue">
            $ {total}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="font-semibold "> Total with tip:</Typography>
          <Typography className="text-center" color="green">
            $ {(total * tip).toFixed(2)}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 text-center">
        <Badge content={productsCount}>
          <Button onClick={detailsForm}>Products</Button>
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
