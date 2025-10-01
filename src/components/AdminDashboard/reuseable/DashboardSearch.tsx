import { IoSearchSharp } from "react-icons/io5";

const DashboardSearch = () => {
  return (
    <div>
      <div className="hidden sm:block w-full lg:w-[451px] ">
        <div className="flex items-center w-full gap-1 border border-border rounded-full bg-white px-3 ">
          <span className="text-xl  flex items-center justify-center text-[#8E8E93]  rounded-full transition-colors duration-200">
            <IoSearchSharp />
          </span>
          <input
            type="text"
            placeholder="Type here..."
            className="flex-grow outline-none bg-transparent text-[#AEAEB2] placeholder-slate-400  py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSearch;
