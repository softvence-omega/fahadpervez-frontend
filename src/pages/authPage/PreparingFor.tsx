import { useState } from "react";
import { cn } from "@/lib/utils"; 
import iconImg from "@/assets/signUp/onboarding_img1.png"

type ExamOption = {
  id: string;
  title: string;
  description: string;
  icon: string; // path to icon or emoji
};

const examOptions: ExamOption[] = [
  {
    id: "usmle1",
    title: "USMLE Step 1",
    description: "Basic science foundation",
    icon: "👨‍⚕️",
  },
  {
    id: "usmle2",
    title: "USMLE Step 2",
    description: "Clinical Knowledge and skills",
    icon: "👩‍⚕️",
  },
  {
    id: "nclex",
    title: "NCLEX",
    description: "Nursing license exam",
    icon: "💉",
  },
  {
    id: "plab",
    title: "PLAB",
    description: "UK medical licensing",
    icon: "🏥",
  },
  {
    id: "yearly",
    title: "Yearly Curriculum",
    description: "School-specific coursework",
    icon: "📚",
  },
  {
    id: "general",
    title: "General Studies",
    description: "Board medical knowledge",
    icon: "🧠",
  },
];

interface StepProps {
  onNext: (selected: string[]) => void;
  onBack: () => void;
}

export default function PreparingFor({ onNext, onBack }: StepProps) {
  console.log(onNext, onBack)
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // const handleNext = () => {
  //   console.log("Selected Exams:", selected);
  //   onNext(selected); // pass to parent form
  // };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        What Are you Preparing For
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Select your primary goals so our AI can focus on what matters most
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {examOptions.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <div
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={cn(
                "flex items-center gap-3 w-full border rounded-[8px] p-6 cursor-pointer transition-all duration-200",
                isSelected
                  ? "bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)] border-primary-blue"
                  : "border-slate-300 hover:bg-[#F4F7FC] hover:shadow-[0_0_24px_0_rgba(49,116,205,0.25)] hover:border-primary-blue"
              )}
            >
              {/* Image/Icon */}
              {/* <img src={option.img} alt={option.title} className="w-14 h-14" /> */}
              <img src={iconImg} alt={option.title} className="w-14 h-14" />

              {/* Text Section */}
              <div className="text-start">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div> */}
    </div>
  );
}
