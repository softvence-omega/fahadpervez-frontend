import CommonButton from "@/common/button/CommonButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormHeader from "../../reuseable/FormHeader";
import ModalCloseButton from "../../reuseable/ModalCloseButton";

const schema = z.object({
  typeName: z.string().min(1, "Type name is required"),
  totalStudyYear: z
    .string()
    .min(1, "Total study year is required")
    .regex(/^\d+$/, "Must be a number"),
});

type FormData = z.infer<typeof schema>;

interface AddStudentTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const AddProfessionalTypeModal: FC<AddStudentTypeModalProps> = ({
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
          title="  Add New Professional Type"
          subtitle=" Create a new category of students with study duration.
          "
          className="mb-6"
        />

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div>
            <label className={inputClass.label}>Type Name</label>
            <input
              type="text"
              {...register("typeName")}
              placeholder="e.g pharmacy"
              className={inputClass.input}
            />
            {errors.typeName && (
              <p className={inputClass.error}>{errors.typeName.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CommonButton type="button" onClick={onClose} className="">
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

export default AddProfessionalTypeModal;
