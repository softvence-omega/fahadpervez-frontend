import CommonButton from "@/common/button/CommonButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormHeader from "../../reuseable/FormHeader";
import ModalCloseButton from "../../reuseable/ModalCloseButton";

const schema = z.object({
  totalStudyYear: z
    .string()
    .min(1, "Total study year is required")
    .regex(/^\d+$/, "Must be a number"),

  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  specialty: z.string().min(1, "Specialty is required"),
  yearsOfExperience: z
    .string()
    .min(1, "Years of experience is required")
    .regex(/^\d+$/, "Must be a number"),
  bio: z.string().min(1, "Bio is required"),
});

type FormData = z.infer<typeof schema>;

interface AddStudentTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const AddMentorTypeModal: FC<AddStudentTypeModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!open) return null;

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
    error: "text-red-500 text-sm mt-1",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6 relative">
        <ModalCloseButton onClick={onClose} />
        <FormHeader
          title="Add New Mentor"
          subtitle="Add a new mentor to guide students and professionals."
          className="mb-6"
        />

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div>
            <label className={inputClass.label}>Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="e.g. John Doe"
              className={inputClass.input}
            />
            {errors.fullName && (
              <p className={inputClass.error}>{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="e.g. mentor@example.com"
              className={inputClass.input}
            />
            {errors.email && (
              <p className={inputClass.error}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Specialty</label>
            <input
              type="text"
              {...register("specialty")}
              placeholder="e.g. Data Science, Pharmacy"
              className={inputClass.input}
            />
            {errors.specialty && (
              <p className={inputClass.error}>{errors.specialty.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Years of Experience</label>
            <input
              type="text"
              {...register("yearsOfExperience")}
              placeholder="e.g. 5"
              className={inputClass.input}
            />
            {errors.yearsOfExperience && (
              <p className={inputClass.error}>
                {errors.yearsOfExperience.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Bio</label>
            <textarea
              {...register("bio")}
              rows={3}
              placeholder="Write a short bio about the mentor..."
              className={`resize-none ${inputClass.input} `}
            />
            {errors.bio && (
              <p className={inputClass.error}>{errors.bio.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3  pt-4">
            <CommonButton type="button" onClick={onClose}>
              Cancel
            </CommonButton>
            <CommonButton type="submit" className="!bg-blue-500 text-white">
              Save
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMentorTypeModal;
