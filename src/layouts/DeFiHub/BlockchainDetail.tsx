import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Blockchain, Protocol } from "../../types/defi";
import { fetchBlockchain, fetchProtocolsByChain, fetchBlockchainTokenPrice } from "../../services/defiApi";
import { formatCurrency } from "../../utils/defiHelpers";
import { filterProtocols, sortProtocols } from "../../utils/defiHelpers";
import type { ProtocolCategory, SortOption } from "../../types/defi";
import { ProtocolCardDetail } from "../../components/DeFiHub/ProtocolCardDetail";

/**
 * BlockchainDetail component matching the provided design
 */
export const BlockchainDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProtocolCategory | undefined>();
  const [sortOption, setSortOption] = useState<SortOption>("tvl-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [tokenPriceChange24h, setTokenPriceChange24h] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [blockchainData, protocolsData] = await Promise.all([
          fetchBlockchain(id),
          fetchProtocolsByChain(id),
        ]);
        setBlockchain(blockchainData);
        setProtocols(protocolsData);
        setFilteredProtocols(protocolsData);
        
        // Fetch token price from CoinGecko
        const priceData = await fetchBlockchainTokenPrice(
          blockchainData.id,
          blockchainData.name,
          blockchainData.symbol
        );
        if (priceData) {
          setTokenPrice(priceData.price);
          setTokenPriceChange24h(priceData.change24h);
        }
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  useEffect(() => {
    let filtered = [...protocols];

    if (selectedCategory || searchQuery) {
      filtered = filterProtocols(filtered, {
        category: selectedCategory,
        searchQuery,
      });
    }

    filtered = sortProtocols(filtered, sortOption);
    setFilteredProtocols(filtered);
  }, [protocols, selectedCategory, sortOption, searchQuery]);

  if (loading) {
    return (
      <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-8">
        <div className="text-center">
          <p className="text-[#888888]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!blockchain) {
    return (
      <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-8">
        <div className="text-center">
          <p className="text-[#888888] text-lg">Blockchain not found</p>
          <Link to="/hub" className="text-[#ccff00] mt-4 inline-block">
            Back to Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-8 relative">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-grid-pattern grid-bg"></div>
      <div className="relative z-10 w-full">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 w-full">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 px-0 py-2 mb-6">
          <Link
            to="/hub"
            className="text-[#888888] hover:text-[#ccff00] text-xs uppercase tracking-wider font-bold"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            Hub
          </Link>
          <span className="text-[#ccff00] text-xs font-bold">/</span>
          <span className="text-[#888888] text-xs uppercase tracking-wider font-bold" style={{ fontFamily: 'Syncopate, sans-serif' }}>
            Networks
          </span>
          <span className="text-[#ccff00] text-xs font-bold">/</span>
          <span className="text-white text-xs uppercase tracking-wider font-bold" style={{ fontFamily: 'Syncopate, sans-serif' }}>
            {blockchain.name}
          </span>
        </div>

        {/* Back Button */}
        <div className="flex px-0 py-1 justify-start mb-4">
          <Link
            to="/hub"
            className="flex cursor-pointer items-center justify-start overflow-hidden rounded-none h-10 pr-4 bg-transparent text-[#888888] hover:text-[#ccff00] gap-2 text-xs font-bold uppercase tracking-widest transition-colors -ml-4 pl-4"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            <Icon icon="material-symbols:arrow-back" width={18} />
            <span className="truncate">Back to Hub</span>
          </Link>
        </div>

        {/* Blockchain Info Card */}
        <div className="flex w-full mb-8">
          <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-start bg-[#111111] border border-[#222222] rounded-sm p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex gap-8 items-start relative z-10">
              <div className="bg-black border border-[#222222] p-4 rounded-sm h-28 w-28 flex-shrink-0 flex items-center justify-center shadow-lg">
                {blockchain.logo ? (
                  <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat filter brightness-125 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                    style={{ backgroundImage: `url('${blockchain.logo}')` }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#ccff00] font-bold text-2xl" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                      {blockchain.symbol.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <h1
                    className="text-white text-4xl font-bold leading-tight tracking-wide uppercase"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    {blockchain.name}{" "}
                    <span className="text-[#ccff00] text-2xl align-middle">
                      ({blockchain.symbol})
                    </span>
                  </h1>
                  <span
                    className={`hidden sm:flex ${
                      blockchain.status === "operational"
                        ? "bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30"
                        : "bg-red-500/10 text-red-500 border border-red-500/30"
                    } px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest items-center gap-2 shadow-[0_0_10px_rgba(204,255,0,0.2)]`}
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        blockchain.status === "operational" ? "bg-[#ccff00]" : "bg-red-500"
                      } animate-pulse shadow-[0_0_5px_#ccff00]`}
                    ></span>
                    {blockchain.status.charAt(0).toUpperCase() + blockchain.status.slice(1)}
                  </span>
                </div>
                <p
                  className="text-[#888888] text-sm font-light leading-relaxed max-w-xl mt-2 border-l-2 border-[#ccff00] pl-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Enterprise-grade public network for the decentralized economy. Highly scalable,
                  fast, and secure infrastructure designed for the next generation of web3.
                </p>
                <div className="flex sm:hidden mt-4">
                  <span
                    className={`flex ${
                      blockchain.status === "operational"
                        ? "bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30"
                        : "bg-red-500/10 text-red-500 border border-red-500/30"
                    } px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest items-center gap-2`}
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        blockchain.status === "operational" ? "bg-[#ccff00]" : "bg-red-500"
                      } animate-pulse`}
                    ></span>
                    {blockchain.status.charAt(0).toUpperCase() + blockchain.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 relative z-10">
              {blockchain.docsUrl && (
                <a
                  href={blockchain.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none h-10 px-6 rounded-none bg-[#0a0a0a] hover:bg-[#222222] text-white text-xs font-bold uppercase tracking-widest border border-[#222222] hover:border-[#ccff00] transition-all flex items-center justify-center gap-2 group/btn"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <Icon
                    icon="material-symbols:description"
                    className="text-[#888888] group-hover/btn:text-[#ccff00] transition-colors"
                    width={16}
                  />
                  Docs
                </a>
              )}
              {blockchain.explorerUrl && (
                <a
                  href={blockchain.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none h-10 px-6 rounded-none bg-[#0a0a0a] hover:bg-[#222222] text-white text-xs font-bold uppercase tracking-widest border border-[#222222] hover:border-[#ccff00] transition-all flex items-center justify-center gap-2 group/btn"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <Icon
                    icon="material-symbols:public"
                    className="text-[#888888] group-hover/btn:text-[#ccff00] transition-colors"
                    width={16}
                  />
                  Explorer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="flex flex-col gap-2 rounded-sm p-6 border border-[#222222] bg-[#111111] hover:border-[#ccff00]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-[#888888] text-xs font-bold uppercase tracking-widest group-hover:text-[#ccff00] transition-colors"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Total TVL
              </p>
              <Icon
                icon="material-symbols:account-balance-wallet"
                className="text-[#222222] group-hover:text-[#ccff00]/20 transition-colors"
                width={24}
              />
            </div>
            <p
              className="text-white text-3xl font-bold leading-tight tracking-tight drop-shadow-md"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              {formatCurrency(blockchain.totalTvl, 1)}
            </p>
            {blockchain.tvlChange7d !== undefined && (
              <p
                className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 mt-1 ${
                  blockchain.tvlChange7d >= 0 ? "text-[#ccff00]" : "text-red-500"
                }`}
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                <Icon 
                  icon={blockchain.tvlChange7d >= 0 ? "material-symbols:trending-up" : "material-symbols:trending-down"} 
                  width={14} 
                />
                {blockchain.tvlChange7d >= 0 ? "+" : ""}
                {blockchain.tvlChange7d.toFixed(1)}%
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 rounded-sm p-6 border border-[#222222] bg-[#111111] hover:border-[#ccff00]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-[#888888] text-xs font-bold uppercase tracking-widest group-hover:text-[#ccff00] transition-colors"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Token Price
              </p>
              <Icon
                icon="material-symbols:attach-money"
                className="text-[#222222] group-hover:text-[#ccff00]/20 transition-colors"
                width={24}
              />
            </div>
            <p
              className="text-white text-3xl font-bold leading-tight tracking-tight drop-shadow-md"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              {tokenPrice !== null
                ? `$${tokenPrice >= 1 
                    ? tokenPrice.toFixed(2) 
                    : tokenPrice.toFixed(6)}`
                : "N/A"}
            </p>
            {tokenPriceChange24h !== null && (
              <p
                className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 mt-1 ${
                  tokenPriceChange24h >= 0 ? "text-[#ccff00]" : "text-red-500"
                }`}
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                <Icon 
                  icon={tokenPriceChange24h >= 0 ? "material-symbols:trending-up" : "material-symbols:trending-down"} 
                  width={14} 
                />
                {tokenPriceChange24h >= 0 ? "+" : ""}
                {tokenPriceChange24h.toFixed(2)}%
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 rounded-sm p-6 border border-[#222222] bg-[#111111] hover:border-[#ccff00]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-[#888888] text-xs font-bold uppercase tracking-widest group-hover:text-[#ccff00] transition-colors"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Avg. Gas Fee
              </p>
              <Icon
                icon="material-symbols:local-gas-station"
                className="text-[#222222] group-hover:text-[#ccff00]/20 transition-colors"
                width={24}
              />
            </div>
            <p
              className="text-white text-3xl font-bold leading-tight tracking-tight drop-shadow-md"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              {blockchain.gasFee !== undefined && blockchain.gasFee < 0.001
                ? "< $0.001"
                : blockchain.gasFee !== undefined
                ? `$${blockchain.gasFee.toFixed(3)}`
                : "N/A"}
            </p>
            <p
              className="text-[#888888] text-xs font-bold uppercase tracking-wide mt-1"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              Stable
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-sm p-6 border border-[#222222] bg-[#111111] hover:border-[#ccff00]/30 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <p
                className="text-[#888888] text-xs font-bold uppercase tracking-widest group-hover:text-[#ccff00] transition-colors"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Performance
              </p>
              <Icon
                icon="material-symbols:speed"
                className="text-[#222222] group-hover:text-[#ccff00]/20 transition-colors"
                width={24}
              />
            </div>
            <p
              className="text-white text-3xl font-bold leading-tight tracking-tight drop-shadow-md"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              ~10k TPS
            </p>
            <p
              className="text-[#ccff00] text-xs font-bold uppercase tracking-wide flex items-center gap-1 mt-1"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              <span className="size-2 rounded-full bg-[#ccff00] shadow-[0_0_5px_#ccff00]"></span>
              Optimal
            </p>
          </div>
        </div>

        {/* Protocol Directory */}
        <div className="mt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#222222] pb-6">
            <div>
              <h3
                className="text-white text-2xl font-bold uppercase tracking-wide"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Protocol Directory
              </h3>
              <p
                className="text-[#888888] text-sm mt-2 font-light"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Explore top DeFi applications built on {blockchain.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon
                    icon="material-symbols:search"
                    className="text-[#888888] group-focus-within:text-[#ccff00] transition-colors"
                    width={18}
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#111111] border border-[#222222] text-white text-xs font-bold uppercase tracking-wide rounded-none focus:ring-1 focus:ring-[#ccff00] focus:border-[#ccff00] block w-full md:w-56 pl-10 p-3 placeholder-[#888888] transition-colors"
                  placeholder="Search protocol..."
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                />
              </div>
              <div className="relative">
                <select
                  value={selectedCategory || ""}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value ? (e.target.value as ProtocolCategory) : undefined
                    )
                  }
                  className="bg-[#111111] border border-[#222222] text-white text-xs font-bold uppercase tracking-wide rounded-none focus:ring-1 focus:ring-[#ccff00] focus:border-[#ccff00] block w-full p-3 pr-8 appearance-none cursor-pointer hover:bg-[#222222] transition-colors"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <option value="">All Categories</option>
                  <option value="DEX">DEX</option>
                  <option value="Lending">Lending</option>
                  <option value="Yield">Yield</option>
                  <option value="Liquid Staking">Liquid Staking</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Icon icon="material-symbols:expand-more" className="text-[#ccff00]" width={20} />
                </div>
              </div>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-[#111111] border border-[#222222] text-white text-xs font-bold uppercase tracking-wide rounded-none focus:ring-1 focus:ring-[#ccff00] focus:border-[#ccff00] block w-full p-3 pr-8 appearance-none cursor-pointer hover:bg-[#222222] transition-colors"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <option value="tvl-desc">Sort by TVL</option>
                  <option value="apy-desc">Sort by APY</option>
                  <option value="volume-desc">Sort by Volume</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Icon icon="material-symbols:sort" className="text-[#ccff00]" width={20} />
                </div>
              </div>
            </div>
          </div>

          {filteredProtocols.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#888888] text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                No protocols found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              {filteredProtocols.map((protocol) => (
                <ProtocolCardDetail key={protocol.id} protocol={protocol} />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
