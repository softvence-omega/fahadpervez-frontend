import React from "react";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";

type Feature = {
  name: string;
  value: number;
  color: string;
};

const features: Feature[] = [
  { name: "Quiz Taking", value: 75, color: "bg-orange-500" },
  { name: "Flashcard Study", value: 75, color: "bg-green-700" },
  { name: "Clinical case", value: 75, color: "bg-red-500" },
  { name: "Resource Downloads", value: 75, color: "bg-teal-500" },
  { name: "Discussion Forums", value: 75, color: "bg-indigo-600" },
];

const FeatureUsage: React.FC = () => {
  return (
    <CommonBorderWrapper className="w-full">
      <CommonHeader className="!text-lg mb-7.5">Feature Usage</CommonHeader>
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="flex items-center justify-between pb-2.5">
              <CommonHeader className=" !text-base !text-[#1F2937]">
                {feature.name}
              </CommonHeader>
              <div className="w-12 text-sm font-medium text-gray-700 text-right">
                {feature.value}%
              </div>
            </div>

            <div className="w-full h-1.5 bg-gray-200 rounded-full">
              <div
                className={`h-1.5 rounded-full ${feature.color}`}
                style={{ width: `${feature.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </CommonBorderWrapper>
  );
};

export default FeatureUsage;
