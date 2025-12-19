import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Blockchain } from "../../types/defi";
import { formatCurrency } from "../../utils/defiHelpers";

interface BlockchainCardProps {
  blockchain: Blockchain;
}

/**
 * BlockchainCard component matching the provided design
 */
export const BlockchainCard: React.FC<BlockchainCardProps> = ({
  blockchain,
}) => {
  const [imageError, setImageError] = useState(false);

  const renderLogo = () => {
    // If image failed to load, show fallback
    if (imageError || !blockchain.logo) {
      if (blockchain.id === "base") {
        return (
          <div className="w-10 h-10 rounded-sm bg-[#0052FF] flex items-center justify-center text-white font-bold text-xs" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            B
          </div>
        );
      }
      return (
        <div className="w-10 h-10 bg-white/5 p-1 rounded-sm flex items-center justify-center">
          <span className="text-[#ccff00] font-bold text-xs" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {blockchain.symbol.charAt(0)}
          </span>
        </div>
      );
    }

    // Try to load the logo
    return (
      <img
        alt={`${blockchain.name} logo`}
        className="w-10 h-10 bg-white/5 p-1 rounded-sm object-contain"
        src={blockchain.logo}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <Link to={`/hub/blockchain/${blockchain.id}`} className="group relative flex flex-col gap-4 bg-[#0a0a0a] border border-[#222222] p-6 hover:border-[#ccff00] hover:shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all duration-300 cursor-pointer">
      {/* Top gradient line on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {renderLogo()}
          <h3 className="text-white text-lg font-bold uppercase tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {blockchain.name}
          </h3>
        </div>
        <Icon
          icon="material-symbols:arrow-outward"
          className="text-[#222222] group-hover:text-[#ccff00] transition-colors"
          width={20}
        />
      </div>
      
      <div className="h-px w-full bg-[#222222] group-hover:bg-[#ccff00]/30 transition-colors"></div>
      
      <div className="flex flex-col gap-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
        <div className="flex justify-between items-center">
          <span className="text-[#888888] text-sm uppercase tracking-wide">Active Protocols</span>
          <span className="text-white text-base font-bold">{blockchain.protocolCount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#888888] text-sm uppercase tracking-wide">TVL</span>
          <span className="text-[#ccff00] text-lg font-bold font-mono">
            {formatCurrency(blockchain.totalTvl, 1)}
          </span>
        </div>
      </div>
    </Link>
  );
};
