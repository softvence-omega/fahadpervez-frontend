import NoteCard from "@/components/reusable/NoteCard";
import Pagination from "@/components/reusable/Pagination";
import { useState } from "react";

export default function AllNotesTab() {

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 p-4 bg-white shadow rounded-lg">
                <NoteCard
                    tag="Heart Sounds"
                    title="Types of Shock"
                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                    chapter={12}
                    pages={12}
                    downloads={45}
                    onViewNotes={() => console.log("Viewing notes")}
                    onDownload={() => console.log("Downloading PDF")}
                />
                <NoteCard
                    tag="Heart Sounds"
                    title="Types of Shock"
                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                    chapter={12}
                    pages={12}
                    downloads={45}
                    onViewNotes={() => console.log("Viewing notes")}
                    onDownload={() => console.log("Downloading PDF")}
                />
                <NoteCard
                    tag="Heart Sounds"
                    title="Types of Shock"
                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                    chapter={12}
                    pages={12}
                    downloads={45}
                    onViewNotes={() => console.log("Viewing notes")}
                    onDownload={() => console.log("Downloading PDF")}
                />
                <NoteCard
                    tag="Heart Sounds"
                    title="Types of Shock"
                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                    chapter={12}
                    pages={12}
                    downloads={45}
                    onViewNotes={() => console.log("Viewing notes")}
                    onDownload={() => console.log("Downloading PDF")}
                />
                <NoteCard
                    tag="Heart Sounds"
                    title="Types of Shock"
                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                    chapter={12}
                    pages={12}
                    downloads={45}
                    onViewNotes={() => console.log("Viewing notes")}
                    onDownload={() => console.log("Downloading PDF")}
                />

                {/* <NoteCard
                                    tag="Heart Sounds"
                                    title="Types of Shock"
                                    description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                                    chapter={12}
                                    pages={12}
                                    // downloads={45}
                                    showDownload={false}
                                    onViewNotes={() => console.log("Viewing notes")}
                                /> */}
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
