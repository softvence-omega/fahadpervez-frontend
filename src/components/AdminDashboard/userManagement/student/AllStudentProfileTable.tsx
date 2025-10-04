import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import CommonHeader from "@/common/header/CommonHeader";
import { IoFilterSharp } from "react-icons/io5";
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
const tableHeaders = [
  { label: "SL", align: "text-left" },
  { label: "Name", align: "text-center" },
  { label: "University", align: "text-center" },
  { label: "Year", align: "text-center" },
  { label: "Prepping For", align: "text-center" },
  { label: "Subject Preferred", align: "text-center" },
  { label: "Action", align: "text-center" },
];
interface AllStudentProfileTable {
  students: Students[];
}

const AllStudentProfileTable: FC<AllStudentProfileTable> = ({ students }) => {
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Student Profile</CommonHeader>
        <CommonDropdown
          items={dropdownItems}
          trigger={<ButtonWithIcon icon={IoFilterSharp}>Filter</ButtonWithIcon>}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className=" text-lg font-geist text-[#2C2C2C] font-medium">
            {tableHeaders.map((header) => (
              <TableHead
                key={header.label}
                className={`border border-border ${header.align} px-4`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((p) => (
            <TableRow
              key={p.id}
              className="hover:bg-gray-50 text-[#2C2C2C] font-inter text-sm font-normal"
            >
              <TableCell className="border border-border px-4">
                <div>{p.id}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.name}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.university}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.year}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.prepping}</div>
              </TableCell>
              <TableCell className="border border-border text-center">
                <div>{p.subject}</div>
              </TableCell>
              <TableCell className="border border-border">
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
