// import DashboardHeading from "@/components/reusable/DashboardHeading";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowLeft, Atom } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function CreateStudyPlan() {

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const handleSubmit = (modalData: any) => {
//         const combinedData = {
//             // files,
//             // note,
//             ...modalData, // modal fields (quizName, subject, difficulty, etc.)
//         }

//         console.log("Final Payload:", combinedData)

//         // ✅ Call API here
//         // await fetch("/api/generate-quiz", { method: "POST", body: JSON.stringify(combinedData) })
//     }

//     return (
//         <div>
//             <div className="">
//                 <div className="flex items-center gap-3">
//                     <Link to={'/dashboard/smart-study'} className="mb-7">
//                         <ArrowLeft /></Link>
//                     <DashboardHeading
//                         title="Create New Study Plan"
//                         titleSize="text-xl"
//                         description="Your roadmap to organized and effective studying"
//                         className="mt-12 mb-12 space-y-1"
//                     />
//                 </div>
//             </div>

//             <div>
//                 <form
//                     onSubmit={(e) => {
//                         e.preventDefault()
//                         // setOpenModal(true) // open modal on "Generate Quiz"
//                     }}
//                     className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6"
//                 >
//                     <div className="p-6 border rounded-xl border-black/10 bg-white">
//                         <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
//                             Exam Information
//                         </h3>
//                         <p className="text-sm text-gray-500 mb-4">
//                             Set up your exam details and timeline
//                         </p>

//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
//                             <div className="grid gap-2">
//                                 <Label>Exam Name</Label>
//                                 <Input
//                                     // value={quizName}
//                                     // onChange={(e) => setQuizName(e.target.value)}
//                                     placeholder="e.g., Gastroenterology & Hepatology Block Exam"
//                                 />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label>Daily Study Time (hours)</Label>
//                                 <Input
//                                     // value={subject}
//                                     // onChange={(e) => setSubject(e.target.value)}
//                                     placeholder="e.g., 3 hours"
//                                 />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label>Exam Date</Label>
//                                 <Input
//                                     type="date"
//                                     // value={subject}
//                                     // onChange={(e) => setSubject(e.target.value)}
//                                     placeholder="e.g., 3 hours"
//                                 />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label>Exam Type</Label>
//                                 <Select
//                                 // value={difficulty} onValueChange={setDifficulty}
//                                 >
//                                     <SelectTrigger className="w-full">
//                                         <SelectValue placeholder="Block Exam/ABC Exam/... Exam" />
//                                     </SelectTrigger>
//                                     <SelectContent className="w-full">
//                                         <SelectItem value="basic">Block Exam</SelectItem>
//                                         <SelectItem value="clinical">Clinical</SelectItem>
//                                         <SelectItem value="advanced">Advanced</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>

//                         </div>
//                     </div>

//                     {/* Right side */}
//                     <div className="p-6 border rounded-xl border-black/10 flex flex-col justify-between gap-4 bg-white">
//                         <h3 className="text-lg font-semibold">Topics to Cover</h3>
//                         <p className="text-sm text-gray-500">
//                             Select the topics you need to study for this exam
//                         </p>

//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
//                             <div className="grid gap-2">
//                                 <Label>Subject</Label>
//                                 <Input
//                                     // value={quizName}
//                                     // onChange={(e) => setQuizName(e.target.value)}
//                                     placeholder="Anatomy"
//                                 />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label>System</Label>
//                                 <Input
//                                     // value={subject}
//                                     // onChange={(e) => setSubject(e.target.value)}
//                                     placeholder="Cardiovesculer"
//                                 />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label>Topic</Label>
//                                 <Input
//                                     // value={subject}
//                                     // onChange={(e) => setSubject(e.target.value)}
//                                     placeholder="Hypertension"
//                                 />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label>Sub-Topic</Label>
//                                 <Input
//                                     // value={subject}
//                                     // onChange={(e) => setSubject(e.target.value)}
//                                     placeholder="Risk Factors"
//                                 />
//                             </div>
//                         </div>

//                         {/* Buttons */}
//                         <button
//                             onClick={handleSubmit}
//                             type="submit"
//                             className="w-full flex justify-center gap-4 bg-blue-main text-white py-2 rounded-lg hover:bg-blue-main/70  cursor-pointer"
//                         >
//                             <Atom />
//                             Generate Study Plan
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Atom } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateStudyPlanMutation } from "@/store/features/studyPlan/studyPlan.api";
import { useGetMCQBankTreeQuery } from "@/store/features/MCQBank/MCQBank.api";
import { toast } from "sonner";

// Types for hierarchy
interface Topic {
  topicName: string;
  subTopics: string[];
}

interface System {
  name: string;
  topics: Topic[];
}

interface SubjectTree {
  _id: string;
  subjectName: string;
  systems: System[];
}

