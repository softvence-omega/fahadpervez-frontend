import preview from "@/assets/dashboard/tablePreview.svg";
import CommonHeader from "@/common/header/CommonHeader";
import { useGetStudyModeTreeQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import { SelectedNode } from "./StudyMode";
import TreeNode from "./TreeNode";

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
  subTopics: SubTopic[];
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
    { refetchOnMountOrArgChange: true }
  );

  const tocDataFromBackend: TOCItem[] = allStudyModeData
    ? mapBackendToTOC(allStudyModeData.data as Subject[])
    : [];

  const treeData = allStudyModeData?.data.map((item) => item.systems) ?? [];

  console.log("treeData", treeData);

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
            treeData={treeData}
          />
        ))}
      </div>
    </div>
  );
};

export default TableContentForStudy;
