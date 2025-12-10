import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import CommonHeader from "@/common/header/CommonHeader";
import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

import DeleteButton from "@/common/button/DeleteButton";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { slugify } from "@/help/help";
import {
  useDeleteSingleStudentMutation,
  useGetStudentsDataQuery,
} from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import DashboardSearch from "../../reuseable/DashboardSearch";

const dropdownItems = [
  { label: "All", value: "" },
  { label: "NCLEX", value: "nclex" },
  { label: "USMLE1", value: "usmle1" },
  { label: "Yearly", value: "yearly" },
];

const tableHeaders = [
  { label: "SL", align: "text-center lg:table-cell hidden" },
  { label: "Name", align: "text-center" },
  { label: "University", align: "text-center md:table-cell hidden" },
  { label: "Year", align: "text-center xl:table-cell hidden" },
  { label: "Prepping For", align: "text-center lg:table-cell hidden" },
  { label: "Subject Preferred", align: "text-center xl:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const AllStudentProfileTable = () => {
  const [page, setPage] = useState(1);
  const [preparingFor, setPreparingFor] = useState("");
  const [search, setSearch] = useState("");

  const limit = 10;
  const { data, isLoading } = useGetStudentsDataQuery({
    page,
    limit,
    preparingFor,
    search,
  });

  const students =
    data?.data.map((item, idx) => ({
      id: idx + 1 + (page - 1) * limit,
      _id: item._id,
      name: item.profile_id.firstName,
      university: item.profile_id.university || "-",
      year: item.profile_id.year_of_study || "-",
      prepping: item.profile_id.preparingFor || "-",
      subject: item.profile_id.preference?.subject || "-",
    })) || [];

  const [deleteSingleStudent, { isLoading: isDeleting }] =
    useDeleteSingleStudentMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteSingleStudent(id).unwrap();
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };
  return (
    <div>
      <DashboardSearch
        onChange={(val) => setSearch(val)}
        className=" !rounded-none my-5"
      />
      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Student Profile</CommonHeader>
        <CommonDropdown
          items={dropdownItems.map((item) => ({
            label: item.label,
            onClick: () => {
              setPreparingFor(item.value);
              setPage(1);
            },
          }))}
          trigger={
            <ButtonWithIcon
              className="bg-[#fff] !text-[#09090B] flex !flex-row-reverse"
              icon={IoChevronDownSharp}
            >
              Filter
            </ButtonWithIcon>
          }
        />
      </div>

      <LoadingStatus
        isLoading={isLoading}
        items={students}
        itemName="students"
      />
      {!isLoading && students.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className={tableDesign.header}>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.label}
                  className={`${tableDesign.cellHeader} ${header.align}`}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((p) => (
              <TableRow key={p.id} className={tableDesign.bodyRow}>
                <TableCell
                  className={`${tableDesign.cell} lg:table-cell hidden`}
                >
                  <div>{p.id}</div>
                </TableCell>
                <TableCell className={`${tableDesign.cell}`}>
                  <div>{p.name}</div>
                </TableCell>
                <TableCell
                  className={`${tableDesign.cell} md:table-cell hidden`}
                >
                  <div>{p.university}</div>
                </TableCell>
                <TableCell
                  className={`xl:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.year}</div>
                </TableCell>
                <TableCell
                  className={`${tableDesign.cell} lg:table-cell hidden`}
                >
                  <div>{p.prepping}</div>
                </TableCell>
                <TableCell
                  className={`xl:table-cell hidden ${tableDesign.cell}`}
                >
                  <div>{p.subject}</div>
                </TableCell>
                <TableCell className={`${tableDesign.cell}`}>
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/student-profile/${p._id}/${slugify(p.name)}`}
                      className="text-[#1D4ED8] cursor-pointer"
                    >
                      <LuEye size={24} />
                    </Link>

                    <DeleteButton
                      isLoading={isDeleting}
                      onDelete={() => handleDelete(p._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="my-10">
        <Pagination
          currentPage={page}
          totalPages={data?.meta.totalPages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default AllStudentProfileTable;
