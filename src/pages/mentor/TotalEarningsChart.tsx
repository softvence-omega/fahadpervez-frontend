// TotalEarningsChart.tsx
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function TotalEarningsChart() {
  const data = [
    { month: "Jan", amount: 4000 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 2000 },
    { month: "Apr", amount: 2780 },
    { month: "May", amount: 1890 },
    { month: "Jun", amount: 2390 },
    { month: "Jul", amount: 3490 },
    { month: "Aug", amount: 3100 },
    { month: "Sep", amount: 4200 },
    { month: "Oct", amount: 3700 },
    { month: "Nov", amount: 4500 },
    { month: "Dec", amount: 4800 },
  ];

  return (
    <div className="w-full h-[500px] bg-[#EFF6FF99] border border-blue-300 p-8 rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Background grid (solid lines only) */}
          <CartesianGrid stroke="#E5E7EB" />

          {/* X axis → months */}
          <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 12 }} />

          {/* Y axis → amounts */}
          <YAxis stroke="#374151" tick={{ fontSize: 12 }} />

          {/* Tooltip */}
          {/* <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Earnings"]}
          /> */}

          {/* Straight line (solid design) */}
          <Line
            type="linear"
            dataKey="amount"
            stroke="#C2410C"
            strokeWidth={2}
            // dot={{ r: 4, fill: "#0076F5" }}
            activeDot={{ r: 6, fill: "#1D4ED8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
