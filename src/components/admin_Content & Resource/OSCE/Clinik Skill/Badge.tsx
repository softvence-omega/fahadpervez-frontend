import React, { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "orange" | "red" | "blue";
}

const Badge: React.FC<BadgeProps> = ({ children, color = "orange" }) => {
  const colors: Record<"orange" | "red" | "blue", string> = {
    orange: "bg-orange-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <span
      className={`${colors[color]} text-white px-3 py-1 rounded text-sm font-medium inline-block mb-3`}
    >
      {children}
    </span>
  );
};

export default Badge;
