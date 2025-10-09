import { useParams } from "react-router-dom";
import { useGetSingleStudentsQuery } from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";
import { originalTitle } from "@/help/help";
import UserProfile from "./UserProfile";
import image from "@/assets/home/mentor1.png"; // default profile image
import Spinner from "@/common/custom/Spinner";

const StudentProfile = () => {
  const { id, name } = useParams<{ id: string; name: string }>();
  const {
    data: student,
    isLoading,
    isError,
  } = useGetSingleStudentsQuery(id ?? "");

  const profile = student?.profile_id;

  if (isLoading) return <Spinner />;
  if (isError || !student)
    return (
      <div className="py-10 text-center text-gray-500">Student not found</div>
    );

  return (
    <div>
      <UserProfile
        fullName={
          (`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}` ||
            originalTitle(name as string)) ??
          "John Doe"
        }
        email={student?.email}
        phone={profile?.point || "+1 (555) 123-4567"}
        country={profile?.country}
        university={profile?.university}
        preparingFor={profile?.preparingFor}
        bio={profile?.bio}
        profileImage={profile?.profile_photo || image}
        yearOfStudy={profile?.year_of_study}
        profession={profile?.studentType?.replace("_", " ").toLowerCase()}
        backLink="/admin/students"
      />
    </div>
  );
};

export default StudentProfile;
