import CommonButton from "@/common/button/CommonButton";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};

interface CreateQuestionModalProps {
  setIsQuestionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateExamModal: React.FC<CreateQuestionModalProps> = ({
  setIsQuestionModalOpen,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <CommonBorderWrapper className="w-full max-w-lg relative max-h-full overflow-y-auto">
        <ModalCloseButton onClick={() => setIsQuestionModalOpen(false)} />

        <FormHeader
          title="Create New Exam"
          subtitle="Create a new exam. You can upload MCQ content to this exam and organize it using the subject hierarchy."
        />

        <div className="">
          <label className={inputClass.label}>Exam Name</label>
          <input
            type="text"
            placeholder="Anatomy"
            className={inputClass.input}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <CommonButton
            type="button"
            onClick={() => setIsQuestionModalOpen(false)}
            className=""
          >
            Cancel
          </CommonButton>
          <CommonButton type="submit" className="!bg-blue-500 text-white">
            Save
          </CommonButton>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default CreateExamModal;
