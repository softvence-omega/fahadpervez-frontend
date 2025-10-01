import React, { type ReactNode } from "react";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 sm:px-6 py-2 border border-border rounded-md font-medium transition text-[#0F172A]  cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
