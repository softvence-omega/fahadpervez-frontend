import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";

const CreateFlashcardDeck: React.FC = () => {
  const [deckName, setDeckName] = useState("Anatomy - Cardiology System");
  const [subject, setSubject] = useState("Cardiology");
  const [description, setDescription] = useState("Cardiology");
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);

  const subjects = [
    "Cardiology",
    "Neurology",
    "Anatomy",
    "Physiology",
    "Pathology",
    "Pharmacology",
  ];

  const handleSubmit = () => {
    console.log({ deckName, subject, description });
    alert("Flashcard Deck Created!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className=" mx-auto ">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Create New Flashcard Deck
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Create a new Flashcard Deck to organize your questions by subject or
          topic.
        </p>

        <div className="space-y-6 bg-white rounded-lg shadow-sm p-8">
          {/* Deck Name Field */}
          <div>
            <label
              htmlFor="deckName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deck name
            </label>
            <input
              id="deckName"
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter deck name"
            />
          </div>

          {/* Subject Field (Dropdown) */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-left flex items-center justify-between"
              >
                <span className="text-gray-900">{subject}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isSubjectOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSubjectOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {subjects.map((subjectOption) => (
                    <button
                      key={subjectOption}
                      type="button"
                      onClick={() => {
                        setSubject(subjectOption);
                        setIsSubjectOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                        subject === subjectOption
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {subjectOption}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            className="rounded-sm bg-gradient-to-tr from-[#0076F5] to-[#0058B8] inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Flashcard Deck 
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

export default CreateFlashcardDeck;
