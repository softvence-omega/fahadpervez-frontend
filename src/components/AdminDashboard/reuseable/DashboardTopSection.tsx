import CommonHeader from "@/common/header/CommonHeader";
import MediumHeader from "@/common/header/MediumHeader";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const DashboardTopSection = ({
  title,
  description,
  className,
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
    </div>
  );
};
export default DashboardTopSection;
