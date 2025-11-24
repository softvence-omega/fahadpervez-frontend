"use client";

import preview from "@/assets/dashboard/tablePreview.svg";
import CommonHeader from "@/common/header/CommonHeader";
import TableAction from "@/components/reusable/TableAction";
import {
  useDeleteStudyModeTreeMutation,
  useGetStudyModeTreeQuery,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { ChevronRight, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { SelectedNode } from "./StudyMode";

// TOC type
type TOCItem = {
  _id?: string;
  title: string;
  count?: number;
  children?: TOCItem[];
};

// Backend types
interface SubTopic {
  _id?: string;
  subtopicName?: string;
}

interface Topic {
  _id?: string;
  topicName: string;
  subTopics: (string | SubTopic)[];
}

interface System {
  _id?: string;
  name: string;
  topics: Topic[];
}

interface Subject {
  _id: string;
  subjectName: string;
  systems: System[];
  createdAt: string;
  updatedAt: string;
}

// Transform backend response into TOCItem[]
const mapBackendToTOC = (data: Subject[]): TOCItem[] => {
  return data.map((subject) => ({
    _id: subject._id,
    title: subject.subjectName,
    count: subject.systems.reduce(
      (acc, sys) =>
        acc +
        sys.topics.reduce(
          (tAcc, topic) =>
            tAcc + (topic.subTopics ? topic.subTopics.length : 0),
          0
        ),
      0
    ),
    children: subject.systems.map((sys) => ({
      _id: sys._id,
      title: sys.name,
      count: sys.topics.reduce(
        (tAcc, topic) => tAcc + (topic.subTopics ? topic.subTopics.length : 0),
        0
      ),
      children: sys.topics.map((topic) => ({
        _id: topic._id,
        title: topic.topicName,
        count: topic.subTopics ? topic.subTopics.length : 0,
        children: topic.subTopics
          ? topic.subTopics.map((sub) => ({
              _id: typeof sub === "object" ? sub._id : undefined,
              title: typeof sub === "string" ? sub : sub.subtopicName || "",
            }))
          : undefined,
      })),
    })),
  }));
};

// Tree Node Component
function TreeNode({
  item,
  depth,
  onSelect,
  parentNames,
}: {
  item: TOCItem;
  depth: number;
  onSelect: (value: {
    subject: string;
    system: string;
    topic: string;
    subtopic: string;
  }) => void;
  parentNames: {
    subject?: string;
    system?: string;
    topic?: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const [deleteStudyModeTree] = useDeleteStudyModeTreeMutation();

  const handleClick = () => {
    setOpen(!open);

    // update selected node based on depth
    if (depth === 0) {
      onSelect({ subject: item.title, system: "", topic: "", subtopic: "" });
    } else if (depth === 1) {
      onSelect({
        subject: parentNames.subject || "",
        system: item.title,
        topic: "",
        subtopic: "",
      });
    } else if (depth === 2) {
      onSelect({
        subject: parentNames.subject || "",
        system: parentNames.system || "",
        topic: item.title,
        subtopic: "",
      });
    } else if (depth === 3) {
      onSelect({
        subject: parentNames.subject || "",
        system: parentNames.system || "",
        topic: parentNames.topic || "",
        subtopic: item.title,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteStudyModeTree(id);
    }
  };

  return (
    <div className="ml-[2px] font-arial ">
      <div
        className={`flex items-center justify-between py-1.5 cursor-pointer rounded-md hover:bg-gray-50 ${
          depth > 0 ? "ml-4" : ""
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-1.5 cursor-pointer">
          {hasChildren ? (
            <button className="text-gray-500 hover:text-gray-700">
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
          <TableAction
            handleDelete={() => item._id && handleDelete(item._id)}
            handleEdit={() => console.log("Edit id", item._id)}
          />
        </div>
      </div>

      {open && hasChildren && (
        <div className="ml-4 border-l border-gray-200 pl-2">
          {item.children!.map((child, idx) => (
            <TreeNode
              key={idx}
              item={child}
              depth={depth + 1}
              onSelect={onSelect}
              parentNames={{
                subject:
                  depth === 0
                    ? item.title
                    : parentNames.subject || parentNames.system || "",
                system: depth === 1 ? item.title : parentNames.system,
                topic: depth === 2 ? item.title : parentNames.topic,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Table Content Component
interface TableContentProps {
  iconAction: () => void;
  setSelectedNode: React.Dispatch<React.SetStateAction<SelectedNode>>;
}

const TableContentForStudy: React.FC<TableContentProps> = ({
  iconAction,
  setSelectedNode,
}) => {
  const { studentType } = useAppSelector(
    (state: RootState) => state.staticContent
  );
  const { data: allStudyModeData } = useGetStudyModeTreeQuery(
    { studentType },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const tocDataFromBackend: TOCItem[] = allStudyModeData
    ? mapBackendToTOC(allStudyModeData.data as Subject[])
    : [];

  return (
    <div className="w-[400px] min-h-[400px] bg-white rounded-2xl shadow p-4 ">
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

      <div className="space-y-1">
        {tocDataFromBackend.map((item, idx) => (
          <TreeNode
            key={idx}
            item={item}
            depth={0}
            onSelect={setSelectedNode}
            parentNames={{}}
          />
        ))}
      </div>
    </div>
  );
};

export default TableContentForStudy;
