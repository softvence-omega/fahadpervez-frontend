import AllStudentProfileTable from "@/components/AdminDashboard/userManagement/student/AllStudentProfiletable";
import { studentsData } from "@/components/AdminDashboard/userManagement/student/data";
import StudentTop from "@/components/AdminDashboard/userManagement/student/StudentTop";

const Student = () => {
  return (
    <div>
      <StudentTop />
      <AllStudentProfileTable students={studentsData} />
    </div>
  );
};

export default Student;
