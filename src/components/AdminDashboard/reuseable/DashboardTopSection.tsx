import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonHeader from "@/common/header/CommonHeader";
import MediumHeader from "@/common/header/MediumHeader";
import { FaPlus } from "react-icons/fa6";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
  buttonText?: string;
  action?: () => void;
}

const DashboardTopSection = ({
  title,
  description,
  className,
  buttonText,
  action,
}: ManagementHeaderProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-end justify-between  ${className} `}
    >
      <div className="space-y-2 ">
        {title && <MediumHeader>{title}</MediumHeader>}
        {description && (
          <div className="w-full ">
            <CommonHeader className="">{description}</CommonHeader>
          </div>
        )}
      </div>

      {buttonText && (
        <ButtonWithIcon icon={FaPlus} className="">
          <p onClick={action}>{buttonText}</p>
        </ButtonWithIcon>
      )}
    </div>
  );
};
export default DashboardTopSection;
