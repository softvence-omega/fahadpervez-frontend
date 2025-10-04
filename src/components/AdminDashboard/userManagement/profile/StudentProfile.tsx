import { originalTitle } from "@/help/help";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import image from "@/assets/home/mentor1.png";
import { studentsData } from "../student/data";
const StudentProfile = () => {
  const { name } = useParams();
  const { id } = useParams();
  const studentId = parseInt(id ?? "", 10);

  const student = studentsData.find((s) => s.id === studentId);

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div>
      <UserProfile
        fullName={originalTitle(name as string) ?? "John Doe"}
        email="sarah.johnson@email.com"
        phone="+1 (555) 123-4567"
        country="UK"
        university={student.university}
        preparingFor={student.prepping}
        bio="I'm a homeowner who loves working with skilled professionals to improve my property. I value quality work and clear communication."
        profileImage={image}
        yearOfStudy={student.year}
        profession="Medical Student"
      />
    </div>
  );
};

export default StudentProfile;
