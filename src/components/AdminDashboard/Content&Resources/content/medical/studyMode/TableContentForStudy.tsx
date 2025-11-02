import preview from "@/assets/dashboard/tablePreview.svg";
import CommonHeader from "@/common/header/CommonHeader";
import { ChevronRight, FileText, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
type TOCItem = {
  title: string;
  count?: number;
  children?: TOCItem[];
};

const tocData: TOCItem[] = [
  {
    title: "Anatomy",
    count: 7,
    children: [
      {
        title: "Nervous",
        count: 7,
        children: [
          {
            title: "Brain",
            count: 6,
            children: [{ title: "Cerebrum", count: 6 }],
          },
        ],
      },
    ],
  },
  {
    title: "Physiology",
    count: 1,
  },
];

function TreeNode({ item, depth }: { item: TOCItem; depth: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="ml-[2px] font-arial">
      <div
        className={`flex items-center justify-between py-1.5 cursor-pointer rounded-md hover:bg-gray-50 ${
          depth > 0 ? "ml-4" : ""
        }`}
      >
        <div className="flex items-center gap-1.5">
          {hasChildren ? (
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  open ? "rotate-90" : ""
                }`}
              />
            </button>
          ) : (
            <span className="w-4" />
          )}
          <FileText className="w-4 h-4 text-gray-500" />
          <span
            className={`text-sm ${
              depth >= 2 ? "text-gray-500" : "text-gray-800 font-medium"
            }`}
          >
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {item.count !== undefined && (
            <span className="text-xs bg-gray-100 text-gray-600 rounded-md px-2 py-[1px]">
              {item.count}
            </span>
          )}
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {open && hasChildren && (
        <div className="ml-4 border-l border-gray-200 pl-2">
          {item.children!.map((child, idx) => (
            <TreeNode key={idx} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface TableContentProps {
  iconAction: () => void;
}
const TableContentForStudy: React.FC<TableContentProps> = ({ iconAction }) => {
  return (
    <div className="w-79 bg-white rounded-2xl shadow p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={preview} className="w-5 h-5" alt="alt" />
          <CommonHeader className="text-[#0A0A0A] !font-arial">
            Table of Contents
          </CommonHeader>
        </div>
        <button
          onClick={iconAction}
          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tree View */}
      <div className="space-y-1">
        {tocData.map((item, idx) => (
          <TreeNode key={idx} item={item} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default TableContentForStudy;
