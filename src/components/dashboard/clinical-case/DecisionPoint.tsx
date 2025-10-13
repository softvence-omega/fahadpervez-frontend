// import { Question } from "../types/case";

import { Lightbulb } from "lucide-react";
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
    <div>
      <div className="bg-white border border-gray-300 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Decision Point</h2>
        <h3 className="mb-4">{question.prompt}</h3>
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
      <div className="bg-indigo-50 border border-gray-300 p-6 rounded-2xl mt-12">
        <h3 className="flex items-center gap-2 text-slate-950 text-xl font-semibold mb-3">
          <Lightbulb />
          Case Tips
        </h3>

        <div className="grid grid-cols-2 gap">
          {Array(6)
            .fill(null)
            .map(() => (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-indigo-300"></div>
                <p className="text-sm">24-year-old female with RLQ pain</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionPoint;
