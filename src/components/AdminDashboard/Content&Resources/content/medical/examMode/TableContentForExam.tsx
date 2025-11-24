import preview from "@/assets/dashboard/tablePreview.svg";
import CommonHeader from "@/common/header/CommonHeader";
import TableAction from "@/components/reusable/TableAction";
import {
  useDeleteExamMutation,
  useGetExamQuery,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { Exam } from "@/store/features/adminDashboard/ContentResources/MCQ/types/tree";
import { Plus } from "lucide-react";

interface TableContentProps {
  iconAction: () => void;
  setInitialData: React.Dispatch<React.SetStateAction<null | Exam>>;
}
const TableContentForExam: React.FC<TableContentProps> = ({
  iconAction,
  setInitialData,
}) => {
  const { data: allExamData } = useGetExamQuery();
  const [deleteExam] = useDeleteExamMutation();
  const allExam = allExamData?.data ?? [];

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteExam(id);
    }
  };
  const handleEdit = async (data: Exam) => {
    iconAction();
    setInitialData(data);
  };
  const handleClick = () => {
    iconAction();
    setInitialData(null);
  };
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
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {allExam.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <CommonHeader className="text-[#0A0A0A] !font-arial !text-sm">
              {item.examName}
            </CommonHeader>

            <TableAction
              handleDelete={() => {
                handleDelete(item._id);
              }}
              handleEdit={() => {
                handleEdit(item);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableContentForExam;
