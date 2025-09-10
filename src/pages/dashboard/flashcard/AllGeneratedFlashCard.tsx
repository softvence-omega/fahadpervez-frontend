import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";
import QuizCard from "../quizGenerator/QuizCard";

export default function AllGeneratedFlashCard() {

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
        <div>
            <div className="flex items-center gap-3">
                <Link to={'/dashboard/quiz-page'} className="mb-7">
                    <ArrowLeft /></Link>
                <DashboardHeading
                    title="Your Flashcard Collection"
                    titleSize="text-xl"
                    description="AI-powered spaced repetition learning"
                    descColor="text-[#4A5565]"
                    descSize="text-sm"
                    className="mt-12 mb-12 space-y-1"
                />
            </div>

            <h3 className="font-medium text-black mb-6">All Flashcards</h3>

            <div className="bg-white border border-slate-300 rounded-[8px] py-5 pl-7 pr-5">
                <div>
                    <h3 className="text-sm text-[#0A0A0A] font-medium">Generated Cards</h3>
                    <p className="text-sm text-[#717182] mt-1">Your AI-generated Cards ready to use</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {Array.from({ length: 17 }).map(() => (
                            <QuizCard />
                        ))}

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
    )
}
