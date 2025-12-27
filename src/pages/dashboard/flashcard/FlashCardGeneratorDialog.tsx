// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function FlashCardGeneratorDialog({ open, setOpen, onFinalSubmit }: any) {
//     const [sessionName, setSessionName] = useState("")
//     const [category, setCategory] = useState("")
//     const [flashCardType, setFlashCardType] = useState("")
//     const [questionCount, setQuestionCount] = useState(20)
//     const [examPrepCategory, setExamPrepCategory] = useState("")

//     const handleSubmit = () => {
//         onFinalSubmit({
//             sessionName,
//             category,
//             flashCardType,
//             questionCount,
//             examPrepCategory,
//         })
//         setOpen(false)
//     }

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="sm:max-w-[450px]">
//                 <DialogHeader>
//                     <DialogTitle>Customize Card</DialogTitle>
//                     <DialogDescription>
//                         Make your flash card in one-click.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="grid grid-cols-1 gap-6 py-4">
//                     <div className="grid gap-2">
//                         <Label>Session Name</Label>
//                         <Input
//                             value={sessionName}
//                             onChange={(e) => setSessionName(e.target.value)}
//                             placeholder="Cardiology Quiz"
//                         />
//                     </div>

//                     <div className="grid gap-2 w-full">
//                         <Label>Flashcard Category</Label>
//                         <Select value={category} onValueChange={setCategory}>
//                             <SelectTrigger className="w-full">
//                                 <SelectValue placeholder="Basic/Clinical/Advanced" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="basic">Basic</SelectItem>
//                                 <SelectItem value="clinical">Clinical</SelectItem>
//                                 <SelectItem value="advanced">Advanced</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="grid gap-2 w-full">
//                         <Label>Flashcard Type</Label>
//                         <Select value={flashCardType} onValueChange={setFlashCardType}>
//                             <SelectTrigger className="w-full">
//                                 <SelectValue placeholder="TypeA/TypeB/TypeC" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="TypeA">Type A</SelectItem>
//                                 <SelectItem value="TypeB">Type B</SelectItem>
//                                 <SelectItem value="TypeC">Type C</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="grid gap-2">
//                         <Label>Max Flashcard (up to 50)</Label>
//                         <Input
//                             type="number"
//                             placeholder="max up to 50 cards"
//                             min={1}
//                             max={50}
//                             value={questionCount}
//                             onChange={(e) => setQuestionCount(Number(e.target.value))}
//                         />
//                         <p className="text-xs text-gray-500">{questionCount} / 50</p>
//                     </div>

//                     <div className="grid gap-2">
//                         <Label>Exam prep category</Label>
//                         <Select value={examPrepCategory} onValueChange={setExamPrepCategory}>
//                             <SelectTrigger className="w-full">
//                                 <SelectValue placeholder="Basic/Clinical/Advanced" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="basic">USMLE</SelectItem>
//                                 <SelectItem value="clinical">Demo</SelectItem>
//                                 <SelectItem value="advanced">Demo</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>

//                 <DialogFooter>
//                     <Button variant="outline" onClick={() => setOpen(false)} className=" cursor-pointer">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSubmit} className="bg-blue-main text-white cursor-pointer">
//                         Done
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function FlashCardGeneratorDialog({
  open,
  setOpen,
  onFinalSubmit,
}: any) {
  const [quizName, setQuizName] = useState("");
  // const [subject, setSubject] = useState("");
  // const [system, setSystem] = useState("");
  // const [topic, setTopic] = useState("");
  // const [subTopic, setSubTopic] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const handleSubmit = () => {
    onFinalSubmit({
      quiz_name: quizName,
      // subject,
      // system,
      // topic,
      // sub_topic: subTopic,
      question_type: questionType,
      question_count: questionCount,
      difficulty_level: difficultyLevel,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Quiz</DialogTitle>
          <DialogDescription>
            Fill in the details to generate your quiz.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4">
          {/* Flashcard Name */}
          <div className="grid gap-2">
            <Label>Flashcard Name</Label>
            <Input
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Sample Flashcard"
            />
          </div>

          {/* Subject */}
          {/* <div className="grid gap-2">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="anatomy"
            />
          </div> */}

          {/* System */}
          {/* <div className="grid gap-2">
            <Label>System</Label>
            <Input
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              placeholder="cardiovascular"
            />
          </div> */}

          {/* Topic */}
          {/* <div className="grid gap-2">
            <Label>Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="hypertension"
            />
          </div> */}

          {/* Sub-topic */}
          {/* <div className="grid gap-2">
            <Label>Sub Topic</Label>
            <Input
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
              placeholder="risk factor"
            />
          </div> */}

          {/* Question Type */}
          <div className="grid gap-2">
            <Label>Question Type</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="ai_generated">AI Generated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Count */}
          <div className="grid gap-2">
            <Label>Question Count (max 50)</Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            />
            <p className="text-xs text-gray-500">{questionCount} / 50</p>
          </div>

          {/* Difficulty Level */}
          <div className="grid gap-2">
            <Label>Difficulty Level</Label>
            <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-main text-white">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
