import CommonButton from "@/common/button/CommonButton";
import { useUpdateClinicalCaseMutation } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/clinicalCaseApi";
import {
  ClinicalCase,
  DiagnosisOption,
  LaboratoryResult,
  MCQ,
  SingleClinicalCaseResponse,
} from "@/store/features/adminDashboard/ContentResources/ClinicalCase/types/getClinicalCase";
import React, { useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

export const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

interface ClinicalCaseData {
  data: SingleClinicalCaseResponse;
}

const SingleClinicalCase: React.FC<ClinicalCaseData> = ({ data }) => {
  const ClinicalBank = data?.data;
  const [updateClinicalCase, { isLoading: isUpdating }] =
    useUpdateClinicalCaseMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ClinicalCase>({ ...ClinicalBank });

  // General input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Laboratory Results
  const handleLabChange = (
    index: number,
    field: keyof LaboratoryResult,
    value: string
  ) => {
    const labs = [...formData.laboratoryResults];
    labs[index][field] = value;
    setFormData({ ...formData, laboratoryResults: labs });
  };
  const addLab = () =>
    setFormData({
      ...formData,
      laboratoryResults: [
        ...formData.laboratoryResults,
        { name: "", value: "" },
      ],
    });
  const removeLab = (index: number) => {
    const labs = formData.laboratoryResults.filter((_, i) => i !== index);
    setFormData({ ...formData, laboratoryResults: labs });
  };

  // Diagnosis Options
  const handleDiagnosisOptionChange = (
    index: number,
    field: keyof DiagnosisOption,
    value: string
  ) => {
    const options = [...formData.diagnosisQuestion.diagnosisOptions];
    if (field === "supportingEvidence" || field === "refutingEvidence") {
      options[index][field] = value.split(",").map((v) => v.trim());
    } else {
      options[index][field] = value;
    }
    setFormData({
      ...formData,
      diagnosisQuestion: {
        ...formData.diagnosisQuestion,
        diagnosisOptions: options,
      },
    });
  };

  const addDiagnosisOption = () => {
    setFormData({
      ...formData,
      diagnosisQuestion: {
        ...formData.diagnosisQuestion,
        diagnosisOptions: [
          ...formData.diagnosisQuestion.diagnosisOptions,
          {
            optionName: "",
            optionValue: "",
            supportingEvidence: [],
            refutingEvidence: [],
          },
        ],
      },
    });
  };

  const removeDiagnosisOption = (index: number) => {
    const options = formData.diagnosisQuestion.diagnosisOptions.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      diagnosisQuestion: {
        ...formData.diagnosisQuestion,
        diagnosisOptions: options,
      },
    });
  };

  // MCQs
  const handleMcqChange = (mcqIndex: number, field: keyof MCQ, value: any) => {
    const mcqs = [...formData.mcqs];
    mcqs[mcqIndex][field] = value;
    setFormData({ ...formData, mcqs });
  };
  const handleMcqOptionChange = (
    mcqIndex: number,
    optionIndex: number,
    field: keyof MCQ["options"][0],
    value: string
  ) => {
    const mcqs = [...formData.mcqs];
    mcqs[mcqIndex].options[optionIndex][field] = value;
    setFormData({ ...formData, mcqs });
  };
  const addMcq = () =>
    setFormData({
      ...formData,
      mcqs: [
        ...formData.mcqs,
        {
          question: "",
          options: [{ option: "", optionText: "", explanation: "" }],
          correctOption: "",
        },
      ],
    });
  const removeMcq = (index: number) => {
    const mcqs = formData.mcqs.filter((_, i) => i !== index);
    setFormData({ ...formData, mcqs });
  };
  const addMcqOption = (mcqIndex: number) => {
    const mcqs = [...formData.mcqs];
    mcqs[mcqIndex].options.push({
      option: "",
      optionText: "",
      explanation: "",
    });
    setFormData({ ...formData, mcqs });
  };
  const removeMcqOption = (mcqIndex: number, optionIndex: number) => {
    const mcqs = [...formData.mcqs];
    mcqs[mcqIndex].options = mcqs[mcqIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    setFormData({ ...formData, mcqs });
  };

  const handleUpdate = async () => {
    const { _id, ...rest } = formData;
    await updateClinicalCase({ id: ClinicalBank._id, data: rest });
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Card */}
      <div
        key={ClinicalBank._id}
        className="border border-border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-shadow duration-200"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">{ClinicalBank.caseTitle}</h2>
          <CommonButton
            type="button"
            className="!px-3 !py-2"
            onClick={() => setIsModalOpen(true)}
          >
            <MdEdit />
          </CommonButton>
        </div>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Patient Presentation:</strong>{" "}
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-auto bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Edit Clinical Case</h2>
            <div className="flex flex-col gap-3">
              {/* Case Title */}
              <label className="flex flex-col text-sm">
                Case Title
                <input
                  name="caseTitle"
                  value={formData.caseTitle}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </label>

              {/* Patient Presentation */}
              <label className="flex flex-col text-sm">
                Patient Presentation
                <textarea
                  name="patientPresentation"
                  value={formData.patientPresentation}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </label>

              {/* History */}
              <label className="flex flex-col text-sm">
                History
                <textarea
                  name="historyOfPresentIllness"
                  value={formData.historyOfPresentIllness}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </label>

              {/* Physical Examination */}
              <label className="flex flex-col text-sm">
                Physical Examination
                <textarea
                  name="physicalExamination"
                  value={formData.physicalExamination}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </label>

              {/* Imaging */}
              <label className="flex flex-col text-sm">
                Imaging
                <textarea
                  name="imaging"
                  value={formData.imaging}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </label>

              {/* Difficulty Level */}
              <label className="flex flex-col text-sm">
                Difficulty Level
                <input
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </label>

              {/* Laboratory Results */}
              <div className="mt-2">
                <h3 className="font-semibold">Laboratory Results</h3>
                {formData.laboratoryResults.map((lab, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-1">
                    <input
                      value={lab.name}
                      placeholder="Name"
                      onChange={(e) =>
                        handleLabChange(idx, "name", e.target.value)
                      }
                      className={`${inputClass.input} !w-1/2`}
                    />
                    <input
                      value={lab.value}
                      placeholder="Value"
                      onChange={(e) =>
                        handleLabChange(idx, "value", e.target.value)
                      }
                      className={`${inputClass.input} !w-1/2`}
                    />
                    <MdDelete
                      className="cursor-pointer text-red-500"
                      onClick={() => removeLab(idx)}
                    />
                  </div>
                ))}
                <CommonButton type="button" className="mt-2" onClick={addLab}>
                  <MdAdd className="inline mr-1" /> Add Lab
                </CommonButton>
              </div>

              {/* Diagnosis Question */}
              <div className="mt-2">
                <h3 className="font-semibold">Diagnosis Question</h3>
                <textarea
                  value={formData.diagnosisQuestion.question}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      diagnosisQuestion: {
                        ...formData.diagnosisQuestion,
                        question: e.target.value,
                      },
                    })
                  }
                  className="border p-2 rounded w-full"
                  placeholder="Question"
                />
                {formData.diagnosisQuestion.diagnosisOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-1">
                    <input
                      value={opt.optionName}
                      placeholder="Option Name"
                      onChange={(e) =>
                        handleDiagnosisOptionChange(
                          idx,
                          "optionName",
                          e.target.value
                        )
                      }
                      className={`${inputClass.input} !w-1/4`}
                    />
                    <input
                      value={opt.optionValue}
                      placeholder="Option Value"
                      onChange={(e) =>
                        handleDiagnosisOptionChange(
                          idx,
                          "optionValue",
                          e.target.value
                        )
                      }
                      className={`${inputClass.input} !w-3/4`}
                    />
                    <MdDelete
                      className="cursor-pointer text-red-500"
                      onClick={() => removeDiagnosisOption(idx)}
                    />
                  </div>
                ))}
                <CommonButton
                  type="button"
                  className="mt-2"
                  onClick={addDiagnosisOption}
                >
                  <MdAdd className="inline mr-1" /> Add Option
                </CommonButton>

                {/* Correct Option */}
                <label className="flex flex-col mt-2 text-sm">
                  Correct Option Name
                  <input
                    value={formData.correctOption.optionName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        correctOption: {
                          ...formData.correctOption,
                          optionName: e.target.value,
                        },
                      })
                    }
                    className={inputClass.input}
                  />
                </label>
                <label className="flex flex-col mt-1 text-sm">
                  Explanation
                  <textarea
                    value={formData.correctOption.explanation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        correctOption: {
                          ...formData.correctOption,
                          explanation: e.target.value,
                        },
                      })
                    }
                    className={inputClass.input}
                  />
                </label>
              </div>

              {/* MCQs */}
              <div className="mt-2">
                <h3 className="font-semibold">MCQs</h3>
                {formData.mcqs.map((mcq, mcqIdx) => (
                  <div
                    key={mcqIdx}
                    className="border p-2 rounded mt-2 bg-gray-50"
                  >
                    <textarea
                      value={mcq.question}
                      placeholder="Question"
                      onChange={(e) =>
                        handleMcqChange(mcqIdx, "question", e.target.value)
                      }
                      className={inputClass.input}
                    />
                    {mcq.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className="flex items-center gap-2 mt-1"
                      >
                        <input
                          value={opt.option}
                          placeholder="Option Name"
                          onChange={(e) =>
                            handleMcqOptionChange(
                              mcqIdx,
                              optIdx,
                              "option",
                              e.target.value
                            )
                          }
                          className={`${inputClass.input} !w-1/6`}
                        />
                        <input
                          value={opt.optionText}
                          placeholder="Option Text"
                          onChange={(e) =>
                            handleMcqOptionChange(
                              mcqIdx,
                              optIdx,
                              "optionText",
                              e.target.value
                            )
                          }
                          className={`${inputClass.input} !w-4/6`}
                        />
                        <input
                          value={opt.explanation}
                          placeholder="Explanation"
                          onChange={(e) =>
                            handleMcqOptionChange(
                              mcqIdx,
                              optIdx,
                              "explanation",
                              e.target.value
                            )
                          }
                          className={`${inputClass.input} !w-1/6`}
                        />
                        <MdDelete
                          className="cursor-pointer text-red-500"
                          onClick={() => removeMcqOption(mcqIdx, optIdx)}
                        />
                      </div>
                    ))}
                    <CommonButton
                      type="button"
                      className="mt-1"
                      onClick={() => addMcqOption(mcqIdx)}
                    >
                      <MdAdd className="inline mr-1" /> Add Option
                    </CommonButton>
                    <input
                      placeholder="Correct Option"
                      value={mcq.correctOption}
                      onChange={(e) =>
                        handleMcqChange(mcqIdx, "correctOption", e.target.value)
                      }
                      className={inputClass.input}
                    />
                    <CommonButton
                      type="button"
                      className="mt-2"
                      onClick={() => removeMcq(mcqIdx)}
                    >
                      <MdDelete className="inline mr-1" /> Remove MCQ
                    </CommonButton>
                  </div>
                ))}
                <CommonButton type="button" className="mt-2" onClick={addMcq}>
                  <MdAdd className="inline mr-1" /> Add MCQ
                </CommonButton>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <CommonButton
                type="button"
                className="!px-4 !py-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </CommonButton>
              <CommonButton
                type="button"
                className="!px-4 !py-2 !bg-blue-500 !text-white"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </CommonButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleClinicalCase;
