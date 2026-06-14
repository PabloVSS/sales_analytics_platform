import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueChart({ data }: any) {
  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h2 className="font-bold mb-2">Revenue</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}