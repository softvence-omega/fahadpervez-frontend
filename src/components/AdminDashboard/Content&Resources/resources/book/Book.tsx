import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardSearch from "@/components/AdminDashboard/reuseable/DashboardSearch";
import { useGetResourceBooksQuery } from "@/store/features/adminDashboard/ContentResources/resourceLibery/resourceLibery";
import { BookType } from "@/store/features/adminDashboard/ContentResources/resourceLibery/types/books";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import BookTable from "./BookTable";
import BookUploadForm from "./BookUploadForm";

const Book = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [viewAll, setViewAll] = useState(false);
  const [viewAllPage, setViewAllPage] = useState<number>(5);
  const [editBook, setEditBook] = useState<BookType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading } = useGetResourceBooksQuery({
    page: currentPage,
    limit: viewAllPage,
    searchTerm: debouncedSearchTerm,
  });

  const cardLists = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewAll = () => {
    setViewAll(true);
    setViewAllPage(data?.meta.total ?? 0);
    setCurrentPage(1);
  };

  const handleEdit = (book: any) => {
    setEditBook(book);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditBook(null);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      {isEditModalOpen && editBook ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            <BookUploadForm
              initialData={editBook}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      ) : (
        <div>
          <CommonSpace>
            <div className="flex justify-between items-center ">
              <DashboardSearch
                value={searchTerm}
                onChange={setSearchTerm}
                className=" !rounded-none !max-w-[734px] "
              />
              <ButtonWithIcon
                icon={FaPlus}
                className="w-full md:w-auto flex justify-center  flex-shrink-0 "
              >
                <Link to="upload-books">Upload Books</Link>
              </ButtonWithIcon>
            </div>
          </CommonSpace>

          <div className={viewAll ? "mb-10" : ""}>
            {isLoading ? (
              <Spinner />
            ) : cardLists.length === 0 ? (
              <p className="flex justify-center">No Data Found</p>
            ) : (
              <BookTable
                data={cardLists}
                handleViewAll={handleViewAll}
                handleEdit={handleEdit}
              />
            )}
          </div>

          {cardLists.length > 0 && !viewAll && (
            <div className="py-10">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Book;
