import CommonHeader from "@/common/header/CommonHeader";
import { MoreVertical } from "lucide-react";
import { FC } from "react";

interface StudentType {
  id: string;
  name: string;
  totalYears: number;
  students: number;
}

const studentTypes: StudentType[] = [
  { id: "1", name: "Medical", totalYears: 6, students: 1547 },
  { id: "2", name: "Nursing", totalYears: 4, students: 892 },
  { id: "3", name: "Dental", totalYears: 5, students: 408 },
];

const UserManagementCard: FC = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <CommonHeader>Student Types</CommonHeader>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentTypes.map((type) => (
          <div
            key={type.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <CommonHeader className="">{type.name}</CommonHeader>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total Years:</span>
                <span className="text-gray-900 font-medium">
                  {type.totalYears} years
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Students:</span>
                <span className="text-gray-900 font-medium">
                  {type.students}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementCard;
