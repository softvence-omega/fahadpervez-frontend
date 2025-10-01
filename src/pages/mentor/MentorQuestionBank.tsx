import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import MentorOverviewCard from "@/components/reusable/MentorOverviewCard";
import { BookOpenText } from "lucide-react";
import { useState } from "react";
import MentorAllSessionTab from "./MentorAllSessionTab";
import Pagination from "@/components/reusable/Pagination";
import MentorSessionCard from "./MentorSessionCard";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/mentor" },
  { name: "Classes", link: "/mentor/classes" },
];

const MentorQuestionBank = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  // Dummy products (replace with API data)
  const products = Array.from({ length: 57 }, (_, i) => ({
    id: `p${i + 1}`,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
  }));

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  // Config
  const productsPerPage = 10;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Handle toggle show all
  const handleShowAll = () => setShowAll((prev) => !prev);

  // Get products for current page or all
  // const paginatedProducts = useMemo(() => {
  //     if (showAll) return products;
  //     const startIndex = (currentPage - 1) * productsPerPage;
  //     return products.slice(startIndex, startIndex + productsPerPage);
  // }, [products, currentPage, showAll]);

  // Showing range
  const start = showAll ? 1 : (currentPage - 1) * productsPerPage + 1;
  const end = showAll
    ? totalProducts
    : Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div className="">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DashboardHeading
        title="Track Your Earnings in Real Time"
        titleSize="text-xl"
        titleFont="font-medium"
        titleColor="text-black"
        description="Stay updated with every payout, pending balance, and completed transaction"
        descSize="text-sm"
        descColor="text-slate-700"
        className="mb-7"
      />

      <div className="flex items-center gap-7">
        <MentorOverviewCard
          icon={BookOpenText}
          iconColor="text-blue-500"
          iconBg="bg-blue-100"
          value="45"
          bottomText="Average station time"
        />
        <MentorOverviewCard
          icon={BookOpenText}
          iconColor="text-fuchsia-700"
          iconBg="bg-fuchsia-100"
          value="$ 247"
          bottomText="Total Earnings"
        />
      </div>
      <h2 className="mb-4 mt-11 text-2xl text-[#111827] font-semibold">
        Schedule Classes
      </h2>

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
                      ${
                        activeTab === tab.id
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
            {activeTab === "all" && <MentorAllSessionTab />}
            {activeTab === "upcoming" && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(2)
                  .fill(null)
                  .map(() => (
                    <MentorSessionCard />
                  ))}
              </div>
            )}
            {activeTab === "completed" && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(4)
                  .fill(null)
                  .map(() => (
                    <MentorSessionCard />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5 ">
        {!showAll && (
          <Pagination
            title={"All Products"}
            showText={`Showing ${start} to ${end} of ${totalProducts} Products`}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleShowAll={handleShowAll}
            showAll={showAll}
          />
        )}

        {/* Show All Toggle */}
        {/* {showAll && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleShowAll}
                            className="px-6 py-2 bg-sunset-orange text-white rounded-lg"
                        >
                            Show Less
                        </button>
                    </div>
                )} */}
      </div>
    </div>
  );
};

export default MentorQuestionBank;
