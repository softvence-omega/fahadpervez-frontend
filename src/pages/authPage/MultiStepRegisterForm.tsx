import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CommonWrapper from "@/common/CommonWrapper";
import AboutYourSelfTab from "./AboutYourSelfTab";
import Preferences from "./Preferences";
import UploadProfile from "./UploadProfile";
import PreparingFor from "./PreparingFor";
// import Preferences from "./Preferences";

const steps = [
  { id: 1, title: "Profile setup", content: <AboutYourSelfTab /> },
  {
    id: 2,
    title: "What Are you Preparing For",
    content: <PreparingFor onBack={() => {}} onNext={() => {}} />,
  },
  {
    id: 3,
    title: "Setting your Preferences",
    content: <Preferences />,
  },
  {
    id: 4,
    title: "Upload Your Photo",
    content: <UploadProfile />,
  },
];

export default function MultiStepRegisterForm() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const progressValue = ((step + 1) / steps.length) * 100;

  return (
    <div>
      <div className="border-b-2 border-b-slate-300">
        <CommonWrapper>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-7">
              <img src="/logo1.svg " className="h-16" alt="" />
              <h2 className="text-xl font-semibold ">Medical Student Hub</h2>
            </div>
            <p>
              Step {step + 1} of {steps.length}
            </p>
          </div>
        </CommonWrapper>
      </div>
      <CommonWrapper>
        <div className="max-w-4x mx-auto mt-4">
          {/* Progress Bar */}
          <Progress
            value={progressValue}
            className="h-2 mb-6 [&>div]:bg-[#0D71CF]"
          />

          {/* Step Title */}
          <h2 className="text-lg font-semibold mb-4 text-center">
            {steps[step].title}
          </h2>

          {/* Step Content */}
          <div className="min-h-[150px] flex items-center justify-center border rounded-lg p-6 mb-6">
            {steps[step].content}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 0 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="cursor-pointer"
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <Button onClick={handleNext} className="cursor-pointer">
                Continue
              </Button>
            ) : (
              <Button
                onClick={() => alert("Form submitted ✅")}
                className="bg-blue-main w-3xs h-10"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
