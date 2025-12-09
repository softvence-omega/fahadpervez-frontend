import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import CommonHeader from "@/common/header/CommonHeader";
import { professionalData } from "@/components/AdminDashboard/userManagement/professional/data";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronDownSharp } from "react-icons/io5";

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
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import DashboardSearch from "../../reuseable/DashboardSearch";
const dropdownItems = [
  { label: "Edit" },
  { label: "Delete" },
  { label: "Share" },
];

const tableHeaders = [
  { label: "SL", align: "text-center sm:table-cell hidden" },
  { label: "Name", align: "text-center" },
  { label: "Country", align: "text-center sm:table-cell hidden" },
  { label: "Experience", align: "text-center xl:table-cell hidden" },
  { label: "Hospital/Institute", align: "text-center xl:table-cell hidden" },
  { label: "Post-Graduate", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};
const ProfessionalTable = () => {
  return (
    <div>
      <DashboardSearch className=" !rounded-none mb-5 " />
      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Professional Profile</CommonHeader>
        <CommonDropdown
          items={dropdownItems}
          trigger={
            <ButtonWithIcon
              className="  bg-[#fff] !text-[#09090B] flex !flex-row-reverse"
              icon={IoChevronDownSharp}
            >
              Filter
            </ButtonWithIcon>
          }
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className={tableDesign.header}>
            {tableHeaders.map((header) => (
              <TableHead
                key={header.label}
                className={`${tableDesign.cellHeader} ${header.align} `}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {professionalData.map((p) => (
            <TableRow key={p.id} className={tableDesign.bodyRow}>
              <TableCell className={`sm:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.id}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div>{p.name}</div>
              </TableCell>
              <TableCell className={`sm:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.country}</div>
              </TableCell>
              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.experience}</div>
              </TableCell>
              <TableCell className={`lg:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.institute}</div>
              </TableCell>
              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.graduateYear}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex justify-center gap-3  ">
                  <Link
                    to={`/admin/professional-profile/${p.id}/${slugify(
                      p.name
                    )}`}
                    className="text-[#1D4ED8] cursor-pointer"
                  >
                    <LuEye size={24} />
                  </Link>
                  <span className="text-[#B91C1C] cursor-pointer">
                    <BiSolidEdit size={24} />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="my-10">
        <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
      </div>
    </div>
  );
};

export default ProfessionalTable;
