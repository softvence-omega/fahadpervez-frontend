/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search } from "lucide-react";
import FAQAccordion from "../FAQAccordion";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "getting-started" | "mcq-bank" | "flashcard" | "community"
  >("all");

  const categories = [
    { id: "all" as const, label: "All" },
    { id: "getting-started" as const, label: "Getting Started" },
    { id: "mcq-bank" as const, label: "MCQ Bank" },
    { id: "flashcard" as const, label: "Flashcard" },
    { id: "community" as const, label: "Community" },
  ];

  const faqs = {
    "getting-started": [
      {
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Sign Up" button on the homepage. Fill in your details including name, email, and password. Choose your user type (Student or Professional) and select your specialty. You will receive a verification email to confirm your account.',
      },
      {
        question: "What types of users can join the platform?",
        answer:
          "We support three types of users: Students (preparing for exams), Professionals (expanding their knowledge), and Educators (creating and sharing content). Each user type has different features and capabilities tailored to their needs.",
      },
    ],
    "mcq-bank": [
      {
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Sign Up" button on the homepage. Fill in your details including name, email, and password. Choose your user type (Student or Professional) and select your specialty. You will receive a verification email to confirm your account.',
      },
      {
        question: "What types of users can join the platform?",
        answer:
          "We support three types of users: Students (preparing for exams), Professionals (expanding their knowledge), and Educators (creating and sharing content). Each user type has different features and capabilities tailored to their needs.",
      },
    ],
    flashcard: [
      {
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Sign Up" button on the homepage. Fill in your details including name, email, and password. Choose your user type (Student or Professional) and select your specialty. You will receive a verification email to confirm your account.',
      },
      {
        question: "What types of users can join the platform?",
        answer:
          "We support three types of users: Students (preparing for exams), Professionals (expanding their knowledge), and Educators (creating and sharing content). Each user type has different features and capabilities tailored to their needs.",
      },
    ],
    community: [
      {
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Sign Up" button on the homepage. Fill in your details including name, email, and password. Choose your user type (Student or Professional) and select your specialty. You will receive a verification email to confirm your account.',
      },
      {
        question: "What types of users can join the platform?",
        answer:
          "We support three types of users: Students (preparing for exams), Professionals (expanding their knowledge), and Educators (creating and sharing content). Each user type has different features and capabilities tailored to their needs.",
      },
    ],
  };

  const allFaqs = Object.values(faqs).flat();
  const filteredFaqs =
    activeCategory === "all" ? allFaqs : faqs[activeCategory] || [];

  const searchedFaqs = filteredFaqs.filter(
    (faq: any) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-7 bg-white rounded-[10px] space-y-6">
        <div>
          <h2 className="text-xl font-normal text-black mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm font-normal text-slate-700">
            Find answers to common questions about using our platform
          </p>
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-blue-50"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded font-medium text-sm whitespace-nowrap transition border border-slate-300 ${
                activeCategory === cat.id
                  ? "bg-blue-main text-white"
                  : "bg-white text-foreground hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs by Category */}
      <div className="space-y-4">
        {searchedFaqs.length > 0 ? (
          searchedFaqs.map((faq: any, idx: number) => (
            <FAQAccordion
              key={idx}
              question={faq.question}
              answer={faq.answer}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No FAQs found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
