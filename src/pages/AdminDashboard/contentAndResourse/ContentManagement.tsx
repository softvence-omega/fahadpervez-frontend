import ContentmentCardSection from "@/components/AdminDashboard/Content&Resources/content/ContentmentCardSection";
import DentalStudent from "@/components/AdminDashboard/Content&Resources/content/dental/DentalStudent";
import DentistsStudent from "@/components/AdminDashboard/Content&Resources/content/dentists/DentistsStudent";
import MedicalStudent from "@/components/AdminDashboard/Content&Resources/content/medical/MedicalStudent";

import NursingStudent from "@/components/AdminDashboard/Content&Resources/content/nursing/NursingStudent";
import PharmacistsStudent from "@/components/AdminDashboard/Content&Resources/content/Pharmacists/PharmacistsStudent";
import PhysiciansStudent from "@/components/AdminDashboard/Content&Resources/content/physicians/PhysiciansStudent";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { useState } from "react";
export type StudentTypes =
  | "Medical"
  | "Nursing"
  | "Dental"
  | "Physicians"
  | "Dentists"
  | "Pharmacists"
  | "";

const studentComponents = [
  { type: "Medical", component: MedicalStudent },
  { type: "Nursing", component: NursingStudent },
  { type: "Dental", component: DentalStudent },
  { type: "Physicians", component: PhysiciansStudent },
  { type: "Dentists", component: DentistsStudent },
  { type: "Pharmacists", component: PharmacistsStudent },
];
const ContentManagement = () => {
  const [studentType, setStudentType] = useState<StudentTypes>("");

  const SelectedComponent = studentComponents.find(
    (item) => item.type === studentType
  )?.component;
  return (
    <div>
      {studentType && SelectedComponent ? (
        <SelectedComponent />
      ) : (
        <>
          <DashboardTopSection
            title="Content Management"
            description="Manage mentors and their mentees."
          />
          <ContentmentCardSection setStudentType={setStudentType} />
        </>
      )}
    </div>
  );
};

export default ContentManagement;
