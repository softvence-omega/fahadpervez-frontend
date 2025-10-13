import CommonSelect from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import SessionLogs from "./SessionLogs";
import { useState } from "react";
import MiniTitle from "@/common/header/MiniTitle";
const sessionReminders = [
  {
    title: "Sessions Completed",
    description: "Try to complete all the session skill evaluation",
  },
  {
    title: "Question Bank Upload",
    description: "Try to upload question bank for students",
  },
];

const ProgressTracking = () => {
  const [selected, setSelected] = useState<string>("ramjan");
  const studentOptionsList = [
    { label: "Ramjan", value: "ramjan" },
    { label: "Fahad", value: "fahad" },
    { label: "Ayesha", value: "ayesha" },
    { label: "Usman", value: "usman" },
    { label: "Sarah", value: "sarah" },
    { label: "Ahmed", value: "ahmed" },
    { label: "Mariam", value: "mariam" },
    { label: "Zain", value: "zain" },
    { label: "Hira", value: "hira" },
    { label: "Ali", value: "ali" },
  ] as const;
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <CommonBorderWrapper className="sm:space-y-9 space-y-4">
          <CommonHeader className=" !font-normal">
            Individual Progress Tracking
          </CommonHeader>
          <div>
            <Paragraph className="mb-1">Select Mentor</Paragraph>
            <CommonSelect
              value={selected}
              onValueChange={(val) => setSelected(val)}
              item={studentOptionsList}
              className="w-full"
            />
          </div>
          <div>
            <CommonHeader className="!font-semibold mb-1.5">
              Dr.Smith
            </CommonHeader>
            <div className="flex justify-between">
              <Paragraph>Overall Progress</Paragraph>
              <Paragraph className="!font-semibold">75%</Paragraph>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full my-4">
              <div
                className={`h-1.5 rounded-full bg-[#EA580C]`}
                style={{ width: `75%` }}
              ></div>
            </div>
            <CommonHeader>Sessions Completed: 6/8</CommonHeader>
          </div>
        </CommonBorderWrapper>
        <CommonBorderWrapper className="sm:space-y-9 space-y-4">
          <CommonHeader className="!font-normal">
            Progress Milestones
          </CommonHeader>
          <div className="sm:space-y-9 space-y-4">
            {sessionReminders.map((item) => (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#10934B] rounded-full"></div>
                  <Paragraph>{item.title}</Paragraph>
                </div>
                <MiniTitle>{item.description}</MiniTitle>
              </div>
            ))}
          </div>
        </CommonBorderWrapper>
      </div>

      <SessionLogs />
    </div>
  );
};

export default ProgressTracking;
