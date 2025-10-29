import React from "react";
import { Button } from "@/components/ui/button";

interface ViewAllButtonProps {
  isActive: boolean;
  onClick: () => void;
  label?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  isActive,
  onClick,
  label = "View All",
  activeColor = "#78716C",
  inactiveColor = "#1D4ED8",
}) => {
  return (
    <Button
      onClick={onClick}
      variant="link"
      className={`p-0 text-sm sm:text-base hover:underline cursor-pointer`}
      style={{
        color: isActive ? activeColor : inactiveColor,
      }}
    >
      {label}
    </Button>
  );
};

export default ViewAllButton;
