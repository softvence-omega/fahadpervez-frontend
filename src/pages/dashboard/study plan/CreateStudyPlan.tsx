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

import { useState } from "react";
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
import { Link } from "react-router-dom";
import { useCreateStudyPlanMutation } from "@/store/features/studyPlan/studyPlan.api";

export default function CreateStudyPlan() {
  const [createStudyPlan, { isLoading }] = useCreateStudyPlanMutation();

  const [examName, setExamName] = useState("");
  const [dailyTime, setDailyTime] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examType, setExamType] = useState("");

  const [subject, setSubject] = useState("");
  const [system, setSystem] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    console.log("🔥 Final Payload:", payload);

    try {
      const response = await createStudyPlan(payload).unwrap();
      console.log("🔥 Response:", response);
    } catch (error) {
      console.error("❌ API Error:", error);
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
        {/* Left Side */}
        <div className="p-6 border rounded-xl border-black/10 bg-white">
          <h3 className="text-lg font-semibold mb-2">Exam Information</h3>
          <p className="text-sm text-gray-500 mb-4">
            Set up your exam details and timeline
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            <div className="grid gap-2">
              <Label>Exam Name</Label>
              <Input
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., Gastroenterology & Hepatology Block Exam"
              />
            </div>

            <div className="grid gap-2">
              <Label>Daily Study Time (hours)</Label>
              <Input
                type="number"
                min="0"
                value={dailyTime}
                onChange={(e) => setDailyTime(e.target.value)}
                placeholder="e.g., 3 hours"
              />
            </div>

            <div className="grid gap-2">
              <Label>Exam Date</Label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Block Exam / ABC Exam..." />
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

        {/* Right Side */}
        <div className="p-6 border rounded-xl border-black/10 bg-white flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Topics to Cover</h3>
          <p className="text-sm text-gray-500">
            Select the topics you need to study for this exam
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            <div className="grid gap-2">
              <Label>Subject</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Anatomy"
              />
            </div>

            <div className="grid gap-2">
              <Label>System</Label>
              <Input
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                placeholder="Cardiovascular"
              />
            </div>

            <div className="grid gap-2">
              <Label>Topic</Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Hypertension"
              />
            </div>

            <div className="grid gap-2">
              <Label>Sub-Topic</Label>
              <Input
                value={subTopic}
                onChange={(e) => setSubTopic(e.target.value)}
                placeholder="Risk Factors"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center gap-4 bg-blue-main text-white py-2 rounded-lg hover:bg-blue-main/70 cursor-pointer"
          >
            <Atom className={isLoading ? "animate-spin" : ""} />
            {/* Generate Study Plan */}{" "}
            {isLoading ? "Generating..." : "Generate Study Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
