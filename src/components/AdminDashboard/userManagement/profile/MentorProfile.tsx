import { originalTitle } from "@/help/help";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import image from "@/assets/home/mentor1.png";
import { mentorsData } from "../mentor/data";
const MentorProfile = () => {
  const { name } = useParams();
  const { id } = useParams();
  const mentorId = parseInt(id ?? "", 10);

  const mentor = mentorsData.find((p) => p.id === mentorId);

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div>
      <UserProfile
        fullName={originalTitle(name as string) ?? "John Doe"}
        email="sarah.johnson@email.com"
        phone="+1 (555) 123-4567"
        bio="I'm a homeowner who loves working with skilled professionals to improve my property. I value quality work and clear communication."
        profileImage={image}
        yearOfStudy={mentor.experience}
        profession="Medical Student"
      />
    </div>
  );
};

export default MentorProfile;
