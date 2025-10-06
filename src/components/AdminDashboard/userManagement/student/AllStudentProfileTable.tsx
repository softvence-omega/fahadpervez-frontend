import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import CommonHeader from "@/common/header/CommonHeader";
import { IoChevronDownSharp } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FC } from "react";
import { LuEye } from "react-icons/lu";
import Pagination from "@/common/custom/Pagination";
import { Link } from "react-router-dom";
import { slugify } from "@/help/help";
const dropdownItems = [
  { label: "Edit" },
  { label: "Delete" },
  { label: "Share" },
];
export interface Students {
  id: number;
  name: string;
  university: string;
  year: string;
  prepping: string;
  subject: string;
}

interface AllStudentProfileTable {
  students: Students[];
}

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
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};

const AllStudentProfileTable: FC<AllStudentProfileTable> = ({ students }) => {
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Student Profile</CommonHeader>
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
          {students.map((p) => (
            <TableRow key={p.id} className={tableDesign.bodyRow}>
              <TableCell className={`${tableDesign.cell} lg:table-cell hidden`}>
                <div>{p.id}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div>{p.name}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell} md:table-cell hidden`}>
                <div>{p.university}</div>
              </TableCell>
              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.year}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell} lg:table-cell hidden`}>
                <div>{p.prepping}</div>
              </TableCell>
              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.subject}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex justify-center gap-3  ">
                  <Link
                    to={`/admin/student-profile/${p.id}/${slugify(p.name)}`}
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

export default AllStudentProfileTable;
