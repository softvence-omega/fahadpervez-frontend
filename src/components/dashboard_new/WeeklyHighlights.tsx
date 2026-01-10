import React from "react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetWeeklyHighlightsQuery } from "@/store/features/goal/goal.api";

interface HighlightItem {
  _id: string;
  [key: string]: any;
}

interface HighlightsData {
  mcqBank?: HighlightItem[];
  flashcard?: HighlightItem[];
  clinicalCase?: HighlightItem[];
  osce?: HighlightItem[];
}

interface HighlightCard {
  id: string;
  type: "mcq" | "flashcard" | "clinicalCase" | "osce";
  title: string;
  description: string;
  buttonText: string;
  route: string;
  img: string;
}

const WeeklyHighlights: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetWeeklyHighlightsQuery(undefined);

  const highlightCards: HighlightCard[] = React.useMemo(() => {
    if (!data?.data) return [];

    const highlights: HighlightsData = data.data;
    const cards: HighlightCard[] = [];

    // MCQ Bank
    if (highlights.mcqBank && highlights.mcqBank.length > 0) {
      const mcq = highlights.mcqBank[0];
      cards.push({
        id: mcq._id,
        type: "mcq",
        title: "MCQ of the Week",
        description:
          "Test your knowledge with this week's featured multiple-choice question",
        buttonText: "Answer Now",
        route: `/dashboard/practice-mcq/${mcq._id}`,
        img: "/image/dashboard_new/Frame1.svg",
      });
    }

    // Flashcard
    if (highlights.flashcard && highlights.flashcard.length > 0) {
      const flashcard = highlights.flashcard[0];
      cards.push({
        id: flashcard._id,
        type: "flashcard",
        title: "Flashcard of the Week",
        description:
          "Master key concepts with this week's featured flashcard set",
        buttonText: "Study Now",
        route: `/dashboard/solve-flash-card/${flashcard._id}`,
        img: "/image/dashboard_new/Frame.svg",
      });
    }

    // Clinical Case
    if (highlights.clinicalCase && highlights.clinicalCase.length > 0) {
      const clinicalCase = highlights.clinicalCase[0];
      cards.push({
        id: clinicalCase._id,
        type: "clinicalCase",
        title: "Clinical Case of the Week",
        description:
          "Apply your clinical reasoning to this week's challenging case scenario",
        buttonText: "Solve Case",
        route: `/dashboard/clinical-case/${clinicalCase._id}`,
        img: "/image/dashboard_new/Frame.svg",
      });
    }

    // OSCE
    if (highlights.osce && highlights.osce.length > 0) {
      const osce = highlights.osce[0];
      cards.push({
        id: osce._id,
        type: "osce",
        title: "OSCE of the Week",
        description:
          "Practice your clinical skills with this week's OSCE station",
        buttonText: "Practice Now",
        route: `/dashboard/practice-with-checklist/${osce._id}`,
        img: "/image/dashboard_new/User.svg",
      });
    }

    return cards;
  }, [data]);

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Highlights of the Week
          </h3>
          <Lightbulb className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!highlightCards.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Highlights of the Week
          </h3>
          <Lightbulb className="w-6 h-6 text-blue-500" />
        </div>
        <div className="text-center py-12 text-gray-500">
          No highlights available this week
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Highlights of the Week
        </h3>
        <Lightbulb className="w-6 h-6 text-blue-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlightCards.map((card) => (
          <div
            key={card.id}
            className="border shadow-sm border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-start gap-4"
          >
            {/* Image */}
            <img
              src={card.img}
              alt={card.title}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 h-full">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
              </div>

              <button
                onClick={() => handleCardClick(card.route)}
                className="mt-auto w-full md:w-auto bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyHighlights;
