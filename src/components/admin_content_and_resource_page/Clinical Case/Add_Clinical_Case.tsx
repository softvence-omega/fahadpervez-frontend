import React, { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Multiple_Choice from "@/components/admin_Content & Resource_Component/Clinical Case/Multiple_Choice";
import CustomDropdown from "@/components/admin_Content & Resource_Component/CustomDropdown";

interface AddClinicalCasePageProps {
  onBack?: () => void;
}

const AddClinicalCasePage: React.FC<AddClinicalCasePageProps> = ({
  onBack,
}) => {
  const [formData, setFormData] = useState({
    caseTitle: "",
    subject: "",
    patientAge: "",
    patientGender: "",
    difficultyLevel: "",
    casePresentation: "",
    patientHistory: "",
    imaging: "",
  });

  const [vitalSigns, setVitalSigns] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const [vitalSignsDescription, setVitalSignsDescription] = useState("");

  const [labs, setLabs] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const [labsDescription, setLabsDescription] = useState("");

  interface FormData {
    caseTitle: string;
    subject: string;
    patientAge: string;
    patientGender: string;
    difficultyLevel: string;
    casePresentation: string;
    patientHistory: string;
    imaging: string;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface VitalSign {
    id: number;
    value: string;
  }

  const handleVitalSignChange = (id: number, value: string) => {
    setVitalSigns((prev: VitalSign[]) =>
      prev.map((vs: VitalSign) => (vs.id === id ? { ...vs, value } : vs))
    );
  };

  const addVitalSign = () => {
    const newId = Math.max(...vitalSigns.map((vs) => vs.id), 0) + 1;
    setVitalSigns([...vitalSigns, { id: newId, value: "" }]);
  };

  interface RemoveVitalSignFn {
    (id: number): void;
  }

  const removeVitalSign: RemoveVitalSignFn = (id) => {
    if (vitalSigns.length > 1) {
      setVitalSigns(vitalSigns.filter((vs: VitalSign) => vs.id !== id));
    }
  };

  interface Lab {
    id: number;
    value: string;
  }

  type HandleLabChange = (id: number, value: string) => void;

  const handleLabChange: HandleLabChange = (id, value) => {
    setLabs((prev: Lab[]) =>
      prev.map((lab: Lab) => (lab.id === id ? { ...lab, value } : lab))
    );
  };

  const addLab = () => {
    const newId = Math.max(...labs.map((lab) => lab.id), 0) + 1;
    setLabs([...labs, { id: newId, value: "" }]);
  };

  interface RemoveLabFn {
    (id: number): void;
  }

  const removeLab: RemoveLabFn = (id) => {
    if (labs.length > 1) {
      setLabs(labs.filter((lab: Lab) => lab.id !== id));
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Vital Signs:", vitalSigns);
    console.log("Vital Signs Description:", vitalSignsDescription);
    console.log("Labs:", labs);
    console.log("Labs Description:", labsDescription);
    // After successful submission, you can call onBack to return to homepage
    // if (onBack) onBack();
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full">
        {/* 🔙 Back Button */}
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>
        {/* Header */}
        <div className="mb-6">
          <h1 className=" mb-1 text-black font-inter text-2xl font-semibold leading-8 tracking-[-0.009rem]">
            Add Clinical Case
          </h1>
          <p className="text-sm text-gray-600">
            Add case history, findings, labs snapshots & scenarios
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          {/* Case Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Title
            </label>
            <input
              type="text"
              name="caseTitle"
              value={formData.caseTitle}
              onChange={handleInputChange}
              placeholder="Untitled"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Cardiology"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
          </div>

          {/* Patient Details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Age
              </label>
              <input
                type="text"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleInputChange}
                placeholder="e.g., 45 years"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              />
            </div>
            <div>
              <div className="relative">
                <CustomDropdown
                  label="Patient Gender"
                  value={formData.patientGender}
                  onChange={(value) =>
                    setFormData({ ...formData, patientGender: value })
                  }
                  options={["Male", "Female", "Other"]}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <CustomDropdown
                  label="Difficulty Level"
                  value={formData.difficultyLevel}
                  onChange={(value) =>
                    setFormData({ ...formData, difficultyLevel: value })
                  }
                  options={["Beginner", "Intermediate", "Advanced"]}
                />
              </div>
            </div>
          </div>

          {/* Case Presentation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Presentation
            </label>
            <textarea
              name="casePresentation"
              value={formData.casePresentation}
              onChange={handleInputChange}
              placeholder="Created history of a patient"
              rows={3}
              className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm resize-none rounded-md border border-slate-300 bg-[rgba(239,246,255,0.6)]"
            />
          </div>

          {/* Patient History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient History
            </label>
            <textarea
              name="patientHistory"
              value={formData.patientHistory}
              onChange={handleInputChange}
              placeholder="Created history of a patient"
              rows={3}
              className="w-full px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm resize-none rounded-md border border-slate-300 bg-[rgba(239,246,255,0.6)]"
            />
          </div>

          {/* Vital Signs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Vital Signs
            </label>
            <div className="space-y-3">
              {vitalSigns.map((vs, index) => (
                <div key={vs.id} className="flex items-start gap-2">
                  <input
                    type="text"
                    value={vs.value}
                    onChange={(e) =>
                      handleVitalSignChange(vs.id, e.target.value)
                    }
                    placeholder={index === 0 ? "Temperature" : "Heart rate"}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  />

                  {index === 0 ? (
                    <button
                      onClick={addVitalSign}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors border border-blue-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeVitalSign(vs.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors border border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {/* Description Textarea - Always at the end */}
              <textarea
                value={vitalSignsDescription}
                onChange={(e) => setVitalSignsDescription(e.target.value)}
                placeholder="Description"
                className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm resize-none h-20 rounded-md border border-slate-300 bg-[rgba(239,246,255,0.6)] w-full"
              />
            </div>
          </div>

          {/* Labs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Labs
            </label>
            <div className="space-y-3">
              {labs.map((lab, index) => (
                <div key={lab.id} className="flex items-start gap-2">
                  <input
                    type="text"
                    value={lab.value}
                    onChange={(e) => handleLabChange(lab.id, e.target.value)}
                    placeholder={index === 0 ? "Hemoglobin" : "Hematocrit"}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  />

                  {index === 0 ? (
                    <button
                      onClick={addLab}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors border border-blue-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeLab(lab.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {/* Description Textarea - Always at the end */}
              <textarea
                value={labsDescription}
                onChange={(e) => setLabsDescription(e.target.value)}
                placeholder="Description"
                className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm resize-none h-20 rounded-md border border-slate-300 bg-[rgba(239,246,255,0.6)] w-full"
              />
            </div>
          </div>

          {/* Imaging */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imaging
            </label>
            <textarea
              name="imaging"
              value={formData.imaging}
              onChange={handleInputChange}
              placeholder="Created imaging of a patient"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm resize-none"
            />
          </div>

          {/* Add Multiple Choice Questions */}
          <Multiple_Choice />

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition-colors text-sm rounded-md bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)]"
            >
              Submit Case
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClinicalCasePage;
