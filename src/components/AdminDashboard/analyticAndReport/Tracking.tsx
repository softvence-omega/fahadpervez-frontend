import CommonHeader from "@/common/header/CommonHeader";
import React, { useState } from "react";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CommonSelect from "@/common/custom/CommonSelect";
import Paragraph from "@/common/header/Paragraph";

type Student = {
  name: string;
  quizAverage: string;
  quizzesCompleted: string;
  studyTime: string;
  strongestSubject: string;
};

const students: Student[] = [
  {
    name: "Sarah Johnson",
    quizAverage: "87%",
    quizzesCompleted: "50/70",
    studyTime: "5 hours",
    strongestSubject: "Cardiology",
  },
  {
    name: "Adam Smith",
    quizAverage: "92%",
    quizzesCompleted: "65/70",
    studyTime: "7 hours",
    strongestSubject: "Neurology",
  },
];

const performanceInsights = [
  {
    title: "High Performers",
    description: "23% of students maintain >90% average across all subjects",
    students: "Alex Chen, Michael Brown, Emily Davis , 3+More",
  },
  {
    title: "At-Risk Students",
    description: "8% of students scoring below 70% consistently",
    students: "Alex Chen, Michael Brown, Emily Davis , 3+More",
  },
];

const Tracking: React.FC = () => {
  const [selected, setSelected] = useState<Student>(students[0]);

  // Array for student summary fields
  const summaryFields: { label: string; value: string }[] = [
    { label: "Overall Quiz Average", value: selected.quizAverage },
    { label: "Quizzes Completed", value: selected.quizzesCompleted },
    { label: "Study Time (This Month)", value: selected.studyTime },
    { label: "Strongest Subject", value: selected.strongestSubject },
  ];

  const studentOptions = students.map((student) => ({
    label: student.name,
    value: student.name,
  }));
  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-10">
      <CommonBorderWrapper className="space-y-7.5">
        <CommonHeader className="font-medium mb-2 !text-base">
          Individual Student Tracking
        </CommonHeader>

        <CommonSelect
          value={selected.name}
          item={studentOptions}
          onValueChange={(val) =>
            setSelected(students.find((s) => s.name === val)!)
          }
          className="w-full mb-4 !border-[#9DA4AE] !bg-white"
        />

        <div className="border border-border rounded-md p-3">
          <Paragraph className="mb-3 !text-[#18181B] !font-semibold">
            {selected.name} - Performance Summary
          </Paragraph>
          <div className="space-y-2 text-sm">
            {summaryFields.map((field) => (
              <div key={field.label} className="flex justify-between">
                <Paragraph className="!text-[#1F2937]">{field.label}</Paragraph>
                <Paragraph className="!text-[#1F2937]">{field.value}</Paragraph>
              </div>
            ))}
          </div>
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper className="space-y-7.5">
        <CommonHeader className="font-medium mb-2 !text-base">
          Performance Insights
        </CommonHeader>

        {performanceInsights.map((insight) => (
          <div
            key={insight.title}
            className="border border-border rounded-md p-3 space-y-2"
          >
            <Paragraph className=" !text-[#18181B] !font-semibold">
              {insight.title}
            </Paragraph>
            <Paragraph className="!text-[#1F2937]">
              {insight.description}
            </Paragraph>
            <CommonHeader className="!text-base text-[#2c2c2c] underline cursor-pointer">
              {insight.students}
            </CommonHeader>
          </div>
        ))}
      </CommonBorderWrapper>
    </div>
  );
};

export default Tracking;
