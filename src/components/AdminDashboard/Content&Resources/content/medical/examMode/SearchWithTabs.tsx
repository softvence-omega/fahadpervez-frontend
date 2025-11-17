import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
export const difficultyOptions = [
  { label: "All", value: "all" },
  { label: "Basics", value: "Basics" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advance", value: "Advance" },
] as const;

type Difficulty = (typeof difficultyOptions)[number]["value"];

interface SearchWithTabsProps {
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
}
const SearchWithTabs: React.FC<SearchWithTabsProps> = ({
  difficulty,
  setDifficulty,
}) => {
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
            item={difficultyOptions}
            value={difficulty}
            onValueChange={(val) => setDifficulty(val as Difficulty)}
            className="!w-[150px]"
          />
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default SearchWithTabs;
