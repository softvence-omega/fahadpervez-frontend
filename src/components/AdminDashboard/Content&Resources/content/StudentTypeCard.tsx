import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonHeader from "@/common/header/CommonHeader";
import { toSlug } from "@/help/help";
import { ProfileType } from "@/store/features/adminDashboard/ContentResources/MCQ/type/student";
import { setStudentType } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { BookOpen, GraduationCap } from "lucide-react";
import { FC } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CardProps {
  data: ProfileType;
  className?: string;
  index: number;
  handleEdit: () => void;
  handleDelete: (id: string) => void;
  isDeleting?: boolean;
}
const StudentTypeCard: FC<CardProps> = ({
  data,
  className,
  index,
  handleEdit,
  handleDelete,
  isDeleting,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    data && (
      <div
        className={`bg-white rounded-[14px] p-6 border border-black/10 ${className}`}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-3 ">
            <div className="bg-[#030213]/10 rounded-xl  flex items-center justify-center w-12 h-12">
              {index >= 0 && index <= 2 ? (
                <GraduationCap size={24} className="text-[#030213]" />
              ) : (
                <FaUserDoctor size={24} className="text-[#030213]" />
              )}
            </div>
            <CommonHeader className="">{data.typeName}</CommonHeader>
          </div>
          <span className="cursor-pointer" onClick={handleEdit}>
            <TbEdit size={20} className="text-[#030213]" />
          </span>
        </div>

        <div className="space-y-3 mt-7.5 pb-3">
          <div className="flex justify-between items-center">
            <CommonHeader className="!text-sm !text-[#717182]">
              Total users:
            </CommonHeader>
            <CommonHeader className="!text-sm !text-[#0A0A0A]">
              {data.totalStudent}
            </CommonHeader>
          </div>
          <div className="flex justify-between items-center">
            <CommonHeader className="!text-sm !text-[#717182]">
              Content Items:
            </CommonHeader>
            <CommonHeader className="!text-sm !text-[#0A0A0A]">
              {data.totalContent}
            </CommonHeader>
          </div>
        </div>
        <div className=" flex justify-between items-center  border-t border-black/10 pt-3">
          <CommonHeader
            onClick={() => {
              navigate(`dashboard/${toSlug(data.typeName)}`);
              dispatch(setStudentType(data.typeName));
            }}
            className="w-full flex items-center gap-2 cursor-pointer   !text-sm !font-inter !text-[#030213] !font-medium"
          >
            <BookOpen size={16} className="text-[#030213] " />
            Manage Content
          </CommonHeader>
          <span
            onClick={() => handleDelete(data._id)}
            className=" cursor-pointer "
          >
            {isDeleting ? (
              <ButtonWithLoading
                title="Deleting..."
                textColor="!text-red-500"
                borderColor="!border-red-500"
              />
            ) : (
              <RiDeleteBinLine
                size={20}
                className="text-[#030213] hover:text-red-600 transition-colors duration-200"
              />
            )}
          </span>
        </div>
      </div>
    )
  );
};

export default StudentTypeCard;
