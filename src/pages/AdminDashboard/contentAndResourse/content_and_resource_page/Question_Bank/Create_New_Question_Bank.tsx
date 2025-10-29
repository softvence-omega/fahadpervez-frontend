import React, { useState } from "react";
import { X, Plus, ArrowLeft } from "lucide-react";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonButton from "@/common/button/CommonButton";

interface Tag {
  id: string;
  label: string;
}

interface AddQuestionProps {
  onBack?: () => void;
}

const CreateQuestionBank: React.FC<AddQuestionProps> = ({ onBack }) => {
  const [title, setTitle] = useState("Cardiology question bank");
  const [subject, setSubject] = useState("Cardiology");
  const [description, setDescription] = useState("Cardiology");
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", label: "Anatomy" },
    { id: "2", label: "Anatomy" },
  ]);
  const [tagInput, setTagInput] = useState("Cardiology");

  const removeTag = (id: string) =>
    setTags(tags.filter((tag) => tag.id !== id));

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, { id: Date.now().toString(), label: tagInput.trim() }]);
      setTagInput("");
    }
  };

  const handleSubmit = () => {
    console.log({ title, subject, tags, description });
    alert("Question Bank Created!");
  };

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* 🏷️ Page Header */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">
          Create New Question Bank
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          Create a new question bank to organize your questions by subject or
          topic.
        </p>

        {/* 🧩 Form Card */}
        <div className="space-y-6 bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter title"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter subject"
            />
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Tags
            </label>
            <div className="relative">
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter tag"
              />
              <button
                onClick={addTag}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Add tag"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Tag Pills */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                  >
                    {tag.label}
                    <button
                      onClick={() => removeTag(tag.id)}
                      className="hover:text-gray-900 transition"
                      aria-label={`Remove ${tag.label} tag`}
                    >
                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* ⚙️ Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <ButtonWithIcon icon={Plus} onClick={handleSubmit} className="">
            Create Question Bank
          </ButtonWithIcon>

          <CommonButton onClick={handleBack}>Back</CommonButton>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionBank;
