import React from "react";
import PrimaryButton from "./PrimaryButton";
import { ArrowRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

type ResourceCardProps = {
  title: string;
  description: string;
  categories: string[];
  downloads: string;
  buttonText: string;
  buttonLink: string;
  featured?: boolean;
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  categories,
  downloads,
  buttonText,
  buttonLink,
  featured = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-black/10">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#FFE2E2]">
            <FiFileText className=" w-4 h-4 text-[#E7000B]" />
          </div>
          {featured && (
            <span className="text-sm text-[#193CB8] font-semibold bg-[#DBEAFE] py-1 px-2 rounded-md">
              Featured
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg font-medium  text-gray-800 line-clamp-1">{title}</h3>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="text-xs font-semibold bg-white text-gray-700 rounded-md px-3 py-1 border border-slate-300"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="mt-3 text-sm text-[#4A5565] flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>{downloads} downloads</span>
        </div>
        <PrimaryButton
          className="bg-black w-full mt-4 flex gap-2"
          onClick={() => navigate(`${buttonLink}`)}
          icon={<ArrowRight />}
          iconPosition="left"
        >
          {buttonText}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ResourceCard;
