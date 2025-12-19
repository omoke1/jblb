import type { RiskLevel } from "../../types/defi";
import { getRiskColor } from "../../utils/defiHelpers";

interface RiskIndicatorProps {
  riskLevel: RiskLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * RiskIndicator component for visualizing risk levels
 */
export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  riskLevel,
  showLabel = true,
  size = "md",
}) => {
  const color = getRiskColor(riskLevel);
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const labelMap: Record<RiskLevel, string> = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    "very-high": "Very High Risk",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-full`}
        style={{ backgroundColor: color }}
      />
      {showLabel && (
        <span className="text-sm text-bodyTextDim">{labelMap[riskLevel]}</span>
      )}
    </div>
  );
};


