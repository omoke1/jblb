import { Link } from "react-router-dom";
import type { Protocol } from "../../types/defi";
import { formatCurrency, formatAPY, getCategoryColor } from "../../utils/defiHelpers";
import { RiskIndicator } from "./RiskIndicator";

interface ProtocolCardProps {
  protocol: Protocol;
  showChain?: boolean;
}

/**
 * ProtocolCard component for displaying protocol information
 */
export const ProtocolCard: React.FC<ProtocolCardProps> = ({
  protocol,
  showChain = false,
}) => {
  const categoryColor = getCategoryColor(protocol.category);

  return (
    <Link
      to={`/hub/protocol/${protocol.slug || protocol.id}`}
      className="block group"
    >
      <div className="bg-bgColor border border-borderColor rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_2px_rgba(169,239,46,0.2)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {protocol.logo ? (
              <img
                src={protocol.logo}
                alt={protocol.name}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${categoryColor}20` }}
              >
                <span
                  className="font-bold text-lg"
                  style={{ color: categoryColor }}
                >
                  {protocol.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-bodyText group-hover:text-primary transition-colors">
                {protocol.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                  }}
                >
                  {protocol.category}
                </span>
                {showChain && protocol.chains.length > 0 && (
                  <span className="text-xs text-bodyTextDim">
                    {protocol.chains[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
          <RiskIndicator riskLevel={protocol.riskLevel} size="sm" showLabel={false} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-bodyTextDim mb-1">TVL</p>
            <p className="text-base font-semibold text-bodyText">
              {formatCurrency(protocol.tvl)}
            </p>
            {protocol.tvlChange24h !== undefined && (
              <p
                className={`text-xs mt-1 ${
                  protocol.tvlChange24h >= 0 ? "text-primary" : "text-red-500"
                }`}
              >
                {protocol.tvlChange24h >= 0 ? "+" : ""}
                {protocol.tvlChange24h.toFixed(2)}%
              </p>
            )}
          </div>
          {protocol.apy && (
            <div>
              <p className="text-xs text-bodyTextDim mb-1">APY</p>
              <p className="text-base font-semibold text-bodyText">
                {formatAPY(protocol.apy)}
              </p>
            </div>
          )}
          {protocol.volume24h && (
            <div>
              <p className="text-xs text-bodyTextDim mb-1">24h Volume</p>
              <p className="text-base font-semibold text-bodyText">
                {formatCurrency(protocol.volume24h)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};


