// import { Question } from "../types/case";

import { Question } from "./type/case";

type Props = {
  question: Question;
  selectedOptionId: string | null;
  setSelectedOptionId: (id: string) => void;
};

const DecisionPoint: React.FC<Props> = ({
  question,
  selectedOptionId,
  setSelectedOptionId,
}) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">{question.prompt}</h3>
      <div className="space-y-3">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className={`block p-4 border rounded-lg cursor-pointer ${
              selectedOptionId === opt.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="option"
              value={opt.id}
              checked={selectedOptionId === opt.id}
              onChange={() => setSelectedOptionId(opt.id)}
              className="mr-3"
            />
            {opt.text}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DecisionPoint;
