import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";

const data = [
  { month: "Jan", value: 78 },
  { month: "Feb", value: 95 },
  { month: "Mar", value: 75 },
  { month: "Apr", value: 140 },
  { month: "May", value: 98 },
  { month: "Jun", value: 145 },
  { month: "Jul", value: 85 },
  { month: "Aug", value: 150 },
];

const PlatformUsageChart = () => {
  return (
    <CommonBorderWrapper>
      <CommonHeader className="!text-lg mb-7.5">
        Platform Usage Trends
      </CommonHeader>

      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            padding={{ top: 0, bottom: 0 }}
            width={40}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2dd4bf"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </CommonBorderWrapper>
  );
};

export default PlatformUsageChart;
