import Spinner from "@/common/button/Spinner";
import TableAction from "@/components/reusable/TableAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteMcqApiMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/type/allContent";
import { useMemo, useState } from "react";
import { ContentCategory } from "./data/data";
import SearchWithTabs from "./examMode/SearchWithTabs";

const tableHeaders = [
  { label: "ID", align: "text-center hidden sm:table-cell" },
  { label: "Name", align: "text-center" },
  { label: "Difficulty", align: "text-center hidden xl:table-cell" },
  { label: "Correct Answer", align: "text-center hidden xl:table-cell" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};
export const contentTabs: ContentCategory[] = [
  "MCQ",
  "Flashcard",
  "ClinicalCase",
  "OSCE",
  "Notes",
];

interface MedicalSharedTableProps {
  data?: AllContentMCQList;
}
const MedicalSharedTable: React.FC<MedicalSharedTableProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("MCQ");
  const [difficulty, setDifficulty] = useState<
    "all" | "Basics" | "Intermediate" | "Advance"
  >("all");
  const [deleteMcqApi] = useDeleteMcqApiMutation();

  const handleDelete = async (id: string) => {
    await deleteMcqApi(id);
  };

  const tableData = data?.data ?? [];

  console.log(" tableData", tableData);

  const filteredData = useMemo(() => {
    if (difficulty === "all") return tableData;
    return tableData.filter(
      (item) => item.difficulty?.toLowerCase() === difficulty.toLowerCase()
    );
  }, [difficulty, tableData]);

  return (
    <div className="w-full flex flex-col gap-6">
      <SearchWithTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className={tableDesign.header}>
                <TableHead className={`${tableDesign.cellHeader} text-center`}>
                  <input type="checkbox" />
                </TableHead>

                {tableHeaders.map((header) => (
                  <TableHead
                    key={header.label}
                    className={`${tableDesign.cellHeader} ${header.align}`}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.mcqId} className={tableDesign.bodyRow}>
                  <TableCell className={tableDesign.cell}>
                    <input type="checkbox" />
                  </TableCell>

                  <TableCell
                    className={`${tableDesign.cell} hidden sm:table-cell`}
                  >
                    {item.mcqId}
                  </TableCell>
                  <TableCell className={tableDesign.cell}>
                    {item.question}
                  </TableCell>
                  <TableCell
                    className={`${tableDesign.cell} hidden xl:table-cell`}
                  >
                    {item.difficulty}
                  </TableCell>
                  <TableCell
                    className={`${tableDesign.cell} hidden xl:table-cell`}
                  >
                    {item.correctOption}
                  </TableCell>

                  <TableCell className={tableDesign.cell}>
                    <div className="flex justify-center">
                      <TableAction
                        handleDelete={() => handleDelete(item.mcqId)}
                        handleEdit={() => console.log("second")}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Spinner message="Please wait" />
      )}
    </div>
  );
};

export default MedicalSharedTable;
