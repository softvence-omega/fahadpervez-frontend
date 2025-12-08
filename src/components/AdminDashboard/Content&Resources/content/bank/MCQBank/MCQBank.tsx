import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import McqBankCardForAdmin from "../../bank/MCQBank/McqBankCardForAdmin";
import MedicalSharedTable from "../../bank/MCQBank/MedicalSharedTable";

interface MCQBankProps {
  mcqBank: AllContentMCQList;
  bankId: string;
  setBankId: (id: string) => void;
}

const MCQBank: React.FC<MCQBankProps> = ({ mcqBank, bankId, setBankId }) => {
  return (
    <div>
      {bankId === "" ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
            {mcqBank?.data?.map((data) => (
              <McqBankCardForAdmin
                key={data._id}
                data={data}
                setMcqBankId={setBankId}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <MedicalSharedTable mcqBankId={bankId} />
        </div>
      )}
    </div>
  );
};

export default MCQBank;
