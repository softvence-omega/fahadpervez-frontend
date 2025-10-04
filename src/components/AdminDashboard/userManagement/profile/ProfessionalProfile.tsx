import { originalTitle } from "@/help/help";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import image from "@/assets/home/mentor1.png";
import { professionalData } from "../professional/data";
const ProfessionalProfile = () => {
  const { name } = useParams();
  const { id } = useParams();
  const professionalId = parseInt(id ?? "", 10);

  const professional = professionalData.find((p) => p.id === professionalId);

  if (!professional) {
    return <div>Professional not found</div>;
  }

  return (
    <div>
      <UserProfile
        fullName={originalTitle(name as string) ?? "John Doe"}
        email="sarah.johnson@email.com"
        phone="+1 (555) 123-4567"
        country={professional.country}
        bio="I'm a homeowner who loves working with skilled professionals to improve my property. I value quality work and clear communication."
        profileImage={image}
        yearOfStudy={professional.graduateYear}
        profession="Medical Student"
      />
    </div>
  );
};

export default ProfessionalProfile;
