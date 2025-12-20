import image from "@/assets/home/mentor1.png";
import Spinner from "@/common/button/Spinner";
import { originalTitle } from "@/help/help";
import { useGetSingleProfessionalQuery } from "@/store/features/adminDashboard/UserManagement/professionalUserApi";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
const ProfessionalProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: professional, isLoading } = useGetSingleProfessionalQuery(
    id ?? "",
    {
      skip: !id,
    }
  );

  const profile = professional?.data;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        profile && (
          <UserProfile
            fullName={
              originalTitle(
                profile?.profile_id.firstName +
                  " " +
                  profile?.profile_id.lastName
              ) ?? "John Doe"
            }
            email="sarah.johnson@email.com"
            phone="+1 (555) 123-4567"
            country={profile?.profile_id.country ?? "Not provided"}
            bio={profile?.profile_id.institution ?? "Not provided"}
            university={profile?.profile_id.institution ?? "Not provided"}
            preparingFor={profile?.profile_id.professionName ?? "Not provided"}
            profileImage={image}
            yearOfStudy={profile?.role}
            profession={profile.profile_type}
            backLink="/admin/professional"
          />
        )
      )}
    </div>
  );
};

export default ProfessionalProfile;
