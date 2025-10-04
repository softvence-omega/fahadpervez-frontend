import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import arrow from "@/assets/dashboard/right-arrow.svg"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// ✅ Zod Schema
const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(5, "Content is required"),
})

type FormData = z.infer<typeof formSchema>

interface CreateDiscussionProps {
  onBack: () => void
}

const CreateDiscussion = ({ onBack }: CreateDiscussionProps) => {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  })

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const onSubmit = (values: FormData) => {
    const payload = { ...values, tags }
    console.log("Form Data:", payload)
    onBack()
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Forums
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Create New Discussion
        </h2>
        <p className="text-gray-600 mb-6">
          Connect, learn, and grow with the medical education community
        </p>

        {/* ✅ react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title + Category side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Post Title</label>
              <Input placeholder="Type your title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                onValueChange={(val) =>
                  setValue("category", val, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anatomy">Anatomy</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pharmacology">Pharmacology</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Detailed Content</label>
            <Textarea
              placeholder="Provide more details about your discussion"
              className="min-h-[150px] resize-none"
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags (optional)</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                placeholder="Type a tag"
              />
              <Button type="button" onClick={handleAddTag}>
                Add Tag
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 w-full justify-center items-center gap-3 px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
            >
              <img src={arrow} alt="arrow icon" className="w-4 h-4" />
              Post to Forum
            </Button>
            <Button type="button" onClick={onBack} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDiscussion;
