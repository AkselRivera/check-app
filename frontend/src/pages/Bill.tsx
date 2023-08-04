import gopherBill from "../assets/gopher-notes.svg";
import BillTable from "../components/tables/BillTable";

export const Bill = () => {
  return (
    <div className="h-[100%] flex flex-col w-full md:w-1/2 border-red-500 shadow-xl md:shadow-none  ease-in-out duration-300 p-4">
      <div className="flex w-full items-center">
        <span className="w-3/4 text-center text-lg font-semibold">
          YOUR CHECK
        </span>
        <img src={gopherBill} className="logo w-1/4 p-2 " alt="Gopher Bill" />
      </div>
      <BillTable />
    </div>
  );
};
