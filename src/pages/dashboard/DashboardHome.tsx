import DashboardCard1 from "@/components/reusable/DashboardCard1";
const DashboardHome = () => {
  return (
    <div className="py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard1
          theme="pink"
          title="MCQ Bank"
          tags={["Drug Card", "Pharmacology"]}
          secondButtonTitle="Start Quiz"
        />
        <DashboardCard1 theme="indigo" />
        <DashboardCard1 theme="green" title="Flashcards" firstButtonTitle="Create Flashcard" secondButtonTitle="View" />
      </div>
    </div>
  );
};

export default DashboardHome;
