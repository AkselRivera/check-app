import { useQuery } from "@tanstack/react-query";
import gopherBill from "../assets/gopher-notes.svg";
import BillTable from "../components/tables/BillTable";
import { App_QueryCache } from "../constants/QueryCache";
import { getProducts } from "../api/products/getProducts";

import { IconButton, Spinner } from "@material-tailwind/react";

export const Bill = () => {
  const {
    data: productData,
    refetch: refetchProduct,
    isFetching,
  } = useQuery({
    queryKey: [App_QueryCache.PRODUCT],
    queryFn: getProducts,
    retry: false,
  });

  return (
    <div className="h-[100%] flex flex-col w-full md:w-1/2 border-red-500 shadow-xl md:shadow-none  ease-in-out duration-300 p-4">
      <div className="flex w-full items-center">
        <div className="w-3/4 flex items-center justify-center gap-2">
          <span className="text-center text-lg font-semibold">YOUR CHECK </span>
          {isFetching ? (
            <Spinner color="blue" className="h-[1.2rem]" />
          ) : (
            <IconButton
              size="sm"
              variant="text"
              className="my-auto"
              onClick={() => refetchProduct()}
            >
              <i className="fa-solid fa-arrows-rotate fa-lg" />
            </IconButton>
          )}
        </div>
        <img src={gopherBill} className="logo w-1/4 p-2 " alt="Gopher Bill" />
      </div>
      <BillTable products={productData} />
    </div>
  );
};
