"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";

interface EngagementData {
  day: string;
  session: number;
  completion: number;
}

const data: EngagementData[] = [
  { day: "Sat", session: 350, completion: 520 },
  { day: "Sun", session: 450, completion: 720 },
  { day: "Mon", session: 460, completion: 720 },
  { day: "Tue", session: 450, completion: 730 },
  { day: "Wed", session: 450, completion: 720 },
  { day: "Thu", session: 450, completion: 720 },
  { day: "Fri", session: 450, completion: 720 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{ color: entry.color }}
            className="text-sm font-medium"
          >
            {entry.dataKey === "session" ? "Session" : "Compleation"}:
            {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MentorShip = () => {
  return (
    <CommonBorderWrapper className="w-full">
      <CommonHeader className="!text-lg mb-7.5">
        Mentorship Engagement
      </CommonHeader>
      <div>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="day"
              tick={{ fill: "#000", fontSize: 20, fontWeight: 400 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 0, right: 0 }}
            />

            <YAxis
              tick={{ fill: "#000", fontSize: 20, fontWeight: 400 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 1000]}
              ticks={[0, 250, 500, 750, 1000]}
              padding={{ top: 0, bottom: 0 }}
              width={50}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="session"
              fill="#ec4899"
              name="Session"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completion"
              fill="#3b82f6"
              name="Completion"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CommonBorderWrapper>
  );
};

export default MentorShip;
