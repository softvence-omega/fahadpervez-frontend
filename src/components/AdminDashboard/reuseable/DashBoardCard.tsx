import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FC, ReactNode } from "react";
import Paragraph from "@/common/header/Paragraph";
import MediumHeader from "@/common/header/MediumHeader";
import MiniTitle from "@/common/header/MiniTitle";

interface StatCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  subtitleColor?: string;
  iconColor?: string;
  className?: string;
  children?: ReactNode; // allows completely custom content
}

const DashBoardCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  subtitleColor = "text-green-600",
  iconColor = "text-blue-500",
  className = "",
  children,
}) => {
  return (
    <div className={`bg-white border border-border rounded-xl ${className}`}>
      <div className="p-6">
        {children ? (
          children
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              {title && <Paragraph className="">{title}</Paragraph>}
              {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
            </div>
            <div className="space-y-1">
              {value !== undefined && (
                <MediumHeader className=" !font-bold">{value}</MediumHeader>
              )}
              {subtitle && (
                <MiniTitle className={` ${subtitleColor}`}>
                  {subtitle}
                </MiniTitle>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoardCard;
