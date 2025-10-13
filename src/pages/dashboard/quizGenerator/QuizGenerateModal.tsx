import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function QuizGeneratorDialog({ open, setOpen, onFinalSubmit }: any) {
  const [quizName, setQuizName] = useState("")
  const [subject, setSubject] = useState("")
  const [system, setSystem] = useState("")
  const [topic, setTopic] = useState("")
  const [subTopic, setSubTopic] = useState("")
  const [questionBank, setQuestionBank] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [questionCount, setQuestionCount] = useState(40)

  const handleSubmit = () => {
    onFinalSubmit({
      quizName,
      subject,
      system,
      topic,
      subTopic,
      questionBank,
      difficulty,
      questionCount,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Make your quiz from flash cards in one-click.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="grid gap-2">
            <Label>Quiz Name</Label>
            <Input
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Cardiology Quiz"
            />
          </div>

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
              placeholder="Cardiovascular System"
            />
          </div>

          <div className="grid gap-2">
            <Label>Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Heart Failure"
            />
          </div>

          <div className="grid gap-2">
            <Label>Sub Topic</Label>
            <Input
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
              placeholder="Pathophysiology"
            />
          </div>

          <div className="grid gap-2">
            <Label>Question Bank</Label>
            <Input
              value={questionBank}
              onChange={(e) => setQuestionBank(e.target.value)}
              placeholder="Search question bank..."
            />
          </div>

          <div className="grid gap-2">
            <Label>Difficulty Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Basic/Clinical/Advanced" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="clinical">Clinical</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className=" cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-violet-700 text-white cursor-pointer">
            Generate Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
