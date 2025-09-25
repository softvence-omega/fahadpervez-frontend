// import { Question } from "../types/case";

import { Question } from "./type/case";

type Props = {
  question: Question;
  selectedOptionId: string;
};

const EvidenceReview: React.FC<Props> = ({ question, selectedOptionId }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-2xl font-semibold mb-2">
        Your Differential Diagnosis Table
      </h3>
      <p className="mb-4">
        Here's how the evidence supports or refutes each potential diagnosis:
      </p>
      <div className="space-y-4">
        {question.options.map((opt) => (
          <div
            key={opt.id}
            className={`p-4 border rounded-lg ${
              selectedOptionId === opt.id
                ? "border-blue-60 border-0 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            <div className={`flex justify-between items-center mb-2`}>
              <span className="font-medium">{opt.text}</span>
              {selectedOptionId === opt.id && (
                <span className="text-xs px-2.5 py-1.5 bg-black text-white rounded-full">
                  Your Choice
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-green-600 font-medium mb-3">
                  Supporting Evidence:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {opt.supportingEvidence.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-red-600 font-medium mt-2 mb-3">
                  Refuting Evidence:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {opt.refutingEvidence.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvidenceReview;
