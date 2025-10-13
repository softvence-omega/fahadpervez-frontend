import { type FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import CustomSwitch from "@/common/custom/CustomSwitch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export interface OverviewData {
  id: number;
  plan: string | "Free" | "Standard" | "Premium" | "Elite";
  pricing: string;
  subscribers: number;
  revenue: string;
  isAvailable: boolean;
}

interface PlanOverviewTableProps {
  overview: OverviewData[];
  onToggleAvailability?: (provider: OverviewData) => void;
  onDelete?: (provider: OverviewData) => void;
}
const tableHeaders = [
  { label: "Plan", align: "text-left" },
  { label: "Pricing", align: "text-center  hidden sm:table-cell" },
  { label: "Subscribers", align: "text-center hidden lg:table-cell" },
  { label: "Revenue", align: "text-center hidden md:table-cell" },
  { label: "Status", align: "text-center" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};
const PlanOverviewTable: FC<PlanOverviewTableProps> = ({
  overview,
  onToggleAvailability,
  onDelete,
}) => {
  return (
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
        {overview.map((p) => (
          <TableRow key={p.id} className={tableDesign.bodyRow}>
            <TableCell className={`!text-left ${tableDesign.cell}`}>
              <div>{p.plan}</div>
            </TableCell>
            <TableCell className={`hidden sm:table-cell   ${tableDesign.cell}`}>
              <div>{p.pricing}</div>
            </TableCell>
            <TableCell className={` hidden lg:table-cell ${tableDesign.cell}`}>
              <div>{p.subscribers}</div>
            </TableCell>
            <TableCell className={`hidden md:table-cell ${tableDesign.cell}`}>
              <div>{p.revenue}</div>
            </TableCell>
            <TableCell className={tableDesign.cell}>
              <div className=" flex justify-center">
                <CustomSwitch
                  checked={p.isAvailable}
                  onChange={() => onToggleAvailability?.(p)}
                />
              </div>
            </TableCell>

            <TableCell className={tableDesign.cell}>
              <div className="flex justify-center gap-3 text-[#B91C1C]">
                <span className="text-blue-500 cursor-pointer">
                  <BiSolidEdit size={24} />
                </span>
                <button
                  className="hover:text-red-800 cursor-pointer"
                  onClick={() => onDelete?.(p)}
                >
                  <RiDeleteBinLine size={24} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlanOverviewTable;
