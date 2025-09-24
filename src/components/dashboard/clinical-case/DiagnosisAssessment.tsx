// import { Question } from "../types/case";

import { Question } from "./type/case";

type Props = {
  question: Question;
  selectedOptionId: string;
};

const DiagnosisAssessment: React.FC<Props> = ({
  question,
  selectedOptionId,
}) => {
  const isCorrect = selectedOptionId === question.correctOptionId;
  const selectedOption = question.options.find(
    (opt) => opt.id === selectedOptionId
  );
  const correctOption = question.options.find(
    (opt) => opt.id === question.correctOptionId
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Diagnosis Assessment</h3>
      <div className="mb-4">
        <p>
          <span className="font-medium">Your Diagnosis: </span>
          {selectedOption?.text}
        </p>
        <p>
          <span className="font-medium">Correct Diagnosis: </span>
          {correctOption?.text}
        </p>
        <p
          className={`mt-2 font-semibold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "Correct!" : "Incorrect"}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Detailed Explanation</h4>
        <p className="text-sm text-gray-700">{question.explanation}</p>
      </div>
    </div>
  );
};

export default DiagnosisAssessment;
