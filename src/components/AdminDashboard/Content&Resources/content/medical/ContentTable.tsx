import CustomSwitch from "@/common/custom/CustomSwitch";
import TableAction from "@/components/reusable/TableAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ContentCategory, tableData } from "./data/data";

const tableHeaders = [
  { label: "ID", align: "text-center hidden sm:table-cell" },
  { label: "Name", align: "text-center" },
  { label: "Type", align: "text-center hidden xl:table-cell" },
  { label: "Status", align: "text-center hidden xl:table-cell" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12",
  cell: "border border-border px-4 text-center",
};

interface ContentTableProps {
  type: ContentCategory;
}

const ContentTable: React.FC<ContentTableProps> = ({ type }) => {
  const data = tableData[type];
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className={tableDesign.header}>
            <TableHead className={`${tableDesign.cellHeader} text-center`}>
              <input
                type="checkbox"
                checked={selectedRows.length === data.length}
                onChange={toggleAll}
              />
            </TableHead>

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
          {data.map((item) => (
            <TableRow key={item.id} className={tableDesign.bodyRow}>
              {/* Row Checkbox */}
              <TableCell className={tableDesign.cell}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => toggleRow(item.id)}
                />
              </TableCell>

              <TableCell className={`${tableDesign.cell} hidden sm:table-cell`}>
                {item.id}
              </TableCell>
              <TableCell className={tableDesign.cell}>{item.name}</TableCell>
              <TableCell className={`${tableDesign.cell} hidden xl:table-cell`}>
                {item.type}
              </TableCell>
              <TableCell className={`${tableDesign.cell} hidden xl:table-cell`}>
                <div className="flex items-center justify-center gap-2">
                  <CustomSwitch
                    checked={item.status === "Published"}
                    onChange={() => {}}
                  />
                  <div>{item.status}</div>
                </div>
              </TableCell>
              <TableCell className={tableDesign.cell}>
                <div className="flex justify-center">
                  <TableAction />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentTable;
