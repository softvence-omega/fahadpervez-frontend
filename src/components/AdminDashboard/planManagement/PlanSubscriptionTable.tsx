import CommonButton from "@/common/button/CommonButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type FC } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

export interface SubscriptionData {
  id: number;
  user: string;
  plan: "Standard" | "Elite" | string;
  status: "Active" | "Deactive" | string;

  nextBilling: string;
  revenue: string;
}

interface PlanSubscriptionTableProps {
  subscription: SubscriptionData[];
  onDelete?: (provider: SubscriptionData) => void;
}
const tableHeaders = [
  { label: "User", align: "text-left md:table-cell hidden" },
  { label: "Plan", align: "text-center" },
  { label: "Status", align: "text-center" },
  { label: "Next Billing", align: "text-center lg:table-cell hidden" },
  { label: "Revenue", align: "text-center lg:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};
const PlanSubscriptionTable: FC<PlanSubscriptionTableProps> = ({
  subscription,
  onDelete,
}) => {
  return (
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
        {subscription.map((p) => (
          <TableRow key={p.id} className={tableDesign.bodyRow}>
            <TableCell
              className={`hidden md:table-cell !text-left ${tableDesign.cell}`}
            >
              <div>{p.user}</div>
            </TableCell>
            <TableCell className={` ${tableDesign.cell}`}>
              <div>{p.plan}</div>
            </TableCell>
            <TableCell className={` ${tableDesign.cell}`}>
              <CommonButton
                className={
                  p.status === "Active" ? "!bg-[#F0FDF4] !text-[#15803D]" : ""
                }
              >
                {p.status}
              </CommonButton>
            </TableCell>
            <TableCell className={`hidden lg:table-cell ${tableDesign.cell}`}>
              <div>{p.nextBilling}</div>
            </TableCell>
            <TableCell className={` hidden lg:table-cell ${tableDesign.cell}`}>
              <div>{p.revenue}</div>
            </TableCell>
            <TableCell className={` ${tableDesign.cell}`}>
              <div className="flex justify-center gap-3 text-[#B91C1C] ">
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

export default PlanSubscriptionTable;
