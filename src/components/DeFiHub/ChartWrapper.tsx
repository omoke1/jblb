import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { TVLDataPoint } from "../../types/defi";
import { formatCurrency } from "../../utils/defiHelpers";

interface ChartWrapperProps {
  data: TVLDataPoint[];
  title?: string;
  height?: number;
}

/**
 * ChartWrapper component for displaying TVL and volume charts
 */
export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  data,
  title,
  height = 300,
}) => {
  const chartData = data.map((point) => ({
    date: new Date(point.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: point.value,
  }));

  return (
    <div className="bg-bgColor border border-borderColor rounded-lg p-6">
      {title && (
        <h3 className="text-lg font-semibold text-bodyText mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#6B7280"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => formatCurrency(value, 1)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0F0F0F",
              border: "1px solid #1F1F1F",
              borderRadius: "8px",
              color: "#FFFFFF",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#A9EF2E"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


