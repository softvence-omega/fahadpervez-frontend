import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";

type DataItem = {
  name: string;
  user: number;
};

const data: DataItem[] = [
  { name: "Jan", user: 500 },
  { name: "Feb", user: 900 },
  { name: "Mar", user: 750 },
  { name: "Apr", user: 400 },
  { name: "May", user: 250 },
  { name: "Jun", user: 650 },
  { name: "July", user: 620 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0, color: "red" }}>User: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ActiveUserChart: React.FC = () => {
  return (
    <CommonBorderWrapper>
      <CommonHeader className="!text-lg mb-7.5">Active User</CommonHeader>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }} // remove chart margins
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            domain={[0, 1000]}
            axisLine={false}
            tickLine={false}
            width={40}
            padding={{ top: 0, bottom: 0 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="user"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5, fill: "#2563eb" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CommonBorderWrapper>
  );
};

export default ActiveUserChart;