export default function CreateStudyPlan() {
  const navigate = useNavigate();
  const [createStudyPlan, { isLoading }] = useCreateStudyPlanMutation();
  const { data: treeData } = useGetMCQBankTreeQuery({});
  const subjects: SubjectTree[] = treeData?.data || [];

  const [examName, setExamName] = useState("");
  const [dailyTime, setDailyTime] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examType, setExamType] = useState("");

  const [subject, setSubject] = useState("");
  const [system, setSystem] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const clearError = (field: string) => {
    setErrors((prev) => prev.filter((item) => item !== field));
  };

  // Derived lists
  const selectedSubjectObj = subjects.find((s) => s.subjectName === subject);
  const systemList = selectedSubjectObj?.systems || [];
  const selectedSystemObj = systemList.find((sys) => sys.name === system);
  const topicList = selectedSystemObj?.topics || [];
  const selectedTopicObj = topicList.find((t) => t.topicName === topic);
  const subTopicList = selectedTopicObj?.subTopics || [];

  // Reset dependents
  useEffect(() => {
    setSystem("");
    setTopic("");
    setSubTopic("");
    if (subject) clearError("subject");
  }, [subject]);

  useEffect(() => {
    setTopic("");
    setSubTopic("");
  }, [system]);

  useEffect(() => {
    setSubTopic("");
  }, [topic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = [];
    if (!examName) newErrors.push("examName");
    if (!dailyTime) newErrors.push("dailyTime");
    if (!examDate) newErrors.push("examDate");
    if (!examType) newErrors.push("examType");
    if (!subject) newErrors.push("subject");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      exam_name: examName,
      exam_date: examDate,
      daily_study_time: Number(dailyTime),
      exam_type: examType,
      topics: [
        {
          subject,
          system,
          topic,
          subtopic: subTopic,
        },
      ],
    };

    try {
      const response: any = await createStudyPlan(payload).unwrap();
      const planId = response?.data?._id || response?._id;

      if (planId) {
        toast.success("Study plan created successfully!");
        navigate(`/dashboard/weekly-plan/${planId}`);
      } else {
        toast.error("Failed to retrieve study plan ID");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      toast.error("Failed to create study plan");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <Link to={"/dashboard/smart-study"} className="mb-7">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Create New Study Plan"
          titleSize="text-xl"
          description="Your roadmap to organized and effective studying"
          className="mt-12 mb-12 space-y-1"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6"
      >
        {/* Left Side: Exam Information */}
        <div className="p-6 border rounded-xl border-black/10 bg-white">
          <h3 className="text-lg font-semibold mb-2">Exam Information</h3>
          <p className="text-sm text-gray-500 mb-4">
            Set up your exam details and timeline
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            <div className="grid gap-2 col-span-1 lg:col-span-2">
              <Label className={errors.includes("examName") ? "text-red-500" : ""}>
                Exam Name
              </Label>
              <Input
                value={examName}
                onChange={(e) => {
                  setExamName(e.target.value);
                  clearError("examName");
                }}
                placeholder="e.g., Gastroenterology & Hepatology Block Exam"
                className={`transition-all duration-300 ${
                  errors.includes("examName")
                    ? "border-red-500 bg-red-50 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>

            <div className="grid gap-2">
              <Label className={errors.includes("dailyTime") ? "text-red-500" : ""}>
                Daily Study Time (hours)
              </Label>
              <Input
                type="number"
                min="0"
                value={dailyTime}
                onChange={(e) => {
                  setDailyTime(e.target.value);
                  clearError("dailyTime");
                }}
                placeholder="e.g., 3"
                className={`transition-all duration-300 ${
                  errors.includes("dailyTime")
                    ? "border-red-500 bg-red-50 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>

            <div className="grid gap-2">
              <Label className={errors.includes("examDate") ? "text-red-500" : ""}>
                Exam Date
              </Label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => {
                  setExamDate(e.target.value);
                  clearError("examDate");
                }}
                className={`transition-all duration-300 ${
                  errors.includes("examDate")
                    ? "border-red-500 bg-red-50 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>

            <div className="grid gap-2 col-span-1 lg:col-span-2">
              <Label className={errors.includes("examType") ? "text-red-500" : ""}>
                Exam Type
              </Label>
              <Select
                value={examType}
                onValueChange={(val) => {
                  setExamType(val);
                  clearError("examType");
                }}
              >
                <SelectTrigger
                  className={`transition-all duration-300 ${
                    errors.includes("examType")
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select Exam Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="block">Block Exam</SelectItem>
                  <SelectItem value="clinical">Clinical</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Right Side: Topics Selection */}
        <div className="p-6 border rounded-xl border-black/10 bg-white flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Topics to Cover</h3>
          <p className="text-sm text-gray-500">
            Select the topics you need to study for this exam
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            {/* Subject Dropdown */}
            <div className="grid gap-2">
              <Label className={errors.includes("subject") ? "text-red-500" : ""}>
                Subject
              </Label>
              <Select
                value={subject}
                onValueChange={(val) => {
                  setSubject(val);
                  clearError("subject");
                }}
              >
                <SelectTrigger
                  className={`transition-all duration-300 ${
                    errors.includes("subject")
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.length > 0 ? (
                    subjects.map((sub) => (
                      <SelectItem key={sub._id} value={sub.subjectName}>
                        {sub.subjectName}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No Subjects found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* System Dropdown */}
            <div className="grid gap-2">
              <Label>System</Label>
              <Select
                value={system}
                onValueChange={setSystem}
                disabled={!subject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select System" />
                </SelectTrigger>
                <SelectContent>
                  {systemList.length > 0 ? (
                    systemList.map((sys) => (
                      <SelectItem key={sys.name} value={sys.name}>
                        {sys.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No Systems found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Topic Dropdown */}
            <div className="grid gap-2">
              <Label>Topic</Label>
              <Select value={topic} onValueChange={setTopic} disabled={!system}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  {topicList.length > 0 ? (
                    topicList.map((t) => (
                      <SelectItem key={t.topicName} value={t.topicName}>
                        {t.topicName}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No Topics found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Sub-Topic Dropdown */}
            <div className="grid gap-2">
              <Label>Sub-Topic</Label>
              <Select
                value={subTopic}
                onValueChange={setSubTopic}
                disabled={!topic}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sub-Topic" />
                </SelectTrigger>
                <SelectContent>
                  {subTopicList.length > 0 ? (
                    subTopicList.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No Sub-Topics found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center gap-4 bg-blue-main text-white py-2 rounded-lg hover:bg-blue-main/70 cursor-pointer mt-auto"
          >
            <Atom className={isLoading ? "animate-spin" : ""} />
            {isLoading ? "Generating..." : "Generate Study Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
