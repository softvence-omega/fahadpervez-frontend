/* eslint-disable @typescript-eslint/no-explicit-any */

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

export function QuizGeneratorDialog({ open, setOpen, onFinalSubmit }: any) {
  const [quizName, setQuizName] = useState("");
  const [quizMode, setQuizMode] = useState("");
  const [questionBank, setQuestionBank] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState(40);

  // Exam Mode fields
  const [examName, setExamName] = useState("");
  const [subject, setSubject] = useState("");
  const [system, setSystem] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");

  // Dummy cascading data
    const dummyData: Record<string, any> = {
      "Final Exam": {
        Anatomy: {
          "Cardiovascular System": {
            "Heart Diseases": ["Congenital", "Acquired"],
          },
          "Nervous System": {
            "Brain": ["Cortex", "Cerebellum"],
          },
        },
        Physiology: {
          "Respiratory System": {
            "Gas Exchange": ["Oxygen Transport", "CO2 Regulation"],
          },
        },
      },
      Midterm: {
        Pathology: {
          "Digestive System": {
            "Liver": ["Hepatitis", "Cirrhosis"],
          },
        },
      },
      "Quiz 1": {
        Microbiology: {
          "Bacteria": {
            "Staphylococcus": ["Aureus", "Epidermidis"],
          },
        },
      },
    };

  // Handle cascading select logic
  const availableSubjects = examName ? Object.keys(dummyData[examName] || {}) : [];
  const availableSystems = subject ? Object.keys(dummyData[examName]?.[subject] || {}) : [];
  const availableTopics = system ? Object.keys(dummyData[examName]?.[subject]?.[system] || {}) : [];
  const availableSubTopics = topic
    ? dummyData[examName]?.[subject]?.[system]?.[topic] || []
    : [];

  const handleSubmit = () => {
    onFinalSubmit({
      quizName,
      quizMode,
      ...(quizMode === "study"
        ? {
            questionBank,
            questionType,
            difficulty,
            questionCount,
          }
        : {
            examName,
            subject,
            system,
            topic,
            subTopic,
            questionCount,
          }),
    });
    setOpen(false);
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

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Quiz Name */}
          <div className="grid gap-2">
            <Label>Quiz Name</Label>
            <Input
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Cardiology Quiz"
            />
          </div>

          {/* Quiz Mode */}
          <div className="grid gap-2">
            <Label>Quiz Mode</Label>
            <Select
              value={quizMode}
              onValueChange={(value) => {
                setQuizMode(value);
                // reset other fields on mode change
                setExamName("");
                setSubject("");
                setSystem("");
                setTopic("");
                setSubTopic("");
                setQuestionBank("");
                setQuestionType("");
                setDifficulty("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study">Study Mode</SelectItem>
                <SelectItem value="exam">Exam Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* === STUDY MODE FIELDS === */}
          {quizMode === "study" && (
            <>
              <div className="grid gap-2">
                <Label>Question Bank</Label>
                <Input
                  value={questionBank}
                  onChange={(e) => setQuestionBank(e.target.value)}
                  placeholder="Search question bank..."
                />
              </div>

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

              <div className="grid gap-2">
                <Label>Question Count (up to 50)</Label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                />
                <p className="text-xs text-gray-500">{questionCount} / 50</p>
              </div>
            </>
          )}

          {/* === EXAM MODE FIELDS === */}
          {quizMode === "exam" && (
            <>
              {/* Exam Name */}
              <div className="grid gap-2">
                <Label>Exam Name</Label>
                <Select value={examName} onValueChange={setExamName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(dummyData).map((exam) => (
                      <SelectItem key={exam} value={exam}>
                        {exam}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="grid gap-2">
                <Label>Subject</Label>
                <Select
                  value={subject}
                  onValueChange={(val) => {
                    setSubject(val);
                    setSystem("");
                    setTopic("");
                    setSubTopic("");
                  }}
                  disabled={!examName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
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
                  onValueChange={(val) => {
                    setSystem(val);
                    setTopic("");
                    setSubTopic("");
                  }}
                  disabled={!subject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select System" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSystems.map((sys) => (
                      <SelectItem key={sys} value={sys}>
                        {sys}
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
                  onValueChange={(val) => {
                    setTopic(val);
                    setSubTopic("");
                  }}
                  disabled={!system}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTopics.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
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
                    {availableSubTopics.map((sub: any) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
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
                <p className="text-xs text-gray-500">{questionCount} / 50</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-violet-700 text-white cursor-pointer"
          >
            Generate Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
