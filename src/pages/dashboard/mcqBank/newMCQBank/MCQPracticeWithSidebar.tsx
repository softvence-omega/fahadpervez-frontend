// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMemo, useState } from "react";
// import { MCQBankSidebar } from "./MCQBankSidebar";
// import { Menu, Plus } from "lucide-react";
// import QuizReportModal from "../../quizGenerator/QuizReportModal";
// import MCQCard from "./MCQCard";
// import {
//   Breadcrumb,
//   DEMO_MCQ_DATA,
//   DifficultyFilter,
//   ExpandedNodes,
//   FilterControls,
//   findBreadcrumbPath,
//   getReadStatusFromStorage,
//   ReadStatus,
//   saveReadStatusToStorage,
//   SelectedAnswers,
//   ShowAnswers,
//   SortOption,
//   TreeNode,
// } from "@/components/Test";
// import { useGetMCQBankTreeQuery } from "@/store/features/MCQBank/MCQBank.api";

// // Helper: map backend data into frontend tree format
// const mapBackendToTreeData = (backendData: any[]): TreeNode[] => {
//   return backendData.map((subject) => ({
//     id: subject._id,
//     name: subject.subjectName,
//     type: "subject",
//     children: subject.systems?.map((system: any) => ({
//       id: `${subject._id}-${system.name}`,
//       name: system.name,
//       type: "system",
//       // add `topic` level inside each system
//       children: system.topics?.map((topic: any) => ({
//         id: `${subject._id}-${system.name}-${topic.topicName}`,
//         name: topic.topicName,
//         type: "topic",
//         children: topic.subTopics?.map((sub: string) => ({
//           id: `${subject._id}-${system.name}-${topic.topicName}-${sub}`,
//           name: sub,
//           type: "subtopic",
//         })),
//       })),
//     })),
//   }));
// };

// const MCQPracticeWithSidebar: React.FC = () => {
//   // State
//   const [selectedSubtopic, setSelectedSubtopic] = useState(null);
//   const { data: mcqData, isLoading: mcqLoading } = useGetMcqBySubtopicQuery(
//     selectedSubtopic,
//     {
//       skip: !selectedSubtopic, // only fetch when user selects
//     }
//   );
//   const { data, isLoading, isError } = useGetMCQBankTreeQuery({});
//   console.log("MCQ Bank Tree Data:", data?.data);

//   const handleSubtopicClick = (subject, system, topic, subtopic) => {
//     setSelectedSubtopic({ subject, system, topic, subtopic });
//   };

//   // === Derived Tree Data ===
//   const treeData = useMemo(() => {
//     if (!data?.data) return [];
//     return mapBackendToTreeData(data.data);
//   }, [data]);

//   const [selectedMcqBankId, setSelectedMcqBankId] =
//     useState<string>("mcq-bank-1");
//   const [breadcrumb, setBreadcrumb] = useState<string[]>([
//     // "Anatomy",
//     // "Cardiovascular System",
//     // "Heart",
//   ]);
//   const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({
//     anatomy: true,
//     cardiovascular: true,
//   });
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [difficultyFilter, setDifficultyFilter] =
//     useState<DifficultyFilter>("All");
//   const [sortBy, setSortBy] = useState<SortOption>("Newest First");

//   const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
//   const [showAnswers, setShowAnswers] = useState<ShowAnswers>({});
//   const [readStatus, setReadStatus] = useState<ReadStatus>(
//     getReadStatusFromStorage()
//   );

//   // const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
//   // const [reportMcqId, setReportMcqId] = useState<string>("");

//   // Handlers
//   const handleToggleExpand = (nodeId: string) => {
//     setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
//   };

//   const handleSelectMcqBank = (id: string) => {
//     setSelectedMcqBankId(id);
//     setSidebarOpen(false); // Close sidebar on mobile after selection

//     // const path = findBreadcrumbPath(DEMO_TREE_DATA, id);
//     const path = findBreadcrumbPath(treeData, id);
//     if (path) setBreadcrumb(path);
//   };

//   const handleSelectAnswer = (mcqId: string, optionIndex: number) => {
//     setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
//   };

