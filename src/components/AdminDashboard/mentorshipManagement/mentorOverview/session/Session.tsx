import CommonSelect from "@/common/custom/CommonSelect";
import CustomCheckbox from "@/common/custom/CustomCheckbox";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { useState } from "react";
const durationOptions = [
  { label: "15 min", value: "15min" },
  { label: "30 min", value: "30min" },
  { label: "45 min", value: "45min" },
  { label: "60 min", value: "60min" },
  { label: "75 min", value: "75min" },
  { label: "90 min", value: "90min" },
  { label: "105 min", value: "105min" },
  { label: "120 min", value: "120min" },
  { label: "150 min", value: "150min" },
  { label: "180 min", value: "180min" },
] as const;
const studentOptionsList = [
  { label: "15 ", value: "15" },
  { label: "30 ", value: "30" },
  { label: "45 ", value: "45" },
  { label: "60 ", value: "60" },
  { label: "75 ", value: "75" },
  { label: "90 ", value: "90" },
  { label: "105 ", value: "105" },
  { label: "120", value: "120" },
  { label: "150 ", value: "150" },
  { label: "180 ", value: "180" },
] as const;

//checkbox
export const studentOptions = [
  { label: "Minimum 2nd year medical student", value: "2nd_year" },
  { label: "GPA 3.0 or higher", value: "gpa_3" },
] as const;

export const mentorOptions = [
  { label: "Minimum 3 years clinical experience", value: "3_years_experience" },
  { label: "Previous mentoring experience", value: "mentoring_experience" },
] as const;

const Session = () => {
  const [selected, setSelected] =
    useState<(typeof durationOptions)[number]["value"]>("60min");

  const [selectedStudent, setSelectedStudent] = useState<string>("15");

  const [studentSelection, setStudentSelection] = useState<string[]>([]);
  const [mentorSelection, setMentorSelection] = useState<string[]>([]);
  return (
    <div>
      <div className="flex flex-col xl:flex-row  gap-6">
        <CommonBorderWrapper className="space-y-9">
          <CommonHeader className=" !font-normal">
            Program Settings
          </CommonHeader>
          <div>
            <Paragraph className="mb-1">Max Session Duration</Paragraph>
            <CommonSelect
              value={selected}
              onValueChange={(val) => setSelected(val)}
              item={durationOptions}
              className="w-full"
            />
          </div>
          <div>
            <Paragraph className="mb-1">Maximum Students per Mentor</Paragraph>
            <CommonSelect
              value={selectedStudent}
              onValueChange={(val) => setSelectedStudent(val)}
              item={studentOptionsList}
              className="w-full"
            />
          </div>
        </CommonBorderWrapper>
        <CommonBorderWrapper className="space-y-4">
          <CommonHeader className=" !font-normal">
            Eligibility Criteria
          </CommonHeader>

          <div className="space-y-2.5">
            <CommonHeader className=" !font-normal">
              Student Requirements
            </CommonHeader>
            {studentOptions.map((opt) => (
              <CustomCheckbox
                key={opt.value}
                id={opt.value}
                label={opt.label}
                checked={studentSelection.includes(opt.value)}
                onChange={(checked) => {
                  setStudentSelection((prev) =>
                    checked
                      ? [...prev, opt.value]
                      : prev.filter((val) => val !== opt.value)
                  );
                }}
              />
            ))}
          </div>

          <div className="space-y-2.5">
            <CommonHeader className=" !font-normal">
              Mentor Requirements
            </CommonHeader>
            {mentorOptions.map((opt) => (
              <CustomCheckbox
                key={opt.value}
                id={opt.value}
                label={opt.label}
                checked={mentorSelection.includes(opt.value)}
                onChange={(checked) => {
                  setMentorSelection((prev) =>
                    checked
                      ? [...prev, opt.value]
                      : prev.filter((val) => val !== opt.value)
                  );
                }}
              />
            ))}
          </div>
        </CommonBorderWrapper>
      </div>
    </div>
  );
};

export default Session;
