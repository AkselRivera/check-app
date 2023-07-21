import { Button } from "@material-tailwind/react";
import { ModalProps } from "../modal.types";
import { closeModal } from "../../../utils/modal";

import FamilyDetailsTable from "../../tables/FamiliDetailsTable";

export const FamilyDetails = ({ setProps }: ModalProps) => {
  return (
    <div className="max-h-[70vh] ">
      <div className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto px-4 ">
        <FamilyDetailsTable />
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
      </div>
    </div>
  );
};
