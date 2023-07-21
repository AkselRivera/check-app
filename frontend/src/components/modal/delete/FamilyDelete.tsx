import { Button } from "@material-tailwind/react";
import { ModalProps } from "../modal.types";
import { closeModal } from "../../../utils/modal";

import "lord-icon-element";

export const FamilyDelete = ({ setProps }: ModalProps) => {
  return (
    <div className="max-h-[70vh] ">
      <div className="mb-4 flex flex-wrap py-4 -mx-2 w-full justify-center overflow-auto px-4 ">
        <div className="hidden  md:inline md:w-1/2 border h-96">
          {/* <Lord-icon
    src="https://cdn.lordicon.com/eeisfrmc.json"
    trigger="hover"
    colors="primary:#ebe6ef,secondary:#b26836"
    style="width:250px;height:250px">
</Lord-icon> */}
        </div>
        <div className="w-full md:w-1/2 flex flex-col border h-96 text-center  group">
          <span className="m-2 text-center text-lg font-semibold">
            Are you sure you want to delete [FAMILY_NAME] ?
          </span>
          <span className="m-2 text-center text-sm font-semibold group-hover:text-red-600 ease-in-out duration-300 ">
            CAUTION: This action is irreversible
          </span>
        </div>
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
