import React from "react";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import MiniTitle from "@/common/header/MiniTitle";
import RenderStars from "@/common/custom/RenderStars";

// Define type for a session log
interface SessionLog {
  id: number;
  title: string;
  mentor: string;
  student: string;
  duration: string;
  description: string;
  rating: number;
}

// Dummy session data
const sessionData: SessionLog[] = [
  {
    id: 1,
    title: "Session #6: Advanced ECG Interpretation",
    mentor: "Dr. Smith",
    student: "Sarah Johnson",
    duration: "60 minutes",
    description:
      "Covered complex arrhythmia patterns and diagnostic approaches. Sarah demonstrated strong analytical skills in case studies.",
    rating: 4,
  },
  {
    id: 2,
    title: "Session #5: ECG Fundamentals",
    mentor: "Dr. Smith",
    student: "Sarah Johnson",
    duration: "45 minutes",
    description:
      "Reviewed ECG basics including waveforms and normal rhythms. Great interaction and understanding.",
    rating: 5,
  },
];

const SessionLogs: React.FC = () => {
  return (
    <CommonBorderWrapper className="">
      <CommonHeader className=" !font-normal mb-9">Session Logs</CommonHeader>

      <div className="space-y-4">
        {sessionData.map((session) => (
          <div
            key={session.id}
            className="border border-border rounded-lg p-4 space-y-2 bg-white"
          >
            <CommonHeader className="!font-semibold">
              {session.title}
            </CommonHeader>
            <Paragraph className="">
              {session.mentor} ↔ {session.student} • Duration:{" "}
              {session.duration}
            </Paragraph>
            <Paragraph className="text-sm text-[#475569]">
              {session.description}
            </Paragraph>
            <div className="flex items-center text-sm text-gray-800 mt-1">
              <MiniTitle className="mr-2 font-medium">
                Session Ratings:
              </MiniTitle>

              <RenderStars rating={session.rating} />
            </div>
          </div>
        ))}
      </div>
    </CommonBorderWrapper>
  );
};

export default SessionLogs;
