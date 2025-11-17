import CommonSpace from "@/common/space/CommonSpace";
import StudentTypeCard from "@/components/AdminDashboard/Content&Resources/content/StudentTypeCard";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";

import {
  useCreateStudentTypeApiMutation,
  useDeleteStudentTypeApiMutation,
  useGetStudentTypeApiQuery,
  useUpdateStudentTypeApiMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useState } from "react";
import StudentTypeModal from "./StudentTypeModal";

const StudentsCard = () => {
  const { data: studentTypeData } = useGetStudentTypeApiQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentType, setStudentType] = useState<{
    typeName: string;
    _id?: string;
  } | null>(null);

  const [createStudentTypeApi, { isLoading: isCreating }] =
    useCreateStudentTypeApiMutation();
  const [updateStudentTypeApi, { isLoading: isUpdating }] =
    useUpdateStudentTypeApiMutation();
  const [deleteStudentTypeApi] = useDeleteStudentTypeApiMutation();

  // Open modal for editing
  const handleEdit = (data: { typeName: string; _id: string }) => {
    setStudentType(data);
    setIsModalOpen(true);
  };

  // Open modal for creating
  const handleCreate = () => {
    setStudentType(null);
    setIsModalOpen(true);
  };

  // Create or Update submit
  const handleSubmit = async (data: { typeName: string }) => {
    const { typeName } = data;
    try {
      if (studentType?._id) {
        await updateStudentTypeApi({ _id: studentType._id, typeName }).unwrap();
      } else {
        await createStudentTypeApi({ typeName }).unwrap();
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating/updating student type:", err);
    }
  };

  // loading
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (_id: string) => {
    try {
      setDeletingId(_id);
      await deleteStudentTypeApi(_id).unwrap();
      setDeletingId(null);
    } catch (err) {
      console.error("Error deleting student type:", err);
      setDeletingId(null);
    }
  };

  return (
    <div>
      <DashboardTopSection
        title="Content Management"
        description="Manage mentors and their mentees."
        buttonText="Add Student Type"
        action={handleCreate}
      />

      {/* Student cards */}
      <CommonSpace>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentTypeData?.data?.map((student, i) => (
            <StudentTypeCard
              key={student._id}
              index={i}
              data={student}
              handleEdit={() => handleEdit(student)}
              handleDelete={() => handleDelete(student._id)}
              isDeleting={deletingId === student._id}
            />
          ))}
        </div>
      </CommonSpace>

      {isModalOpen && (
        <StudentTypeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={studentType ?? undefined}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
        />
      )}
    </div>
  );
};

export default StudentsCard;
