import { professionalData } from "@/components/AdminDashboard/userManagement/professional/data";
import ProfessionalTable from "@/components/AdminDashboard/userManagement/professional/ProfessionalTable";
import ProfessionalTop from "@/components/AdminDashboard/userManagement/professional/ProfessionalTop";

const Professional = () => {
  return (
    <div>
      <ProfessionalTop />
      <ProfessionalTable professional={professionalData} />
    </div>
  );
};

export default Professional;
