import preview from "@/assets/dashboard/tablePreview.svg";
import CommonHeader from "@/common/header/CommonHeader";
import { MoreVertical, Plus } from "lucide-react";

interface TableContentProps {
  iconAction: () => void;
}
const TableContentForExam: React.FC<TableContentProps> = ({ iconAction }) => {
  return (
    <div className="w-79 bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={preview} className="w-5 h-5" alt="alt" />
          <CommonHeader className="text-[#0A0A0A] !font-arial">
            Table of Contents
          </CommonHeader>
        </div>
        <button
          onClick={iconAction}
          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center justify-between px-2">
        <CommonHeader className="text-[#0A0A0A] !font-arial !text-sm">
          ESMLE Part 1
        </CommonHeader>
        <div className="flex items-center">
          <div className="bg-[#ECEEF2] border border-white text-xs text-[#030213] h-6 w-6 flex items-center justify-center rounded-md">
            7
          </div>
          <span>
            <MoreVertical className="w-5 h-5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableContentForExam;
