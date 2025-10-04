import { Check } from "lucide-react";

type Step = "basic" | "instruction" | "script" | "checklist" | "upload";

// Stepper Component
interface StepperProps {
  currentStep: Step;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { id: "basic", label: "Basic Information" },
    { id: "instruction", label: "Instruction" },
    { id: "script", label: "Patient Script" },
    { id: "checklist", label: "Examiner Checklist" },
    { id: "upload", label: "Upload" },
  ];

  const stepOrder: Step[] = [
    "basic",
    "instruction",
    "script",
    "checklist",
    "upload",
  ];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-300"></div>

        {steps.map((step) => {
          const stepIndex = stepOrder.indexOf(step.id as Step);
          const isActive = stepIndex === currentIndex;
          const isCompleted = stepIndex < currentIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative bg-gray-50 z-10"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isActive || isCompleted ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  isActive && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )
                )}
              </div>

              <span
                className={`text-xs mt-2 whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-gray-900 font-medium" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
