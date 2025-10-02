import React, { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  bgColor?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, bgColor = "bg-white" }) => (
  <div className={`${bgColor} rounded-lg p-6 shadow-sm mb-6`}>
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    {children}
  </div>
);

export default Section;
