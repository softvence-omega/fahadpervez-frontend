import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { showAddContent } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppDispatch } from "@/store/hook";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import ActionButtons from "../../ActionButtons";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};
const AddMCQForm = () => {
  const [difficultyLabel, setDifficultyLabel] = useState("beginner");
  const [question, setQuestion] = useState("");
  const dispatch = useAppDispatch<AppDispatch>();

  const [answerOptions, setAnswerOptions] = useState([
    { label: "A", text: "", reasoning: "", correct: false },
    { label: "B", text: "", reasoning: "", correct: false },
    { label: "C", text: "", reasoning: "", correct: false },
    { label: "D", text: "", reasoning: "", correct: false },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState("A");

  const correctAnswerOptions = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
    { label: "Option D", value: "D" },
  ] as const;

  const difficultyOptions = [
    { label: "Basics", value: "basics" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advance", value: "Advance" },
  ] as const;

  // const handleSaveAndAddAnother = () => {
  //   handleSave();
  //   setQuestion("");
  //   setAnswerOptions([
  //     { label: "A", text: "", reasoning: "", correct: false },
  //     { label: "B", text: "", reasoning: "", correct: false },
  //     { label: "C", text: "", reasoning: "", correct: false },
  //     { label: "D", text: "", reasoning: "", correct: false },
  //   ]);
  //   setExplanation("");
  // };

  function setDifficulty(value: string): void {
    setDifficultyLabel(value);
  }
  return (
    <>
      <CommonBorderWrapper>
        <div className=" space-y-6">
          <div>
            <label className={inputClass.label}>Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className={inputClass.input}
              placeholder="Question Text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 ">
              Answer Options
            </label>
            <div className="space-y-3">
              {answerOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start rounded-md border border-[#CBD5E1] bg-[#EFF6FF]/60 p-4"
                >
                  <div className="flex items-center gap-2 pt-2">
                    <span className={inputClass.label}>{option.label}</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Enter option ${option.label}`}
                      value={option.text}
                      onChange={(e) => {
                        const updated = [...answerOptions];
                        updated[index].text = e.target.value;
                        setAnswerOptions(updated);
                      }}
                      className={inputClass.input}
                    />
                    <textarea
                      placeholder="Explanation (optional)"
                      rows={2}
                      value={option.reasoning}
                      onChange={(e) => {
                        const updated = [...answerOptions];
                        updated[index].reasoning = e.target.value;
                        setAnswerOptions(updated);
                      }}
                      className={`${inputClass.input} resize-none mt-2`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={inputClass.label}>Correct Answer</label>

            <CommonSelect
              className="!bg-white border-[#CBD5E1]"
              value={correctAnswer}
              item={correctAnswerOptions}
              onValueChange={setCorrectAnswer}
            />
          </div>
          <div>
            <label className={inputClass.label}>Difficulty Label</label>

            <CommonSelect
              className="!bg-white border-[#CBD5E1]"
              value={difficultyLabel}
              item={difficultyOptions}
              onValueChange={setDifficulty}
            />
          </div>
        </div>
      </CommonBorderWrapper>
      <ActionButtons onCancel={() => dispatch(showAddContent())} />
    </>
  );
};

export default AddMCQForm;
