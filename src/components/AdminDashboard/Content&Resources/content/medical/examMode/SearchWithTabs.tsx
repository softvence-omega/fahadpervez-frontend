import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
] as const;
export const tabs = [
  { label: "MCQ", value: "MCQ" },
  { label: "Flashcard", value: "Flashcard" },
  { label: "Clinical Case", value: "ClinicalCase" },
  { label: "OSCE", value: "OSCE" },
  { label: "Notes", value: "Notes" },
];

interface SearchWithTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const SearchWithTabs: React.FC<SearchWithTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [status, setStatus] = useState("");

  return (
    <div>
      <CommonBorderWrapper className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 flex-1 bg-[#EFF6FF] border border-[#fff] rounded-md p-3">
            <IoSearchOutline className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID, name, or subject..."
              className="w-full outline-none"
            />
          </div>
          <CommonSelect
            item={statusOptions}
            value={status}
            onValueChange={setStatus}
            className="!w-[150px]"
          />
        </div>
        <div className="flex items-center justify-between  gap-4">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          <div className="flex items-center gap-4.5">
            <ButtonWithIcon
              icon={RiDeleteBinLine}
              className="w-full md:w-auto flex justify-center  flex-shrink-0  !bg-white !border !border-[#E2E8F0] !text-[#B91C1C]"
            >
              Delete all
            </ButtonWithIcon>
            <CommonButton className="!bg-[#334155] !text-white">
              Publish
            </CommonButton>
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default SearchWithTabs;
