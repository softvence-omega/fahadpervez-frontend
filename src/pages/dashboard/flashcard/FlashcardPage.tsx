import DashboardHeading from "@/components/reusable/DashboardHeading"
import PrimaryButton from "@/components/reusable/PrimaryButton"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import FlashCardOverview from "./FlashCardOverview"

const FlashcardPage = () => {

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "myFlashcard", label: "My Flashcard" },
  ];

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <DashboardHeading
          title="Flashcard Generator Overview"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Create custom quizzes from your images and videos using AI"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        <Link to={"/dashboard/flashcard-generator"}>
          <PrimaryButton
            icon={<Plus className="w-4 h-4" />}
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">
            Generate Flash Card
          </PrimaryButton>
        </Link>
      </div>

      <div>
        {/* Tab  */}
        <div>
          <div>
            {/* Tab Buttons */}
            <div className="flex gap-4 my-6 md:my-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={` py-1 text-start text-lg font-semibold leading-7 transition-colors duration-200 hover:cursor-pointer
                      ${activeTab === tab.id
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="">
              {activeTab === "overview" && (
                <FlashCardOverview />
              )}
              {activeTab === "myFlashcard" && (
                <p>My Flashcard Tab</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FlashcardPage