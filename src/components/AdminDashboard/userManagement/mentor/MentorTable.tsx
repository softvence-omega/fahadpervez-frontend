import image from "@/assets/home/image.svg";
import pdf from "@/assets/home/pdf.png";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonDropdown from "@/common/custom/CommonDropdown";
import Pagination from "@/common/custom/Pagination";
import CommonHeader from "@/common/header/CommonHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { slugify } from "@/help/help";
import { FC } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronDownSharp } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Mentor } from "./data";
const dropdownItems = [
  { label: "Edit" },
  { label: "Delete" },
  { label: "Share" },
];

const tableHeaders = [
  { label: "SL", align: "text-left sm:table-cell hidden" },
  { label: "Name", align: "text-center" },
  { label: "Medical Specialty", align: "text-center xl:table-cell hidden" },
  { label: "Experience", align: "text-center xl:table-cell hidden" },
  { label: "Documents(Govt id)", align: "text-center lg:table-cell hidden" },
  { label: "Bank Account", align: "text-center sm:table-cell hidden" },
  { label: "Action", align: "text-center" },
];
interface AllStudentProfileTable {
  mentor: Mentor[];
}

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const MentorTable: FC<AllStudentProfileTable> = ({ mentor }) => {
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <CommonHeader>Mentor Profile</CommonHeader>
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
          {mentor.map((p) => (
            <TableRow key={p.id} className={tableDesign.bodyRow}>
              <TableCell className={`sm:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.id}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div>{p.name}</div>
              </TableCell>
              <TableCell
                className={`xl:table-cell hidden  ${tableDesign.cell}`}
              >
                <div>{p.Specialty}</div>
              </TableCell>
              <TableCell className={`xl:table-cell hidden ${tableDesign.cell}`}>
                <div>{p.experience}</div>
              </TableCell>
              <TableCell className={`lg:table-cell hidden ${tableDesign.cell}`}>
                <div className="flex justify-center gap-1">
                  <img src={pdf} alt="" />
                  <img src={image} alt="" />
                </div>
              </TableCell>
              <TableCell
                className={` sm:table-cell hidden ${tableDesign.cell}`}
              >
                <div>{p.bankAccount}</div>
              </TableCell>
              <TableCell className={`${tableDesign.cell}`}>
                <div className="flex justify-center gap-3  ">
                  <Link
                    to={`/admin/mentor-profile/${p.id}/${slugify(p.name)}`}
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

export default MentorTable;