//   const handleToggleAnswer = (mcqId: string) => {
//     const newShowAnswers = { ...showAnswers, [mcqId]: !showAnswers[mcqId] };
//     setShowAnswers(newShowAnswers);

//     if (newShowAnswers[mcqId]) {
//       const newReadStatus = { ...readStatus, [mcqId]: true };
//       setReadStatus(newReadStatus);
//       saveReadStatusToStorage(newReadStatus);
//     }
//   };

//   const handleReport = (mcqId: string) => {
//     setReportMcqId(mcqId);
//     setReportModalOpen(true);
//   };

//   // Get and filter questions
//   const currentMcqData =
//     DEMO_MCQ_DATA[selectedMcqBankId] || DEMO_MCQ_DATA["mcq-bank-1"];
//   let filteredQuestions = currentMcqData.mcqs || [];

//   if (searchQuery) {
//     filteredQuestions = filteredQuestions.filter((q) =>
//       q.question.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   if (difficultyFilter !== "All") {
//     filteredQuestions = filteredQuestions.filter(
//       (q) => q.difficulty === difficultyFilter
//     );
//   }

//   if (sortBy === "Newest First") {
//     filteredQuestions = [...filteredQuestions].reverse();
//   }

//   const totalQuestions = filteredQuestions.length;
//   const unreadCount = filteredQuestions.filter(
//     (q) => !readStatus[q.mcqId]
//   ).length;

//   // === Loading/Error states ===
//   if (isLoading) return <p>Loading MCQ Tree...</p>;
//   if (isError) return <p>Failed to load MCQ Tree</p>;

//   return (
//     <div className="flex h-screen bg-slate-50">
//       {/* Sidebar */}
//       <MCQBankSidebar
//         treeData={treeData}
//         selectedId={selectedMcqBankId}
//         expandedNodes={expandedNodes}
//         isOpen={sidebarOpen}
//         onSelect={handleSelectMcqBank}
//         onToggleExpand={handleToggleExpand}
//         onClose={() => setSidebarOpen(false)}
//       />
//       {/* <Sidebar
//         treeData={DEMO_TREE_DATA}
//         selectedId={selectedMcqBankId}
//         expandedNodes={expandedNodes}
//         isOpen={sidebarOpen}
//         onSelect={handleSelectMcqBank}
//         onToggleExpand={handleToggleExpand}
//         onClose={() => setSidebarOpen(false)}
//       /> */}

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4 lg:p-6 space-y-6">
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
//           >
//             <Menu size={20} />
//             <span>Menu</span>
//           </button>

//           {/* Header */}
//           <div className="flex flex-col lg:flex-row justify-between flex-wrap items-start lg:items-center gap-4">
//             <div className="flex items-center justify-between flex-wrap w-full">
//               {/* Breadcrumb */}
//               <div>
//                 <p className="text-[#717182] font-normal">Current Location</p>
//                 <Breadcrumb items={breadcrumb} />
//               </div>
//               <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 flex-wrap">
//                 <span className="flex items-center gap-1 text-[#717182]">
//                   Total Questions{" "}
//                   <span className="text-lg text-[#0A0A0A] font-normal">
//                     {totalQuestions}{" "}
//                   </span>
//                 </span>
//                 <span className="flex items-center gap-1">
//                   Unread{" "}
//                   <span className="text-lg text-[#0A0A0A] font-normal">
//                     {unreadCount}{" "}
//                   </span>
//                 </span>
//                 {/* <span>Uploaded By: {currentMcqData.uploadedBy}</span> */}
//               </div>
//             </div>

//             <div className="w-full flex justify-end">
//               <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full lg:w-auto">
//                 <Plus size={20} />
//                 Create Quiz
//               </button>
//             </div>
//           </div>

//           {/* Filters */}
//           <FilterControls
//             searchQuery={searchQuery}
//             difficultyFilter={difficultyFilter}
//             sortBy={sortBy}
//             onSearchChange={setSearchQuery}
//             onDifficultyChange={setDifficultyFilter}
//             onSortChange={setSortBy}
//           />

