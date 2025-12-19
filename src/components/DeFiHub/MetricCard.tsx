import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  className?: string;
}

/**
 * MetricCard component for displaying key metrics
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`bg-bgColor border border-borderColor rounded-lg p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-bodyTextDim text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-bodyText">{value}</h3>
          {subtitle && (
            <p className="text-bodyTextDim text-xs mt-1">{subtitle}</p>
          )}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-3">
          <span
            className={`text-sm ${
              trend.isPositive ? "text-primary" : "text-red-500"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        </div>
      )}
    </div>
  );
};


