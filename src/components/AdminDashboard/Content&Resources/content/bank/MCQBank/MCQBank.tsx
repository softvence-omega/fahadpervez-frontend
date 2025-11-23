import { useGetSingleMcqQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import McqBankCardForAdmin from "../../bank/MCQBank/McqBankCardForAdmin";
import MedicalSharedTable from "../../bank/MCQBank/MedicalSharedTable";

interface MCQBankProps {
  mcqBank: AllContentMCQList;
  bankId: string;
  setBankId: (id: string) => void;
}

const MCQBank: React.FC<MCQBankProps> = ({ mcqBank, bankId, setBankId }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log("first", setCurrentPage);
  const limit = 10;

  const singleMcqQueryArg = bankId
    ? { id: bankId, page: currentPage, limit }
    : skipToken;
  const { data: singleMcqBank } = useGetSingleMcqQuery(singleMcqQueryArg, {
    skip: bankId === "",
  });

  const singleMcqBankData = singleMcqBank?.data.mcqs ?? [];
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
          <MedicalSharedTable data={singleMcqBankData} mcqBankId={bankId} />
        </div>
      )}
    </div>
  );
};

export default MCQBank;
