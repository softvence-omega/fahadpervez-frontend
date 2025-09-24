import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import ConnectMentorCard from "./ConnectMentorCard";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";

export default function AllMentorPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "All Mentor", link: "/dashboard/all-mentor" },
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
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <DashboardHeading
        title="All Mentor"
        titleSize="text-xl"
        titleColor="text-[#0A0A0A]"
        description="Connect, learn, and grow with the medical education community"
        descSize="text-sm"
        descColor="text-[#4A5565]"
        className="mb-8 space-y-1"
      />

      <div className="md:flex gap-5 space-y-3 justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Search Input with Icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>

          {/* Dropdown */}
          <select className="h-12 px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option value="all">ALL</option>
            <option value="pending">Pending Request</option>
            {/* <option value="orthopedics">Orthopedics</option> */}
          </select>
        </div>
        <Link to={"/dashboard/my-mentor"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            // icon={<Plus className="w-4 h-4" />}
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            My Mentors
          </PrimaryButton>
        </Link>
      </div>

      <div className="bg-white border border-slate-300 rounded-[12px] p-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array(6)
            .fill(null)
            .map(() => (
              <ConnectMentorCard />
            ))}
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
}
