import CommonButton from "@/common/button/CommonButton";
import { useDeleteMcqApiMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { BookOpenTextIcon, CircleChevronRight, DotIcon } from "lucide-react";

export interface QuestionBankCardProps {
  _id: string;
  mcqBankTitle: string;
  subjectName: string;
  description: string;
  totalMcq: number;
  uploadedBy: string;
  onAdd: () => void;
}

const QuestionBankCard: React.FC<QuestionBankCardProps> = ({
  mcqBankTitle,
  subjectName,
  description,
  totalMcq,
  uploadedBy,
  _id,
  onAdd,
}) => {
  const handleAdd = () => {
    localStorage.setItem("selectedMcqBankId", _id);
    onAdd();
  };

  const [deleteMcqApi, { isLoading: isDeleting }] = useDeleteMcqApiMutation();

  const handleDelete = async (id: string) => {
    await deleteMcqApi(id);
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col justify-between p-4 gap-4 w-full max-w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4">
        {/* Left Content */}
        <div className="flex items-start gap-3 min-w-0 flex-1 flex-wrap">
          <CircleChevronRight className="h-6 w-6 text-gray-400 shrink-0 hidden sm:block" />
          <div className="flex items-start gap-2 min-w-0 flex-1 flex-wrap">
            <BookOpenTextIcon className="h-6 w-6 text-black shrink-0 hidden sm:block" />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h4 className="text-lg font-semibold text-gray-800">
                {mcqBankTitle}
              </h4>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex flex-wrap gap-2 mt-1 text-black font-inter text-xs font-normal leading-[1.125rem] not-italic">
                <span>{subjectName}</span>
                <span>
                  <DotIcon className="w-4 h-4" />
                </span>
                <span> {uploadedBy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 shrink-0 flex-wrap">
          <CommonButton
            disabled={isDeleting}
            onClick={() => handleDelete(_id)}
            className={`!px-3 !py-1 !text-xs rounded-full !bg-red-500 !text-white `}
          >
            Delete
          </CommonButton>
          <span className="text-sm text-gray-500 truncate">
            {totalMcq} Questions
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex w-full text-nowrap justify-end rounded-md mt-2 sm:mt-0">
        <CommonButton
          onClick={handleAdd}
          className="!text-white !px-3 !bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)]"
        >
          + Add Question
        </CommonButton>
      </div>
    </div>
  );
};

export default QuestionBankCard;