//           {/* Questions */}
//           {filteredQuestions.length === 0 ? (
//             <div className="text-center py-12 text-slate-500">
//               No questions found matching your filters.
//             </div>
//           ) : (
//             filteredQuestions.map((q, idx) => (
//               <MCQCard
//                 key={q.mcqId}
//                 question={q}
//                 questionNumber={idx + 1}
//                 totalQuestions={totalQuestions}
//                 subtopic={currentMcqData.subtopic}
//                 isRead={readStatus[q.mcqId] || false}
//                 selectedIndex={selectedAnswers[q.mcqId]}
//                 showAnswer={showAnswers[q.mcqId] || false}
//                 onSelectAnswer={(optionIndex) =>
//                   handleSelectAnswer(q.mcqId, optionIndex)
//                 }
//                 onToggleAnswer={() => handleToggleAnswer(q.mcqId)}
//                 onReport={() => handleReport(q.mcqId)}
//               />
//             ))
//           )}
//         </div>
//       </div>

//       {/* Report Modal */}
//       {/* <ReportModal
//         isOpen={reportModalOpen}
//         mcqId={reportMcqId}
//         onClose={() => setReportModalOpen(false)}
//       /> */}
//       <QuizReportModal
//       // open={openReportModal}
//       // setOpen={setOpenReportModal}
//       // mcqId={mcqId}
//       // questionBankId={mcqData._id}
//       />
//     </div>
//   );
// };

// export default MCQPracticeWithSidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { MCQBankSidebar } from "./MCQBankSidebar";
import { Menu } from "lucide-react";
// import QuizReportModal from "../../quizGenerator/QuizReportModal";
import MCQCard from "./MCQCard";
import {
  Breadcrumb,
  DifficultyFilter,
  ExpandedNodes,
  FilterControls,
  findBreadcrumbPath,
  getReadStatusFromStorage,
  ReadStatus,
  saveReadStatusToStorage,
  SelectedAnswers,
  ShowAnswers,
  SortOption,
  TreeNode,
} from "@/components/Test";
import { useGetMCQBankTreeQuery } from "@/store/features/MCQBank/MCQBank.api";
import { useGetMcqBySubtopicQuery } from "@/store/features/MCQBank/MCQBank.api";
import Pagination from "@/components/AdminDashboard/Content & Resource_Component/Pagination";
import QuizReportModal from "../../quizGenerator/QuizReportModal";

// Helper: map backend data into frontend tree format
const mapBackendToTreeData = (backendData: any[]): TreeNode[] => {
  return backendData.map((subject) => ({
    id: subject._id,
    name: subject.subjectName,
    type: "subject",
    children: subject.systems?.map((system: any) => ({
      id: `${subject._id}-${system.name}`,
      name: system.name,
      type: "system",
      children: system.topics?.map((topic: any) => ({
        id: `${subject._id}-${system.name}-${topic.topicName}`,
        name: topic.topicName,
        type: "topic",
        children: topic.subTopics?.map((sub: string) => ({
          id: `${subject._id}-${system.name}-${topic.topicName}-${sub}`,
          name: sub,
          type: "subtopic",
        })),
      })),
    })),
  }));
};

