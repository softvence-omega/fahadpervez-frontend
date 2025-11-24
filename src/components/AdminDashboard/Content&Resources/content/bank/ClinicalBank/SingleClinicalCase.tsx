import CommonButton from "@/common/button/CommonButton";
import { SingleClinicalCaseResponse } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/types/getClinicalCase";
import { MdEdit } from "react-icons/md";

interface ClinicalCaseData {
  data: SingleClinicalCaseResponse;
}
const SingleClinicalCase: React.FC<ClinicalCaseData> = ({ data }) => {
  const ClinicalBank = data?.data ?? [];

  // useUpdateClinicalCaseMutation,
  return (
    <div
      key={ClinicalBank._id}
      className="border border-border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-2">{ClinicalBank.caseTitle}</h2>
        <div className="flex items-center gap-2">
          <CommonButton type="button" className="!px-3 !py-2  ">
            <MdEdit />
          </CommonButton>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-1">
        <strong>Patient Presentation:</strong>
        {ClinicalBank.patientPresentation}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>History:</strong> {ClinicalBank.historyOfPresentIllness}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Examination:</strong> {ClinicalBank.physicalExamination}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Imaging:</strong> {ClinicalBank.imaging}
      </p>

      <div className="mt-2">
        <h3 className="font-semibold">Laboratory Results:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {ClinicalBank.laboratoryResults.map((lab, idx) => (
            <li key={idx}>
              {lab.name}: {lab.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold">Diagnosis Question:</h3>
        <p className="text-sm text-gray-700">
          {ClinicalBank.diagnosisQuestion.question}
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {ClinicalBank.diagnosisQuestion.diagnosisOptions.map((opt) => (
            <li key={opt.optionName}>
              {opt.optionName}: {opt.optionValue}
            </li>
          ))}
        </ul>
        <p className="text-sm text-green-600 mt-1">
          Correct: {ClinicalBank.correctOption.optionName} -{" "}
          {ClinicalBank.correctOption.explanation}
        </p>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold">Difficulty Level:</h3>
        <p className="text-sm text-gray-700">{ClinicalBank.difficultyLevel}</p>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold pb-1">MCQs:</h3>
        {ClinicalBank.mcqs.map((mcq, idx) => (
          <div
            key={idx}
            className="mb-2 border border-border p-2 rounded bg-gray-50"
          >
            <p className="text-sm font-medium">{mcq.question}</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {mcq.options.map((opt) => (
                <li key={opt.option}>
                  {opt.option}: {opt.optionText}{" "}
                  {opt.explanation && `- ${opt.explanation}`}
                </li>
              ))}
            </ul>
            <p className="text-sm text-green-600">
              Correct Option: {mcq.correctOption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleClinicalCase;
