import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Protocol } from "../../types/defi";
import { formatCurrency, formatAPY } from "../../utils/defiHelpers";

interface ProtocolCardDetailProps {
  protocol: Protocol;
}

/**
 * ProtocolCardDetail component for blockchain detail page
 * Matches the provided design with detailed metrics and verification badges
 */
export const ProtocolCardDetail: React.FC<ProtocolCardDetailProps> = ({
  protocol,
}) => {
  const getVerificationIcon = () => {
    // Determine verification status based on risk level
    if (protocol.riskLevel === "low") {
      return {
        icon: "material-symbols:verified-user",
        color: "text-[#ccff00]",
        title: "Audited & Verified",
      };
    } else if (protocol.riskLevel === "medium") {
      return {
        icon: "material-symbols:gpp-maybe",
        color: "text-yellow-500",
        title: "Caution advised",
      };
    } else {
      return {
        icon: "material-symbols:shield",
        color: "text-[#888888]",
        title: "Standard",
      };
    }
  };

  const verification = getVerificationIcon();
  const riskBars = getRiskBars(protocol.riskLevel);

  return (
    <Link
      to={`/hub/protocol/${protocol.slug || protocol.id}`}
      className="group flex flex-col rounded-sm border border-[#222222] bg-[#111111] p-6 hover:border-[#ccff00] transition-all duration-300 hover:shadow-[0_0_15px_rgba(204,255,0,0.1)] relative overflow-hidden"
    >
      {/* Top gradient line on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-black border border-[#222222] rounded-sm size-14 p-2 flex items-center justify-center shrink-0">
            {protocol.logo ? (
              <div
                className="size-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${protocol.logo}')` }}
              />
            ) : (
              <span
                className="text-[#ccff00] font-bold text-lg"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                {protocol.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h4
              className="text-white font-bold text-lg uppercase tracking-wide group-hover:text-[#ccff00] transition-colors"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              {protocol.name}
            </h4>
            <span
              className="text-[#ccff00] text-[10px] font-bold uppercase tracking-widest bg-[#ccff00]/10 border border-[#ccff00]/20 px-2 py-0.5 rounded-sm mt-1 inline-block"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              {protocol.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div title={verification.title}>
            <Icon
              icon={verification.icon}
              className={verification.color}
              width={20}
            />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 p-4 rounded-sm bg-black/40 border border-[#222222]">
        <div>
          <p
            className="text-[#888888] text-[10px] uppercase font-bold tracking-widest mb-1"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            TVL
          </p>
          <p
            className="text-white font-bold text-lg tracking-tight"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            {formatCurrency(protocol.tvl, 1)}
          </p>
        </div>
        <div className="text-right">
          <p
            className="text-[#888888] text-[10px] uppercase font-bold tracking-widest mb-1"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            {protocol.category === "Liquid Staking" ? "Staking APY" : protocol.category === "Lending" ? "Supply APY" : "Max APY"}
          </p>
          <p
            className="text-[#ccff00] font-bold text-lg tracking-tight"
            style={{ fontFamily: 'Syncopate, sans-serif', textShadow: '0 0 5px rgba(204,255,0,0.5)' }}
          >
            {protocol.apy ? formatAPY(protocol.apy) : "--"}
          </p>
        </div>
        <div>
          <p
            className="text-[#888888] text-[10px] uppercase font-bold tracking-widest mb-1"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            {protocol.category === "Lending" ? "Borrows" : "Vol (24h)"}
          </p>
          <p className="text-white font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {protocol.volume24h ? formatCurrency(protocol.volume24h, 1) : "--"}
          </p>
        </div>
        <div className="text-right">
          <p
            className="text-[#888888] text-[10px] uppercase font-bold tracking-widest mb-1"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            Risk Score
          </p>
          <div className="flex justify-end items-center gap-2 text-[#ccff00] text-xs font-bold uppercase tracking-wider">
            <div className="flex gap-0.5">
              {riskBars.map((bar, index) => (
                <span
                  key={index}
                  className={`w-1 h-3 rounded-[1px] ${bar}`}
                ></span>
              ))}
            </div>
            <span style={{ fontFamily: 'Syncopate, sans-serif' }}>
              {protocol.riskLevel === "low"
                ? "Low"
                : protocol.riskLevel === "medium"
                ? "Medium"
                : protocol.riskLevel === "high"
                ? "High"
                : "Very High"}
            </span>
          </div>
        </div>
      </div>

      {/* View Protocol Button */}
      <button
        className="mt-auto w-full py-3 rounded-none bg-[#0a0a0a] border border-[#222222] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-colors flex items-center justify-center gap-2 group-hover:translate-y-[-2px] transform duration-200"
        style={{ fontFamily: 'Syncopate, sans-serif' }}
      >
        View Protocol
        <Icon icon="material-symbols:arrow-forward" width={16} />
      </button>
    </Link>
  );
};

/**
 * Get risk level bars for visualization
 */
function getRiskBars(riskLevel: Protocol["riskLevel"]): string[] {
  switch (riskLevel) {
    case "low":
      return ["bg-[#ccff00]", "bg-[#ccff00]", "bg-[#ccff00]/30"];
    case "medium":
      return ["bg-yellow-500", "bg-yellow-500/30", "bg-yellow-500/30"];
    case "high":
      return ["bg-red-500", "bg-red-500/30", "bg-red-500/30"];
    case "very-high":
      return ["bg-red-600", "bg-red-600/30", "bg-red-600/30"];
    default:
      return ["bg-[#888888]", "bg-[#888888]/30", "bg-[#888888]/30"];
  }
}

