import CommonSpace from "@/common/space/CommonSpace";
import ContentCard from "./ContentCard";

import { StudentTypes } from "@/pages/AdminDashboard/contentAndResourse/ContentManagement";
import { BookOpen, GraduationCap } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";

interface CardProps {
  setStudentType: React.Dispatch<React.SetStateAction<StudentTypes>>;
}
const ContentmentCardSection: React.FC<CardProps> = ({ setStudentType }) => {
  const cardData = [
    {
      icon: GraduationCap,
      title: "Medical Students",
      stats: [
        { label: "Total Users:", value: 1547 },
        { label: "Content Items:", value: 5240 },
      ],
      actionLabel: "Manage Content",
      actionIcon: BookOpen,
      onActionClick: () => setStudentType("Medical"),
    },
    {
      icon: GraduationCap,
      title: "Nursing Students",
      stats: [
        { label: "Total Users:", value: 2834 },
        { label: "Content Items:", value: 3890 },
      ],
      actionLabel: "Manage Content",
      actionIcon: BookOpen,
      onActionClick: () => setStudentType("Nursing"),
    },
    {
      icon: GraduationCap,
      title: "Dental Students",
      stats: [
        { label: "Total Users:", value: 1092 },
        { label: "Content Items:", value: 2156 },
      ],
      actionLabel: "Manage Content",
      actionIcon: BookOpen,
      onActionClick: () => setStudentType("Dental"),
    },
    {
      icon: FaUserDoctor,
      title: "Physicians",
      stats: [
        { label: "Total Users:", value: 765 },
        { label: "Countries Represented:", value: 42 },
      ],
      actionLabel: "Manage Content",
      actionIcon: BookOpen,
      onActionClick: () => setStudentType("Physicians"),
    },
    {
      icon: FaUserDoctor,
      title: "Dentists",
      stats: [
        { label: "Total Users:", value: 2104 },
        { label: "Projects Completed:", value: 890 },
      ],
      actionLabel: "Manage Content",
      actionIcon: BookOpen,
      onActionClick: () => setStudentType("Dentists"),
    },
    {
      icon: FaUserDoctor,
      title: "Pharmacists",
      stats: [
        { label: "Total Users:", value: 1287 },
        { label: "Published Works:", value: 312 },
      ],
      actionLabel: "Manage Content",
      actionIcon: BookOpen,
      onActionClick: () => setStudentType("Pharmacists"),
    },
  ];
  return (
    <CommonSpace>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <ContentCard key={index} {...card} />
        ))}
      </div>
    </CommonSpace>
  );
};

export default ContentmentCardSection;
