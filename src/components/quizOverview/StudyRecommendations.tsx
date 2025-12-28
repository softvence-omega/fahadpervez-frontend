
import RecommendationsList from "./RecommendationsList";
import { Recommendations } from "./type";

interface StudyRecommendationsProps {
  recommendations: Recommendations;
}

const StudyRecommendations: React.FC<StudyRecommendationsProps> = ({
  recommendations,
}) => {
  const activeTab: keyof Recommendations = "articles";

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <p className="text-[#1A1C1C] font-medium mb-6 mt-2">
        Study recommendations
      </p>

      {/* Raw Tabs */}
      {/* <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      {/* Tab Content */}
      {recommendations?.[activeTab] &&
      recommendations?.[activeTab]?.length > 0 ? (
        <RecommendationsList items={recommendations?.[activeTab]} />
      ) : (
        <div className="py-10 text-center border rounded-lg bg-gray-50 border-dashed">
          <p className="text-gray-500 font-inter font-medium">
            No recommendation found
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyRecommendations;
