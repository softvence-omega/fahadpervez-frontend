/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import { Progress } from "@/components/ui/progress";
import AboutYourSelfTab from "./ProfileSetupTab";
import PreparingFor from "./PreparingFor";
import Preferences from "./Preferences";
import UploadProfile from "./UploadProfile";
import VerifyProfession from "./VerifyProfession";
import UpdatePreference from "./UpdatePreference";
import PlatformTraining from "./PlatformTraining";
import PayoutSetup from "./PayoutSetup";
import { MultiStepFormData } from "./schemas";
import { examOptions } from "./constants";
import { useUpdateInitialProfileMutation } from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function MultiStepRegisterForm() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({});
  const [selectedRole, setSelectedRole] = useState<string | "">("");
  const navigate = useNavigate();

  const [updateInitialProfile] = useUpdateInitialProfileMutation();

  // Determine steps based on role
  const role = selectedRole || formData.profile?.role;
  const isMentor = role === "mentor";
  const isProfessional = role === "professional";

  const steps = isMentor
    ? [
        "AboutYourSelfTab",
        "VerifyProfession",
        "UpdatePreference",
        "PlatformTraining",
        "PayoutSetup",
        "UploadProfile",
      ]
    : isProfessional
    ? ["AboutYourSelfTab", "UploadProfile"] // Skip PreparingFor for Professional
    : ["AboutYourSelfTab", "PreparingFor", "UploadProfile"]; // Default Student flow
  const stepCount = steps.length;
  const progressValue = ((step + 1) / stepCount) * 100;

  const handleNext = (partial: Partial<MultiStepFormData>) => {
    setFormData((prev: any) => ({ ...prev, ...partial }));
    setStep((s) => Math.min(s + 1, stepCount - 1));
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSkip = (key: keyof MultiStepFormData, emptyValue: any = {}) => {
    setFormData((prev) => ({ ...prev, [key]: emptyValue }));
    setStep((s) => Math.min(s + 1, stepCount - 1));
  };

  const handleFinalSubmit = async (partial: Partial<MultiStepFormData>) => {
    const merged = { ...formData, ...partial } as MultiStepFormData;

    console.log("Full collected form data:", merged);

    const currentRole = merged.profile.role;
    let payload: any = {};

    if (currentRole === "student") {
      payload = {
        role: "STUDENT",
        student: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          university: merged.profile.university,
          country: merged.profile.country,
          year_of_study: merged.profile.academicYear,
          studentType: merged.profile.subRole,
          preparingFor: (
            ("preparing" in merged ? (merged.preparing as any)?.exams : []) ||
            []
          )
            .map((id: any) => {
              const option = examOptions.find((opt: any) => opt.id === id);
              return option
                ? {
                    examName: option.examName,
                    description: option.description,
                  }
                : null;
            })
            .filter((item: any) => item !== null),
        },
        preference: {
          subject:
            ("preferences" in merged &&
              merged.preferences?.subjectPreference) ||
            "",
          systemPreference:
            ("preferences" in merged && merged.preferences?.systemPreference) ||
            "",
          topic: ("preferences" in merged && merged.preferences?.topic) || "",
          subTopic:
            ("preferences" in merged && merged.preferences?.subTopic) || "",
        },
        bio: merged.upload?.bio || "",
      };
    } else if (currentRole === "professional") {
      payload = {
        role: "PROFESSIONAL",
        professional: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          professionName: merged.profile.subRole,
          institution: merged.profile.hospital,
          country: merged.profile.country,
          post_graduate: merged.profile.postgraduateYear,
          experience: merged.profile.experience,
          bio: merged.upload?.bio || "",
          // profile_photo: "will be handled by backend from image field"
        },
      };
    } else if (currentRole === "mentor") {
      payload = {
        role: "MENTOR",
        mentor: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          country: merged.profile.country,
          currentRole: (merged.profile as any).currentRole || "",
          hospitalOrInstitute:
            (merged.profile as any).hospitalOrInstitute || "",
          specialty: (merged.profile as any).specialty || "",
          professionalExperience: (merged.profile as any).experience || "",
          postgraduateDegree: (merged.profile as any).postgraduateDegree || "",
          isConditionAccepted: true,
          bio: merged.upload?.bio || "",
        },
      };
    }

    // Console log the full data for backend reference
    console.log("Backend payload structure:", payload);
    /* 
      Full collected data for future use:
      ${JSON.stringify(merged, null, 2)}
    */

    const formDataToSend = new FormData();
    if (merged.upload?.photo) {
      formDataToSend.append("image", merged.upload.photo);
    }
    formDataToSend.append("data", JSON.stringify(payload));

    try {
      const res = await updateInitialProfile(formDataToSend).unwrap();
      console.log("API response:", res);
      if (res.success === true) {
        toast.success(res.message);
        navigate("/login");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Check console for details.");
    }
  };

  return (
    <div>
      <div className="border-b-2 border-b-slate-300">
        <CommonWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-7">
              <img src="/logo.svg" className="h-16" alt="logo" />
              <h2 className="text-xl font-semibold">Medical Student Hub</h2>
            </div>
            <p>
              Step {step + 1} of {stepCount}
            </p>
          </div>
        </CommonWrapper>
      </div>

      <CommonWrapper>
        <div className="max-w-7xl mx-auto mt-4">
          <Progress
            value={progressValue}
            className="h-2 mb-6 [&>div]:bg-[#0D71CF]"
          />

          <div className="min-h-[150px] flex items-center justify-center rounded-lg p-6 mb-6">
            {steps[step] === "AboutYourSelfTab" && (
              <AboutYourSelfTab
                defaultValues={formData.profile ?? undefined}
                onRoleChange={(role: any) => setSelectedRole(role)}
                onNext={(profile) => handleNext({ profile } as any)}
              />
            )}
            {steps[step] === "PreparingFor" && (
              <PreparingFor
                defaultValues={
                  "preparing" in formData ? formData.preparing : undefined
                }
                onBack={handleBack}
                onNext={(preparing) => handleNext({ preparing })}
              />
            )}

            {steps[step] === "Preferences" && (
              <Preferences
                defaultValues={
                  "preferences" in formData ? formData.preferences : undefined
                }
                onBack={handleBack}
                onNext={(preferences) => handleNext({ preferences })}
                onSkip={() =>
                  handleSkip("preferences" as keyof MultiStepFormData, {
                    subjectPreference: "",
                    systemPreference: "",
                    topic: "",
                    subTopic: "",
                  })
                }
              />
            )}

            {steps[step] === "VerifyProfession" && (
              <VerifyProfession
                defaultValues={
                  "verifyProfession" in formData
                    ? formData.verifyProfession
                    : undefined
                }
                onBack={handleBack}
                onNext={(verifyProfession) => handleNext({ verifyProfession })}
                onSkip={() => handleSkip("verifyProfession" as any)}
              />
            )}

            {steps[step] === "UpdatePreference" && (
              <UpdatePreference
                defaultValues={
                  "updatePreference" in formData
                    ? formData.updatePreference
                    : undefined
                }
                onBack={handleBack}
                onNext={(updatePreference) => handleNext({ updatePreference })}
                onSkip={() => handleSkip("updatePreference" as any)}
              />
            )}

            {steps[step] === "PlatformTraining" && (
              <PlatformTraining
                defaultValues={
                  "platformTraining" in formData
                    ? formData.platformTraining
                    : undefined
                }
                onBack={handleBack}
                onNext={(platformTraining) => handleNext({ platformTraining })}
                onSkip={() =>
                  handleSkip("platformTraining" as any, {
                    trainingCompleted: true,
                  })
                }
              />
            )}

            {steps[step] === "PayoutSetup" && (
              <PayoutSetup
                defaultValues={
                  "payoutSetup" in formData ? formData.payoutSetup : undefined
                }
                onBack={handleBack}
                onNext={(payoutSetup) => handleNext({ payoutSetup })}
                onSkip={() => handleSkip("payoutSetup" as any)}
              />
            )}
            {steps[step] === "UploadProfile" && (
              <UploadProfile
                defaultValues={formData.upload ?? undefined}
                onBack={handleBack}
                onNext={(upload) => handleFinalSubmit({ upload })}
                onSkip={() =>
                  handleFinalSubmit({ upload: { photo: null, bio: "" } })
                }
              />
            )}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
