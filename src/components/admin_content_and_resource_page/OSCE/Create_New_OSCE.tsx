import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import BasicInfo from "@/components/admin_Content & Resource_Component/OSCE/BasicInfo";
import Instructions from "@/components/admin_Content & Resource_Component/OSCE/Instructions";
import Stepper from "@/components/admin_Content & Resource_Component/OSCE/Stepper";
import ExaminerChecklist from "@/components/admin_Content & Resource_Component/OSCE/ExaminerChecklist";
import UploadStep from "@/components/admin_Content & Resource_Component/OSCE/UploadStep";
import PatientScript from "@/components/admin_Content & Resource_Component/OSCE/PatientScript";

type Step = "basic" | "instruction" | "script" | "checklist" | "upload";

interface Create_New_OSCEProps {
  onBack: () => void;
}

const Create_New_OSCE: React.FC<Create_New_OSCEProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<Step>("basic");

  // Basic Information
  const [title, setTitle] = useState("Cardiovascular Examination");
  const [specialty, setSpecialty] = useState("Cardiovascular");
  const [duration, setDuration] = useState("15 Min");
  const [description, setDescription] = useState("");

  // Instruction
  const [instructions, setInstructions] = useState([
    "You are a medical student working in the emergency department",
    "A 34-year-old woman has presented for assessment",
  ]);

  // Patient Script
  const [scripts] = useState([
    {
      headline: "Presenting complaint",
      description: 'Epigastric pain ("It\'s my tummy, it just hurts so much")',
    },
    {
      headline: "History of presenting complaint",
      description: `Abdominal pain

• Epigastric pain ("It's my tummy, it just hurts so much")
• Site: epigastric ("It hurts in the middle, right under my ribs")
• suddenly, 90 minutes ago ("It came on suddenly about one and a half hours ago")
• Character: sharp ("It's a sharp, gripping pain")
• Site: epigastric ("It hurts in the middle, right under my ribs")`,
    },
  ]);

  // Checklist
  const [checklistName] = useState("Introduction & Consent");
  const [checklistItems, setChecklistItems] = useState([
    "Introduce yourself to patient",
    "Obtain informed consent",
  ]);

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateChecklistItem = (index: number, value: string) => {
    const newItems = [...checklistItems];
    newItems[index] = value;
    setChecklistItems(newItems);
  };

  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, ""]);
  };

  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const stepOrder: Step[] = [
      "basic",
      "instruction",
      "script",
      "checklist",
      "upload",
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = [
      "basic",
      "instruction",
      "script",
      "checklist",
      "upload",
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full">
      {/* Back to Homepage Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm sm:text-base font-medium">Back</span>
      </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
          Create New OSCE Station
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8">
          Create a new OSCE Station to Help your Students.
        </p>

        {/* Stepper */}
        <div className="mb-6 sm:mb-8 hidden lg:block">
          <Stepper currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
          {currentStep === "basic" && (
            <BasicInfo
              title={title}
              specialty={specialty}
              duration={duration}
              description={description}
              onTitleChange={setTitle}
              onSpecialtyChange={setSpecialty}
              onDurationChange={setDuration}
              onDescriptionChange={setDescription}
            />
          )}

          {currentStep === "instruction" && (
            <Instructions
              instructions={instructions}
              onUpdate={updateInstruction}
              onAdd={addInstruction}
              onRemove={removeInstruction}
            />
          )}

          {currentStep === "script" && <PatientScript scripts={scripts} />}

          {currentStep === "checklist" && (
            <ExaminerChecklist
              checklistName={checklistName}
              checklistItems={checklistItems}
              onUpdate={updateChecklistItem}
              onAdd={addChecklistItem}
              onRemove={removeChecklistItem}
            />
          )}

          {currentStep === "upload" && <UploadStep />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
          <button
            onClick={handleBack}
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto rounded-md bg-gradient-to-r from-[#0076F5] to-[#0058B8] text-white px-4 py-2 sm:px-6 sm:py-2.5 font-medium hover:opacity-90 transition"
          >
            {currentStep === "upload" ? "Upload Station" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create_New_OSCE;
