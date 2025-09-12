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
export function FlashCardGeneratorDialog({ open, setOpen, onFinalSubmit }: any) {
    const [sessionName, setSessionName] = useState("")
    const [category, setCategory] = useState("")
    const [flashCardType, setFlashCardType] = useState("")
    const [questionCount, setQuestionCount] = useState(20)
    const [examPrepCategory, setExamPrepCategory] = useState("")

    const handleSubmit = () => {
        onFinalSubmit({
            sessionName,
            category,
            flashCardType,
            questionCount,
            examPrepCategory,
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Customize Card</DialogTitle>
                    <DialogDescription>
                        Make your flash card in one-click.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 py-4">
                    <div className="grid gap-2">
                        <Label>Session Name</Label>
                        <Input
                            value={sessionName}
                            onChange={(e) => setSessionName(e.target.value)}
                            placeholder="Cardiology Quiz"
                        />
                    </div>

                    <div className="grid gap-2 w-full">
                        <Label>Flashcard Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Basic/Clinical/Advanced" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="clinical">Clinical</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2 w-full">
                        <Label>Flashcard Type</Label>
                        <Select value={flashCardType} onValueChange={setFlashCardType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="TypeA/TypeB/TypeC" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TypeA">Type A</SelectItem>
                                <SelectItem value="TypeB">Type B</SelectItem>
                                <SelectItem value="TypeC">Type C</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Max Flashcard (up to 50)</Label>
                        <Input
                            type="number"
                            placeholder="max up to 50 cards"
                            min={1}
                            max={50}
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                        />
                        <p className="text-xs text-gray-500">{questionCount} / 50</p>
                    </div>

                    <div className="grid gap-2">
                        <Label>Exam prep category</Label>
                        <Select value={examPrepCategory} onValueChange={setExamPrepCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Basic/Clinical/Advanced" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">USMLE</SelectItem>
                                <SelectItem value="clinical">Demo</SelectItem>
                                <SelectItem value="advanced">Demo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} className=" cursor-pointer">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="bg-blue-main text-white cursor-pointer">
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
