import CommonDropdown from "@/common/custom/CommonDropdown";
import { MoreVertical } from "lucide-react";

const TableAction = () => {
  return (
    <div>
      <CommonDropdown
        items={[{ label: "Edit" }, { label: "Delete" }]}
        trigger={
          <span className="text-[#000000] cursor-pointer text-xl">
            <MoreVertical />
          </span>
        }
      />
    </div>
  );
};

export default TableAction;
