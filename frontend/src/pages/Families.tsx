import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { FamilyForm } from "../components/modal/form/FamilyForm";
import { openModal } from "../utils/modal";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TipForm } from "../components/modal/form/TipForm";
import { useState } from "react";

import CustomCard from "../components/share/CustomCard";
import gopherData from "../assets/gopher-data.svg";
import Modal from "../components/share/Modal";
import { getFamilies } from "../api/family/getFamily";

import { useQuery } from "@tanstack/react-query";
import { App_QueryCache } from "../constants/QueryCache";

const FORM_TYPES = {
  TIP_FORM: "TIP_FORM",
  FAMILY_FORM: "FAMILY_FORM",
} as const;

export const Families = () => {
  const [props, setProps] = useState({
    title: "",
    isOpen: false,
  });

  const { data } = useQuery({
    queryKey: [App_QueryCache.FAMILY],
    queryFn: getFamilies,
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
    // setElemnt(TipForm )
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
    <div className="h-[100%] flex flex-col w-full md:w-1/2  shadow-xl md:shadow-none  ease-in-out duration-300 p-4">
      <div className="flex w-full items-center">
        <div className="w-3/4 text-center">
          <div className="flex justify-center items-center gap-x-2 ">
            <Typography className="text-lg font-semibold">FAMILIES</Typography>
            <Tooltip content="Add a new family">
              <IconButton className="rounded-full h-5 w-5" onClick={addForm}>
                <PlusIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
          <Typography className="text-xs">
            Currently you have selected 10% tip
          </Typography>
          <Button
            variant="text"
            className="text-xs p-0 capitalize"
            onClick={tipForm}
          >
            Change tip percentage
          </Button>
        </div>
        <img src={gopherData} className="logo w-1/4 p-2 " alt="Gopher Bill" />
      </div>

      <div className="flex flex-wrap gap-2 justify-center overflow-auto  px-2 ">
        {data?.data?.map((item: any) => (
          <CustomCard
            key={item.id}
            id={item.id}
            name={item.name}
            total={item.total}
            products_count={item.products_count}
          />
        ))}
      </div>
      <Modal title={props.title} isOpen={props.isOpen}>
        {formType === FORM_TYPES.TIP_FORM ? (
          <TipForm setProps={setProps} />
        ) : (
          <FamilyForm setProps={setProps} />
        )}
      </Modal>
    </div>
  );
};
