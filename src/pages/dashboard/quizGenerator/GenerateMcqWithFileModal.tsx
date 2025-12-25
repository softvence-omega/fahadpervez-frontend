
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import { useGenerateMCQWithFileMutation } from "@/store/features/MCQBank/MCQBank.api";

// =======================
// Zod Schema
// =======================
const quizSchema = z.object({
  difficulty: z.enum(["Basic", "Intermediate", "Hard"]),
  questionCount: z.coerce
    .number()
    .min(1, "At least 1 question is required")
    .max(50, "Max 50 questions"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

interface GenerateMcqWithFileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  files: File[];
  note: string;
}

export function GenerateMcqWithFileModal({
  open,
  setOpen,
  files,
  note,
}: GenerateMcqWithFileModalProps) {
  const [generateMCQWithFile, { isLoading }] = useGenerateMCQWithFileMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      questionCount: 10,
      duration: 40,
      difficulty: "Basic",
    },
  });

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      reset({
        questionCount: 10,
        duration: 40,
        difficulty: "Basic",
      });
    }
  }, [open, reset]);

  // =======================
  // API CALL INSIDE MODAL
  // =======================
  const onFormSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    try {
      if (!files || files.length === 0) {
        console.error("No file provided");
        return;
      }

      const formData = new FormData();
      // Appending the first file as per API requirement
      formData.append("file", files[0]);

      const jsonData = {
        prompt: note || "Generate Clinical case", // Use note as prompt
        d_level: data.difficulty,
        q_count: data.questionCount,
      };

      formData.append("data", JSON.stringify(jsonData));

      const res = await generateMCQWithFile(formData).unwrap();
      console.log(res)

      console.log("Quiz Generated Successfully");
      setOpen(false);
    } catch (error) {
      console.error("Quiz generation failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Make your quiz from your uploaded files and notes using AI.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Difficulty */}
            <div className="grid gap-2">
              <Label className="text-[#5A7183]">Difficulty</Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.difficulty ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="border border-slate-300">
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.difficulty && (
                <p className="text-xs text-red-500">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            {/* Question Count */}
            <div className="grid gap-2">
              <Label className="text-[#5A7183]">Question count(Upto 50)</Label>
              <Input
                type="number"
                min={1}
                max={50}
                {...register("questionCount")}
                className={errors.questionCount ? "border-red-500" : ""}
              />
              {errors.questionCount && (
                <p className="text-xs text-red-500">
                  {errors.questionCount.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-violet-700 text-white hover:bg-violet-800"
              disabled={isLoading}
            >
              <Zap
                className={`mr-2 h-4 w-4 fill-white ${
                  isLoading ? "animate-spin" : ""
                } `}
              />
              {isLoading ? "Generating..." : "Generate Quiz"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
