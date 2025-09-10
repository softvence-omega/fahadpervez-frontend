import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { FileBadge2 } from "lucide-react";
import DailyChallengeCard from "./DailyChallangeCard";

const scoreItems = [
  { label: "Complete quiz", score: "02" },
  { label: "Complete Flashcard", score: "02" },
  { label: "Complete Case", score: "02" },
  { label: "Badge Earn", score: "00" },
];

const GamifiedLearning = () => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 my-10 shadow">
      <PrimaryHeading
        title="Gamified Learning"
        icon={<FileBadge2 size={20} />}
      />
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Challenge */}
          <DailyChallengeCard
            mission="Today's Mission: Anatomy Focus"
            description="Complete 2 anatomy flashcard sets and answer today's clinical mini case"
            flashcards="10"
            caseCount="01"
            reward='+50 points & "Anatomy Ace" badge'
            timeLeft="23h 45m left"
          />
          {/* Your Score Board */}
          <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Your Score Board
            </h3>
            <div className="space-y-4 mt-4">
              {scoreItems.map((item, index) => (
                <div key={index} className="flex justify-between gap-4 ">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-800 font-medium">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      </div>
    </div>
  );
};

export default GamifiedLearning;
