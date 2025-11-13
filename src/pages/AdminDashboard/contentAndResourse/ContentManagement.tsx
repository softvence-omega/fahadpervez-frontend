import ContentmentCardSection from "@/components/AdminDashboard/Content&Resources/content/ContentmentCardSection";
import DentalStudent from "@/components/AdminDashboard/Content&Resources/content/dental/DentalStudent";
import DentistsStudent from "@/components/AdminDashboard/Content&Resources/content/dentists/DentistsStudent";
import CreateContent from "@/components/AdminDashboard/Content&Resources/content/medical/createContent/CreateContent";
import MedicalStudent from "@/components/AdminDashboard/Content&Resources/content/medical/MedicalStudent";

import NursingStudent from "@/components/AdminDashboard/Content&Resources/content/nursing/NursingStudent";
import PharmacistsStudent from "@/components/AdminDashboard/Content&Resources/content/Pharmacists/PharmacistsStudent";
import PhysiciansStudent from "@/components/AdminDashboard/Content&Resources/content/physicians/PhysiciansStudent";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { showContentCard } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export type StudentTypes =
  | "Medical Student"
  | "Nursing Student"
  | "Dental Student"
  | "Physicians Student"
  | "Dentists Student"
  | "Pharmacists Student"
  | "";

const studentComponents = [
  { type: "Medical Student", component: MedicalStudent },
  { type: "Nursing Student", component: NursingStudent },
  { type: "Dental Student", component: DentalStudent },
  { type: "Physicians Student", component: PhysiciansStudent },
  { type: "Dentists Student", component: DentistsStudent },
  { type: "Pharmacists Student", component: PharmacistsStudent },
];
const ContentManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { contentCard, studentDashboard, addContent, addMCQ } = useSelector(
    (state: RootState) => state.staticContent
  );
  const [studentType, setStudentType] = useState<StudentTypes>("");
  const SelectedComponent = studentComponents.find(
    (item) => item.type === studentType
  )?.component;

  useEffect(() => {
    dispatch(showContentCard());
  }, []);

  return (
    <div>
      <div>
        {contentCard && (
          <>
            <DashboardTopSection
              title="Content Management"
              description="Manage mentors and their mentees."
            />
            <ContentmentCardSection setStudentType={setStudentType} />
          </>
        )}
      </div>

      {studentDashboard && SelectedComponent && <SelectedComponent />}

      {(addContent || addMCQ) && (
        <div>
          <CreateContent studentType={studentType} />
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
