import CommonHeader from "@/common/header/CommonHeader";
import { LucideIcon } from "lucide-react";
import { FC } from "react";
import { IconType } from "react-icons/lib";

interface Stat {
  label: string;
  value: string | number;
}

interface CardProps {
  icon: LucideIcon | IconType;
  title: string;
  stats?: Stat[];
  actionLabel?: string;
  actionIcon?: LucideIcon | IconType;
  onActionClick?: () => void;
  className?: string;
}

const ContentCard: FC<CardProps> = ({
  icon: Icon,
  title,
  stats = [],
  actionLabel,
  actionIcon: ActionIcon,
  onActionClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-[14px] p-6 border border-black/10 ${className}`}
    >
      <div className="flex items-center gap-3 ">
        <div className="bg-[#030213]/10 rounded-xl  flex items-center justify-center w-12 h-12">
          <Icon size={24} className="text-[#030213]" />
        </div>
        <CommonHeader className="">{title}</CommonHeader>
      </div>

      <div className="space-y-3 mt-7.5 pb-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <CommonHeader className="!text-sm !text-[#717182]">
              {stat.label}
            </CommonHeader>
            <CommonHeader className="!text-sm !text-[#0A0A0A]">
              {stat.value}
            </CommonHeader>
          </div>
        ))}
      </div>

      {actionLabel && (
        <CommonHeader
          onClick={onActionClick}
          className="w-full flex items-center gap-2 cursor-pointer  border-t border-black/10 pt-3 !text-sm !font-inter !text-[#030213] !font-medium"
        >
          {ActionIcon && <ActionIcon size={16} />}
          <span>{actionLabel}</span>
        </CommonHeader>
      )}
    </div>
  );
};

export default ContentCard;
