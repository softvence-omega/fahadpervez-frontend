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
import { useEffect, useState } from "react";
import {
  useGenerateMCQMutation,
  useGetMCQBankTreeQuery,
  useGllMCQBankQuery,
} from "@/store/features/MCQBank/MCQBank.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Zap } from "lucide-react";

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

export function QuizGeneratorDialog({ open, setOpen }: any) {
  const navigate = useNavigate();
  const [generateMCQ, { isLoading: isGenerating }] = useGenerateMCQMutation();
  const { data: treeData } = useGetMCQBankTreeQuery({});
  const { data: bankData } = useGllMCQBankQuery({});

  const subjects: SubjectTree[] = treeData?.data || [];
  const allBanks = bankData?.data || [];

  const [quizName, setQuizName] = useState("");
  const [quizMode, setQuizMode] = useState("study");
  const [examName, setExamName] = useState("");
  const [questionBank, setQuestionBank] = useState("");
  const [questionType, setQuestionType] = useState("hybrid");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(40);
  const [duration, setDuration] = useState(40);

  const [subject, setSubject] = useState("");
  const [system, setSystem] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");

  // Derived lists for cascading selects
  const selectedSubjectObj = subjects.find((s) => s.subjectName === subject);
  const systemList = selectedSubjectObj?.systems || [];
  const selectedSystemObj = systemList.find((sys) => sys.name === system);
  const topicList = selectedSystemObj?.topics || [];
  const selectedTopicObj = topicList.find((t) => t.topicName === topic);
  const subTopicList = selectedTopicObj?.subTopics || [];

  // Filtered Question Banks
  const filteredBanks = allBanks.filter((bank: any) => {
    if (system) return bank.system === system;
    if (subject) return bank.subject === subject;
    return true;
  });

  // Reset dependents on change
  useEffect(() => {
    if (quizMode === "study") {
      setSystem("");
      setTopic("");
      setSubTopic("");
      setQuestionBank("");
    }
  }, [subject, quizMode]);

  useEffect(() => {
    if (quizMode === "study") {
      setTopic("");
      setSubTopic("");
      const matchingBank = filteredBanks.find((b: any) => b.system === system);
      if (matchingBank) setQuestionBank(matchingBank._id);
    }
  }, [system, quizMode]);

  useEffect(() => {
    if (quizMode === "study") {
      setSubTopic("");
    }
  }, [topic, quizMode]);

  useEffect(() => {
    if (quizMode === "exam") {
      setQuestionCount(50);
      setDuration(60);
    }
  }, [quizMode]);

  const handleSubmit = async () => {
    // if (!quizName) {
    //   toast.error("Please enter a quiz name");
    //   return;
    // }

    if (quizMode === "study" && !subject) {
      toast.error("Please select at least a subject for study mode");
      return;
    }

    if (quizMode === "exam" && !examName) {
      toast.error("Please select an exam");
      return;
    }

    const payload: any = {
      quiz_name: quizName,
      subject: subject,
      system: system,
      topic: topic,
      sub_topic: subTopic,
      question_type: questionType,
      question_count: questionCount,
      difficulty_level: difficulty,
      mcq_bank_id: questionBank || undefined,
    };

    try {
      const res = await generateMCQ(payload).unwrap();
      if (res.success) {
        // toast.success("Quiz generated successfully!");
        const quizId = res.data?._id || res.data?.id || res._id;
        setOpen(false);
        navigate(`/dashboard/quiz/${quizId}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to generate quiz");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Make your quiz easily with Study or Exam mode.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Quiz Name */}
          <div className="grid gap-2">
            <Label>Quiz Name</Label>
            <Input
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="e.g., Cardiology Quiz"
            />
          </div>

          {/* Quiz Mode */}
          <div className="grid gap-2">
            <Label>Quiz Mode</Label>
            <Select value={quizMode} onValueChange={setQuizMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study">Study Mode</SelectItem>
                <SelectItem value="exam">Exam Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* === EXAM MODE FIELDS === */}
          {quizMode === "exam" && (
            <>
              <div className="grid gap-2">
                <Label>Exam Name</Label>
                <Select value={examName} onValueChange={setExamName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Block Exam">Block Exam</SelectItem>
                    <SelectItem value="Clinical">Clinical</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Question Count</Label>
                <Input value={questionCount} disabled />
              </div>

              <div className="grid gap-2">
                <Label>Duration (Minutes)</Label>
                <Input value={duration} disabled />
              </div>
            </>
          )}

          {/* === STUDY MODE FIELDS === */}
          {quizMode === "study" && (
            <>
              {/* Subject */}
              <div className="grid gap-2">
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub) => (
                      <SelectItem key={sub._id} value={sub.subjectName}>
                        {sub.subjectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* System */}
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
                    {systemList.map((sys) => (
                      <SelectItem key={sys.name} value={sys.name}>
                        {sys.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Topic */}
              <div className="grid gap-2">
                <Label>Topic</Label>
                <Select
                  value={topic}
                  onValueChange={setTopic}
                  disabled={!system}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topicList.map((t) => (
                      <SelectItem key={t.topicName} value={t.topicName}>
                        {t.topicName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub Topic */}
              <div className="grid gap-2">
                <Label>Sub Topic</Label>
                <Select
                  value={subTopic}
                  onValueChange={setSubTopic}
                  disabled={!topic}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {subTopicList.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Question Bank */}
              <div className="grid gap-2">
                <Label>Question Bank</Label>
                <Select value={questionBank} onValueChange={setQuestionBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Question Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredBanks.map((bank: any) => (
                      <SelectItem key={bank._id} value={bank._id}>
                        {bank.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Question Type */}
              <div className="grid gap-2">
                <Label>Question Type</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="humanoid">Humanoid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div className="grid gap-2">
                <Label>Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Question Count */}
              <div className="grid gap-2">
                <Label>Question Count (up to 50)</Label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                />
              </div>

              {/* Duration */}
              <div className="grid gap-2">
                <Label>Duration (Minutes)</Label>
                <Input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="bg-violet-700 text-white hover:bg-violet-800"
          >
            {isGenerating ? (
              <Zap className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? "Generating..." : "Generate Quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
