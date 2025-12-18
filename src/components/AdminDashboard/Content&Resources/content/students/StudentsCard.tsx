import CommonSpace from "@/common/space/CommonSpace";
import StudentTypeCard from "@/components/AdminDashboard/Content&Resources/content/StudentTypeCard";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useGetStudentTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useGetProfessionalTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/professionalType/professionalTypeApi";
import {
  ContentFor,
  setContentFor,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";

const StudentsCard = () => {
  const { contentFor } = useAppSelector(
    (state: RootState) => state.staticContent
  );
  const { data: studentTypeData } = useGetStudentTypeApiQuery();
  const { data: professionalTypeData } = useGetProfessionalTypeApiQuery();

  const dataToRender =
    contentFor === "student"
      ? studentTypeData?.data
      : professionalTypeData?.data;

  const dispatch = useDispatch();
  const tabs = [
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
  ];

  return (
    <div>
      <div className="flex justify-between items-start">
        <DashboardTopSection
          title="Content Management"
          description="Manage mentors and their mentees."
        />

        <Tabs
          tabs={tabs}
          active={contentFor}
          onChange={(value) => dispatch(setContentFor(value as ContentFor))}
        />
      </div>
      <CommonSpace>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataToRender?.map((student, i) => (
            <StudentTypeCard key={student._id} index={i} data={student} />
          ))}
        </div>
      </CommonSpace>
    </div>
  );
};

export default StudentsCard;
