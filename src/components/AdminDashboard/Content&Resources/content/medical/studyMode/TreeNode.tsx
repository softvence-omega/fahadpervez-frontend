import TreeTableAction from "@/common/TreeTableAction";
import { useUpdateStudyModeTreeMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { PostStudyModeTree } from "@/store/features/adminDashboard/ContentResources/MCQ/types/tree";
import { ChevronRight, FileText } from "lucide-react";
import { useState } from "react";
import { SelectedNode } from "./StudyMode";
import UpdateTreeTableAction from "./UpdateTreeTableAction";

type TOCItem = {
  _id?: string;
  title: string;
  count?: number;
  children?: TOCItem[];
};

const TreeNode = ({
  item,
  depth,
  onSelect,
  parentNames,
  updateStudyModeTree,
  isUpdating,
}: {
  item: TOCItem;
  depth: number;
  onSelect: (value: SelectedNode) => void;
  parentNames: { subject?: string; system?: string; topic?: string };
  updateStudyModeTree: ReturnType<typeof useUpdateStudyModeTreeMutation>[0];
  isUpdating?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "add" | "rename" | "delete" | null
  >(null);

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    setOpen(!open);
    // Update selected node
    if (depth === 0)
      onSelect({ subject: item.title, system: "", topic: "", subtopic: "" });
    if (depth === 1)
      onSelect({
        subject: parentNames.subject || "",
        system: item.title,
        topic: "",
        subtopic: "",
      });
    if (depth === 2)
      onSelect({
        subject: parentNames.subject || "",
        system: parentNames.system || "",
        topic: item.title,
        subtopic: "",
      });
    if (depth === 3)
      onSelect({
        subject: parentNames.subject || "",
        system: parentNames.system || "",
        topic: parentNames.topic || "",
        subtopic: item.title,
      });
  };

  const handleActionClick = (action: "add" | "rename" | "delete") => {
    setSelectedAction(action);
    setModalOpen(true); // open modal
  };

  const handleModalConfirm = async (newTitle?: string) => {
    if (!selectedAction || !item._id) return;

    const payload = {
      data: {
        action: selectedAction,
        title: newTitle || item.title,
      } as Partial<PostStudyModeTree>,
      treeId: item._id,
    };

    await updateStudyModeTree(payload as any);
    setModalOpen(false);
  };

  return (
    <div className="ml-[2px] font-arial">
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
          <TreeTableAction depth={depth} onAction={handleActionClick} />
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
                subject: depth === 0 ? item.title : parentNames.subject || "",
                system: depth === 1 ? item.title : parentNames.system,
                topic: depth === 2 ? item.title : parentNames.topic,
              }}
              updateStudyModeTree={updateStudyModeTree}
            />
          ))}
        </div>
      )}

      {modalOpen && selectedAction && (
        <UpdateTreeTableAction
          action={selectedAction}
          currentTitle={item.title}
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default TreeNode;
