/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import FAQAccordion from "../FAQAccordion";
import { useGetAllFAQQuery } from "@/store/features/faq/faq.api";
import GlobalLoader2 from "@/common/GlobalLoader2";

interface FAQItem {
  _id: string;
  category: string;
  question: string;
  answer: string;
}

const normalizeCategory = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "-");

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: faqsData, isLoading: faqLoading } = useGetAllFAQQuery({});
  const faqs: FAQItem[] = faqsData?.data || [];

  /* -------------------
      Dynamic categories
  ------------------- */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(faqs.map((faq) => faq.category))
    );

    return [
      { id: "all", label: "All" },
      ...uniqueCategories.map((cat) => ({
        id: normalizeCategory(cat),
        label: cat,
      })),
    ];
  }, [faqs]);

  /* -------------------
      Group FAQs
  ------------------- */
  const groupedFaqs = useMemo(() => {
    return faqs.reduce((acc: any, faq) => {
      const key = normalizeCategory(faq.category);
      acc[key] = acc[key] || [];
      acc[key].push(faq);
      return acc;
    }, {});
  }, [faqs]);

  /* -------------------
      Search helper
  ------------------- */
  const matchSearch = (faq: FAQItem) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

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
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary 
                       focus:border-transparent text-foreground bg-blue-50"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded font-medium text-sm whitespace-nowrap transition border border-slate-300 cursor-pointer ${
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

      {/* FAQs */}
      {faqLoading ? (
        <GlobalLoader2 />
      ) : (
        <div className="space-y-4">
          {activeCategory === "all" ? (
            categories
              .filter((c) => c.id !== "all")
              .map((cat) => {
                const faqsByCategory = (groupedFaqs[cat.id] || []).filter(
                  matchSearch
                );

                if (!faqsByCategory.length) return null;

                return (
                  <div
                    key={cat.id}
                    className="space-y-3 bg-white p-6 rounded-lg"
                  >
                    <h3 className="text-base font-medium text-black mb-6">
                      {cat.label}
                    </h3>

                    {faqsByCategory.map((faq: FAQItem) => (
                      <FAQAccordion
                        key={faq._id}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    ))}
                  </div>
                );
              })
          ) : (
            <>
              {(groupedFaqs[activeCategory] || []).filter(matchSearch).length >
              0 ? (
                (groupedFaqs[activeCategory] || [])
                  .filter(matchSearch)
                  .map((faq: FAQItem) => (
                    <FAQAccordion
                      key={faq._id}
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
