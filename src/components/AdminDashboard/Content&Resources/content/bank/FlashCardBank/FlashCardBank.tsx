import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import McqBankCardForAdmin from "../../bank/MCQBank/McqBankCardForAdmin";
import SingleFlashCardCard from "./SingleFlashCardCard";

interface FlashCardBank {
  mcqBank: AllContentMCQList;
  bankId: string;
  setBankId: (id: string) => void;
}

const FlashCardBank: React.FC<FlashCardBank> = ({
  mcqBank,
  bankId,
  setBankId,
}) => {
  return (
    <div>
      {bankId === "" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
          {mcqBank?.data?.map((data) => (
            <McqBankCardForAdmin
              key={data._id}
              data={data}
              setMcqBankId={setBankId}
            />
          ))}
        </div>
      ) : (
        <SingleFlashCardCard bankId={bankId} />
      )}
    </div>
  );
};

export default FlashCardBank;