const MCQPracticeWithSidebar: React.FC = () => {
  // --- Sidebar Tree ---
  const { data, isLoading, isError } = useGetMCQBankTreeQuery({});
  const treeData = useMemo(() => {
    if (!data?.data) return [];
    return mapBackendToTreeData(data.data);
  }, [data]);

  const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({});
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [openReportModal, setOpenReportModal] = useState(false);

  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // --- Selected Subtopic & MCQs ---
  const [selectedSubtopic, setSelectedSubtopic] = useState<{
    subject: string;
    system: string;
    topic: string;
    subtopic: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: mcqData, isLoading: mcqLoading } = useGetMcqBySubtopicQuery(
    selectedSubtopic
      ? {
          ...selectedSubtopic, // subject, system, topic, subtopic
          page: currentPage,
          limit,
        }
      : undefined,
    { skip: !selectedSubtopic }
  );
  console.log(mcqData);

  const meta = mcqData?.meta;
  // const questions = mcqData?.mcqs || [];

  const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

  const handleSubtopicClick = (
    subject: string,
    system: string,
    topic: string,
    subtopic: string,
    id: string
  ) => {
    setSelectedSubtopic({ subject, system, topic, subtopic });
    setBreadcrumb([subject, system, topic, subtopic]);
    setSidebarOpen(false);
    console.log(id);
  };

  // --- MCQ State ---
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [showAnswers, setShowAnswers] = useState<ShowAnswers>({});
  const [readStatus, setReadStatus] = useState<ReadStatus>(
    getReadStatusFromStorage()
  );

  const handleSelectAnswer = (mcqId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
  };

  const handleToggleAnswer = (mcqId: string) => {
    const newShowAnswers = { ...showAnswers, [mcqId]: !showAnswers[mcqId] };
    setShowAnswers(newShowAnswers);

    if (newShowAnswers[mcqId]) {
      const newReadStatus = { ...readStatus, [mcqId]: true };
      setReadStatus(newReadStatus);
      saveReadStatusToStorage(newReadStatus);
    }
  };

  const handleReport = (mcqId: string) => {
    console.log("Report MCQ:", mcqId);
    setOpenReportModal(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- Filters ---
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Newest First");

  // --- Filter MCQs ---
  let filteredQuestions = mcqData?.data || [];

  if (searchQuery) {
    filteredQuestions = filteredQuestions.filter((q: any) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (difficultyFilter !== "All") {
    filteredQuestions = filteredQuestions.filter(
      (q: any) => q.difficulty === difficultyFilter
    );
  }

  if (sortBy === "Newest First") {
    filteredQuestions = [...filteredQuestions].reverse();
  }

  const totalQuestions = filteredQuestions.length;
  // const unreadCount = filteredQuestions.filter(
  //   (q) => !readStatus[q.mcqId]
  // ).length;

  // --- Loading/Error states ---
  if (isLoading) return <p>Loading MCQ Tree...</p>;
  if (isError) return <p>Failed to load MCQ Tree</p>;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <MCQBankSidebar
        treeData={treeData}
        selectedId={
          selectedSubtopic
            ? `${selectedSubtopic.subject}-${selectedSubtopic.system}-${selectedSubtopic.topic}-${selectedSubtopic.subtopic}`
            : ""
        }
        expandedNodes={expandedNodes}
        isOpen={sidebarOpen}
        onSelect={(id) => {
          // Find node in tree to get full path
          const path = findBreadcrumbPath(treeData, id);
          if (!path) return;
          // Last 4 levels: subject -> system -> topic -> subtopic
          if (path.length === 4) {
            handleSubtopicClick(path[0], path[1], path[2], path[3], id);
          }
        }}
        onToggleExpand={handleToggleExpand}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <Menu size={20} />
            <span>Menu</span>
          </button>

          {/* Breadcrumb */}
          <div className="mb-4">
            <p className="text-[#717182] font-normal">Current Location</p>
            <Breadcrumb items={breadcrumb} />
          </div>

          {/* Filters */}
          <FilterControls
            searchQuery={searchQuery}
            difficultyFilter={difficultyFilter}
            sortBy={sortBy}
            onSearchChange={setSearchQuery}
            onDifficultyChange={setDifficultyFilter}
            onSortChange={setSortBy}
          />

          {/* Questions */}
          {mcqLoading ? (
            <p>Loading MCQs...</p>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No questions found matching your filters.
            </div>
          ) : (
            filteredQuestions.map((q: any, idx: number) => (
              <MCQCard
                key={q.mcqId}
                question={q}
                questionNumber={idx + 1}
                totalQuestions={totalQuestions}
                subtopic={selectedSubtopic?.subtopic || ""}
                isRead={readStatus[q.mcqId] || false}
                selectedIndex={selectedAnswers[q.mcqId]}
                showAnswer={showAnswers[q.mcqId] || false}
                onSelectAnswer={(optionIndex) =>
                  handleSelectAnswer(q.mcqId, optionIndex)
                }
                onToggleAnswer={() => handleToggleAnswer(q.mcqId)}
                onReport={() => handleReport(q.mcqId)}
              />
            ))
          )}
          {/* Pagination */}
          <div className="mt-16 mb-32 flex justify-center space-x-5 ">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <QuizReportModal
        open={openReportModal}
        setOpen={setOpenReportModal}
        mcqId={"mcqId"}
        questionBankId={mcqData?._id}
      />
    </div>
  );
};

export default MCQPracticeWithSidebar;
