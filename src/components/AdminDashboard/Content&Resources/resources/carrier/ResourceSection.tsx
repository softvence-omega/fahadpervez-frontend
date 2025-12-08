import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Pagination from "@/common/custom/Pagination";
import CommonSpace from "@/common/space/CommonSpace";
import DashboardSearch from "@/components/AdminDashboard/reuseable/DashboardSearch";
import { useGetResourceCarrierQuery } from "@/store/features/adminDashboard/ContentResources/resourceCariier/resourceCarrierApi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

const ResourceSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data } = useGetResourceCarrierQuery({
    page: currentPage,
    limit,
  });

  const cardLists = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <CommonSpace>
        <div className="flex justify-between items-center ">
          <DashboardSearch className=" !rounded-none !max-w-[734px] " />
          <ButtonWithIcon
            icon={FaPlus}
            className="w-full md:w-auto flex justify-center  flex-shrink-0 "
          >
            <Link to="create-carrier">Add Resource</Link>
          </ButtonWithIcon>
        </div>
      </CommonSpace>

      <ResourceCard data={cardLists} />
      {cardLists.length > 0 && (
        <div className="py-10">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ResourceSection;
