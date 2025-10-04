import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import DashboardSearch from "../../reuseable/DashboardSearch";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import CommonDropdown from "@/common/custom/CommonDropdown";
import { IoChevronDownSharp } from "react-icons/io5";

const dropdownItems = [
  { label: "Edit" },
  { label: "Delete" },
  { label: "Share" },
];
const TransactionSearch = () => {
  return (
    <div className="flex items-center justify-between">
      <DashboardSearch className=" !rounded-none my-5" />

      <div className="flex gap-2">
        <CommonDropdown
          items={dropdownItems}
          trigger={
            <ButtonWithIcon
              className=" bg-[#fff] !text-[#09090B] flex !flex-row-reverse"
              icon={IoChevronDownSharp}
            >
              Filter by Month
            </ButtonWithIcon>
          }
        />
        <ButtonWithIcon icon={MdOutlineFileDownload}>Export</ButtonWithIcon>
      </div>
    </div>
  );
};

export default TransactionSearch;
