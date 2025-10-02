import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";

interface Tag {
  id: string;
  label: string;
}

const CreateQuestionBank: React.FC = () => {
  const [title, setTitle] = useState("Cardiology question bank");
  const [subject, setSubject] = useState("Cardiology");
  const [description, setDescription] = useState("Cardiology");
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", label: "Anatomy" },
    { id: "2", label: "Anatomy" },
  ]);
  const [tagInput, setTagInput] = useState("Cardiology");

  const removeTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

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

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="mx-auto ">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Create New Question Bank
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Create a new question bank to organize your questions by subject or
          topic.
        </p>

        <div className="space-y-6 bg-white rounded-lg shadow-sm p-8">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter title"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter subject"
            />
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
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
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter tag"
              />
              <button
                onClick={addTag}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Add tag"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Tag Pills */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.label}
                    <button
                      onClick={() => removeTag(tag.id)}
                      className="hover:text-gray-900 transition"
                      aria-label={`Remove ${tag.label} tag`}
                    >
                      <X className="w-3.5 h-3.5" />
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <ButtonWithIcon
            icon={Plus}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Question Bank
          </ButtonWithIcon>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 text-gray-700 font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionBank;
