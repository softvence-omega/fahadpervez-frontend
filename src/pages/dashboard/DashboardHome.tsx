import ClinicalCaseCard from "@/components/reusable/ClinicalCaseCard";
import DashboardCard1 from "@/components/reusable/DashboardCard1";
import DashboardCard2 from "@/components/reusable/DashboardCard2";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { BookOpenText, CopyCheck, FileBadge2, Highlighter } from "lucide-react";
const DashboardHome = () => {
  return (
    <div className="py-10 md:py-16">
      {/* Daily Updates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard1
          theme="pink"
          title="MCQ Bank"
          tags={["Drug Card", "Pharmacology"]}
          secondButtonTitle="Start Quiz"
        />
        <DashboardCard2 theme="indigo" />
        <DashboardCard1
          icon={CopyCheck}
          theme="green"
          title="Flashcards"
          subtitle="120 card reviewed"
          firstButtonTitle="Create Flashcard"
          sectionTitle="Today's Flashcard Suggestions"
          tags={["Immunology", "Pharmacology"]}
          quizTitle="Cardiology Flashcard"
          secondButtonTitle="View"
        />
      </div>
      {/* Clinical Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-10">
        <ClinicalCaseCard />
        <ClinicalCaseCard />
      </div>

      {/* Highlight of the week */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
        <PrimaryHeading
          title=" Highlights of the Week"
          icon={<Highlighter size={20} />}
        />
        <div className="mt-6"></div>
      </div>

      {/* Highlight of the week */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 my-10 shadow">
        <PrimaryHeading
          title="Study & Career Resources"
          icon={<BookOpenText size={20} />}
        />
        <div className="mt-6"></div>
      </div>

      {/* Highlight of the week */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 my-10 shadow">
        <PrimaryHeading
          title="Gamified Learning"
          icon={<FileBadge2 size={20} />}
        />
        <div className="mt-6"></div>
      </div>
    </div>
  );
};

export default DashboardHome;
