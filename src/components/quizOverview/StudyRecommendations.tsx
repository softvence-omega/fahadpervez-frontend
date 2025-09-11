import { useState } from "react";
import RecommendationsList from "./RecommendationsList";
import { Recommendations } from "./type";

interface StudyRecommendationsProps {
    recommendations: Recommendations;
}

const StudyRecommendations: React.FC<StudyRecommendationsProps> = ({
    recommendations,
}) => {
    const [activeTab, setActiveTab] = useState<keyof Recommendations>("articles");

    const tabs: { key: keyof Recommendations; label: string }[] = [
        { key: "articles", label: "Articles" },
        { key: "flashcards", label: "Flashcards" },
        { key: "clinicalCases", label: "Clinical Cases" },
    ];

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow">
            <p className="text-[#1A1C1C] font-medium mb-6 mt-2">
                Study recommendations
            </p>

            {/* Raw Tabs */}
            <div className="flex gap-4 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-2 ${activeTab === tab.key
                            ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                            : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <RecommendationsList items={recommendations[activeTab]} />
        </div>
    );
};

export default StudyRecommendations;
