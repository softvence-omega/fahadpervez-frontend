"use client";

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
import {
  useDeleteSingleMcqApiMutation,
  useUpdatedSingleMcqApiMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { OneMCQ } from "@/store/features/adminDashboard/ContentResources/MCQ/type/singleMcqBank";
import { useMemo, useState } from "react";
import { ContentCategory } from "../../medical/data/data";
import SearchWithTabs from "../../medical/examMode/SearchWithTabs";
import UpdateMcqModal, {
  BackendMCQData,
} from "../../medical/studyMode/UpdateMcqModal";

const tableHeaders = [
  { label: "ID", align: "text-center hidden sm:table-cell" },
  { label: "Question", align: "text-center" },
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
  data?: OneMCQ[];
  mcqBankId: string;
}

const MedicalSharedTable: React.FC<MedicalSharedTableProps> = ({
  data,
  mcqBankId,
}) => {
  const [difficulty, setDifficulty] = useState<
    "all" | "Basics" | "Intermediate" | "Advance"
  >("all");

  const [deleteSingleMcqApi] = useDeleteSingleMcqApiMutation();
  const [updatedSingleMcqApi, { isLoading }] = useUpdatedSingleMcqApiMutation();

  const [selectedMCQ, setSelectedMCQ] = useState<OneMCQ | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async (mcqId: string) => {
    if (mcqBankId) {
      const payload = { mcqBankId, mcqId };
      await deleteSingleMcqApi(payload);
    }
  };

  const handleEdit = (mcq: OneMCQ) => {
    setSelectedMCQ(mcq);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (updatedData: BackendMCQData) => {
    if (!selectedMCQ) return;

    const payload = {
      difficulty: updatedData.difficulty,
      question: updatedData.question,
      optionA: updatedData.optionA,
      optionB: updatedData.optionB,
      optionC: updatedData.optionC,
      optionD: updatedData.optionD,

      correctOption: updatedData.correctOption,
      explanationA: updatedData.explanationA,
      explanationB: updatedData.explanationB,
      explanationC: updatedData.explanationC,
      explanationD: updatedData.explanationD,
    };

    try {
      await updatedSingleMcqApi({
        mcqBankId,
        mcqId: selectedMCQ.mcqId,
        data: payload,
      });
      setIsUpdateModalOpen(false);
      setSelectedMCQ(null);
    } catch (error) {
      console.error("Failed to update MCQ", error);
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      return difficulty === "all" ? true : item.difficulty === difficulty;
    });
  }, [data, difficulty]);

  return (
    <>
      <div className="flex flex-col w-full ">
        <div className="w-full flex flex-col gap-6">
          <SearchWithTabs
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />

          {data ? (
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className={tableDesign.header}>
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
                        <div className="flex justify-center gap-2">
                          <TableAction
                            handleDelete={() => handleDelete(item.mcqId)}
                            handleEdit={() => handleEdit(item)}
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
      </div>

      {isUpdateModalOpen && selectedMCQ && (
        <UpdateMcqModal
          data={{
            difficulty: selectedMCQ.difficulty as
              | "Basics"
              | "Intermediate"
              | "Advance",
            question: selectedMCQ.question,
            optionA: selectedMCQ.options[0]?.optionText || "",
            optionB: selectedMCQ.options[1]?.optionText || "",
            optionC: selectedMCQ.options[2]?.optionText || "",
            optionD: selectedMCQ.options[3]?.optionText || "",
            correctOption: selectedMCQ.correctOption as "A" | "B" | "C" | "D",
            explanationA: selectedMCQ.options[0]?.explanation || "",
            explanationB: selectedMCQ.options[1]?.explanation || "",
            explanationC: selectedMCQ.options[2]?.explanation || "",
            explanationD: selectedMCQ.options[3]?.explanation || "",
          }}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default MedicalSharedTable;
