import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "../reuseable/DashboardTopSection";
import React, { useState } from "react";
import CommonButton from "@/common/button/CommonButton";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CommonSelect from "@/common/custom/CommonSelect";
import MediumHeader from "@/common/header/MediumHeader";

interface PlanFormProps {
  handleCancel: () => void;
}
const PlanForm: React.FC<PlanFormProps> = ({ handleCancel }) => {
  interface PlanFormData {
    planName: string;
    price: string;
    description: string;
    billingCycle: "Monthly" | "Quarterly" | "Yearly";
    features: {
      quizGenerate: boolean;
      flashcardsGenerate: boolean;
    };
    limits: {
      quizLimit: string;
      flashcardsLimit: string;
    };
  }

  const [formData, setFormData] = useState<PlanFormData>({
    planName: "",
    price: "",
    description: "",
    billingCycle: "Monthly",
    features: {
      quizGenerate: false,
      flashcardsGenerate: false,
    },
    limits: {
      quizLimit: "",
      flashcardsLimit: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureToggle = (
    feature: keyof PlanFormData["features"],
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: value,
      },
    }));
  };

  const handleLimitChange = (
    limitType: keyof PlanFormData["limits"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      limits: {
        ...prev.limits,
        [limitType]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  // const handleReset = () => {
  //   // Handle cancel action
  //   setFormData({
  //     planName: "",
  //     price: "",
  //     description: "",
  //     billingCycle: "Monthly",
  //     features: {
  //       quizGenerate: false,
  //       flashcardsGenerate: false,
  //     },
  //     limits: {
  //       quizLimit: "",
  //       flashcardsLimit: "",
  //     },
  //   });
  // };

  const inputClass = {
    input:
      "text-sm font-normal  text-[#0F172A]  font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
    label:
      "text-sm font-normal  text-[#18181B]  font-inter leading-[20px] block mb-2",
  };
  const billingCycleOptions = [
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Yearly", value: "Yearly" },
  ] as const;

  const featureOptions = [
    { label: "Disabled", value: "false" },
    { label: "Enabled", value: "true" },
  ] as const;
  return (
    <div>
      <DashboardTopSection
        title="Create Plan"
        description="Create a new online event, seminar, or workshop with detailed scheduling and pricing options."
      />

      <CommonSpace className="">
        <CommonBorderWrapper className=" !border-0 !rounded-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="planName" className={inputClass.label}>
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  name="planName"
                  value={formData.planName}
                  onChange={handleInputChange}
                  className={inputClass.input}
                  placeholder="Enter plan name"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className={inputClass.label}>
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={inputClass.input}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <label htmlFor="description" className={inputClass.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={inputClass.input}
                placeholder="Enter plan description"
                required
              />
            </div>

            {/* Billing Cycle */}
            <div>
              <label htmlFor="billingCycle" className={inputClass.label}>
                Billing Cycle
              </label>
              <CommonSelect
                value={formData.billingCycle}
                item={billingCycleOptions}
                onValueChange={(val) =>
                  handleInputChange({
                    target: { name: "billingCycle", value: val },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="w-full"
              />
            </div>

            <div>
              <MediumHeader className="!text-xl !font-normal  mb-4">
                Plan Features
              </MediumHeader>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  {" "}
                  <label htmlFor="quizGenerate" className={inputClass.label}>
                    Quiz Generate
                  </label>
                  <div className="flex gap-4 items-center">
                    <CommonSelect
                      value={formData.features.quizGenerate ? "true" : "false"}
                      item={featureOptions}
                      onValueChange={(val) =>
                        handleFeatureToggle("quizGenerate", val === "true")
                      }
                      className="w-full"
                    />
                    {formData.features.quizGenerate && (
                      <input
                        type="number"
                        value={formData.limits.quizLimit}
                        onChange={(e) =>
                          handleLimitChange("quizLimit", e.target.value)
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Limit"
                        min="0"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="flashcardsGenerate"
                    className={inputClass.label}
                  >
                    Flashcards Generate
                  </label>
                  <div className="flex gap-4 items-center">
                    <CommonSelect
                      value={
                        formData.features.flashcardsGenerate ? "true" : "false"
                      }
                      item={featureOptions}
                      onValueChange={(val) =>
                        handleFeatureToggle(
                          "flashcardsGenerate",
                          val === "true"
                        )
                      }
                      className="w-full"
                    />
                    {formData.features.flashcardsGenerate && (
                      <input
                        type="number"
                        value={formData.limits.flashcardsLimit}
                        onChange={(e) =>
                          handleLimitChange("flashcardsLimit", e.target.value)
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Limit"
                        min="0"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6 pb-5 sm:pb-0 ">
              <CommonButton type="button" onClick={handleCancel} className="">
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                className="!bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] !text-white"
              >
                Create Plan
              </CommonButton>
            </div>
          </form>
        </CommonBorderWrapper>
      </CommonSpace>
    </div>
  );
};

export default PlanForm;
