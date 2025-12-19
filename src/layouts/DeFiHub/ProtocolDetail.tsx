import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Protocol, RiskData, ProtocolMetrics } from "../../types/defi";
import {
  fetchProtocol,
  fetchProtocolMetrics,
  fetchRiskData,
} from "../../services/defiApi";
import { formatCurrency } from "../../utils/defiHelpers";

/**
 * ProtocolDetail component matching the provided design
 */
export const ProtocolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [metrics, setMetrics] = useState<ProtocolMetrics | null>(null);
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<"1W" | "1M" | "1Y" | "ALL">("1Y");

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        console.log("Fetching protocol with ID:", id);
        const [protocolData, metricsData, riskDataResult] = await Promise.all([
          fetchProtocol(id),
          fetchProtocolMetrics(id),
          fetchRiskData(id),
        ]);
        console.log("Protocol found:", protocolData);
        console.log("Metrics found:", metricsData);
        setProtocol(protocolData);
        setMetrics(metricsData);
        setRiskData(riskDataResult);
      } catch (error) {
        console.error("Error loading protocol data:", error);
        // Keep loading false so error message shows
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center w-full px-4 md:px-10 py-8">
        <div className="text-center">
          <p className="text-[#888888]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!protocol) {
    return (
      <div className="flex-1 flex flex-col items-center w-full px-4 md:px-10 py-8">
        <div className="text-center">
          <p className="text-[#888888] text-lg">Protocol not found</p>
          <Link to="/hub" className="text-[#ccff00] mt-4 inline-block">
            Back to Hub
          </Link>
        </div>
      </div>
    );
  }

  const chainColors: Record<string, string> = {
    Ethereum: "#627eea",
    Arbitrum: "#28a0f0",
    Polygon: "#8247e5",
    Optimism: "#ff0420",
    Base: "#0052FF",
    Solana: "#14F195",
    BNB: "#F3BA2F",
    Avalanche: "#E84142",
  };

  // Generate chart path from real TVL data
  const generateChartPath = () => {
    if (!metrics || !metrics.tvlHistory || metrics.tvlHistory.length === 0) {
      return { path: "", areaPath: "", maxValue: 0, minValue: 0 };
    }

    // Filter data based on timeFilter
    const now = new Date();
    let filteredData = [...metrics.tvlHistory];
    
    if (timeFilter === "1W") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredData = metrics.tvlHistory.filter(
        (point) => new Date(point.date) >= weekAgo
      );
    } else if (timeFilter === "1M") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filteredData = metrics.tvlHistory.filter(
        (point) => new Date(point.date) >= monthAgo
      );
    } else if (timeFilter === "1Y") {
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      filteredData = metrics.tvlHistory.filter(
        (point) => new Date(point.date) >= yearAgo
      );
    }
    // "ALL" uses all data

    if (filteredData.length === 0) {
      filteredData = metrics.tvlHistory;
    }

    // Find min and max values for scaling
    const values = filteredData.map((d) => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const valueRange = maxValue - minValue || 1;

    // Chart dimensions
    const width = 800;
    const height = 300;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Generate path
    const points = filteredData.map((point, index) => {
      const x = padding + (index / (filteredData.length - 1 || 1)) * chartWidth;
      const y =
        padding +
        chartHeight -
        ((point.value - minValue) / valueRange) * chartHeight;
      return { x, y, value: point.value, date: point.date };
    });

    // Create smooth path using quadratic curves
    let path = `M ${points[0].x} ${points[0].y}`;
    let areaPath = `M ${points[0].x} ${height - padding}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;

      if (i === 0) {
        path += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
        areaPath += ` L ${current.x} ${current.y} Q ${current.x} ${current.y} ${midX} ${midY}`;
      } else {
        path += ` T ${midX} ${midY}`;
        areaPath += ` T ${midX} ${midY}`;
      }
    }

    // Complete the paths
    const lastPoint = points[points.length - 1];
    path += ` T ${lastPoint.x} ${lastPoint.y}`;
    areaPath += ` T ${lastPoint.x} ${lastPoint.y} L ${lastPoint.x} ${height - padding} Z`;

    return { path, areaPath, maxValue, minValue, points };
  };

  const chartData = generateChartPath();

  // Yield pools data - DeFiLlama doesn't provide pool-level data in their API
  // This would need to be fetched from protocol-specific APIs if available
  const yieldPools: Array<{
    pair: string;
    fee: string;
    tvl: number;
    volume24h: number;
    apr: number;
    token1: string;
    token2: string;
  }> = [];

  return (
    <div className="flex-1 flex flex-col items-center w-full px-4 md:px-10 py-8 relative">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-grid-pattern grid-bg"></div>
      
      <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1 gap-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 px-1">
          <Link
            to="/hub"
            className="text-[#888888] text-xs font-bold uppercase hover:text-[#ccff00] transition-colors"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            Hub
          </Link>
          <span className="text-[#888888] text-xs font-bold">/</span>
          {protocol.chains && protocol.chains.length > 0 ? (() => {
            // Normalize chain name to match blockchain ID format
            const chainName = protocol.chains[0];
            const chainIdMap: Record<string, string> = {
              Ethereum: "ethereum",
              "BSC": "bsc",
              "BNB Chain": "bsc",
              Solana: "solana",
              Arbitrum: "arbitrum",
              Base: "base",
              Avalanche: "avalanche",
              Tron: "tron",
              Sui: "sui",
              Hedera: "hedera",
              Bitcoin: "bitcoin",
            };
            const normalizedChainId = chainIdMap[chainName] || chainName.toLowerCase().replace(/\s+/g, "-");
            
            return (
              <Link
                to={`/hub/blockchain/${normalizedChainId}`}
                className="text-[#888888] text-xs font-bold uppercase hover:text-[#ccff00] transition-colors"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Protocols
              </Link>
            );
          })() : (
            <span
              className="text-[#888888] text-xs font-bold uppercase hover:text-[#ccff00] transition-colors"
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              Protocols
            </span>
          )}
          <span className="text-[#888888] text-xs font-bold">/</span>
          <span
            className="text-white text-xs font-bold uppercase"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            {protocol.name}
          </span>
        </div>

        {/* Protocol Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl h-24 w-24 ring-1 ring-[#2a2a2a] shadow-[0_0_30px_rgba(204,255,0,0.1)]"
                style={{
                  backgroundImage: protocol.logo
                    ? `url('${protocol.logo}')`
                    : "none",
                  backgroundColor: protocol.logo ? "transparent" : "#1a1a1a",
                }}
              >
                {!protocol.logo && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="text-[#ccff00] font-bold text-2xl"
                      style={{ fontFamily: 'Syncopate, sans-serif' }}
                    >
                      {protocol.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center gap-2">
                <h1
                  className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight flex items-center gap-3 uppercase"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  {protocol.name}{" "}
                  <span className="text-[#ccff00] text-2xl font-normal tracking-wide">
                    ({protocol.name.substring(0, 3).toUpperCase()})
                  </span>
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="px-2 py-0.5 rounded border border-[#ccff00] text-[#ccff00] text-[10px] font-bold uppercase tracking-widest bg-[#ccff00]/10"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Rank #1
                  </span>
                  <span
                    className="text-[#888888] text-sm font-medium"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {protocol.category} • Automated Market Maker
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {protocol.website && (
                <a
                  href={protocol.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded h-10 px-6 bg-[#ccff00] text-black text-xs font-bold uppercase hover:bg-white hover:text-black transition-all tracking-wider shadow-[0_0_15px_rgba(204,255,0,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <span>Visit Website</span>
                  <Icon icon="material-symbols:open-in-new" width={16} />
                </a>
              )}
              {protocol.docsUrl && (
                <a
                  href={protocol.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded h-10 px-6 bg-[#111111] text-white text-xs font-bold uppercase hover:bg-[#2a2a2a] transition-colors border border-[#2a2a2a] hover:border-[#888888] tracking-wider"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <span>Documentation</span>
                  <Icon icon="material-symbols:description" width={16} />
                </a>
              )}
              <div className="flex-1"></div>
              <div className="flex gap-2">
                {protocol.twitter && (
                  <a
                    href={protocol.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded bg-[#111111] border border-[#2a2a2a] flex items-center justify-center text-[#888888] hover:text-[#ccff00] hover:border-[#ccff00] transition-all"
                  >
                    <Icon icon="material-symbols:alternate-email" width={20} />
                  </a>
                )}
                <button className="h-10 w-10 rounded bg-[#111111] border border-[#2a2a2a] flex items-center justify-center text-[#888888] hover:text-[#ccff00] hover:border-[#ccff00] transition-all">
                  <Icon icon="material-symbols:forum" width={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Token Price & Market Cap Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col justify-between gap-1 rounded p-5 bg-[#111111] border border-[#2a2a2a] hover:border-[#ccff00]/30 transition-colors">
              <p
                className="text-[#888888] text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Token Price
              </p>
              <div>
                <p
                  className="text-white text-3xl font-bold leading-tight"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  {protocol.tokenPrice
                    ? formatCurrency(protocol.tokenPrice, 2)
                    : "N/A"}
                </p>
                {protocol.tokenPriceChange24h !== undefined && (
                  <p
                    className={`text-xs font-bold flex items-center gap-1 mt-1 ${
                      protocol.tokenPriceChange24h >= 0 ? "text-[#ccff00]" : "text-red-500"
                    }`}
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    <Icon 
                      icon={protocol.tokenPriceChange24h >= 0 ? "material-symbols:arrow-upward" : "material-symbols:arrow-downward"} 
                      width={14} 
                    />
                    {protocol.tokenPriceChange24h >= 0 ? "+" : ""}
                    {protocol.tokenPriceChange24h.toFixed(2)}%
                  </p>
                )}
                {!protocol.tokenPrice && (
                  <p
                    className="text-[#888888] text-xs font-bold flex items-center gap-1 mt-1"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Protocol tokens not tracked
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-1 rounded p-5 bg-[#111111] border border-[#2a2a2a] hover:border-[#ccff00]/30 transition-colors">
              <p
                className="text-[#888888] text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                Market Cap
              </p>
              <div>
                <p
                  className="text-white text-3xl font-bold leading-tight"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  {protocol.marketCap
                    ? formatCurrency(protocol.marketCap, 1)
                    : "N/A"}
                </p>
                <p
                  className="text-[#ccff00] text-xs font-bold flex items-center gap-1 mt-1"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  <Icon icon="material-symbols:arrow-upward" width={14} /> 2.1%
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-1 rounded p-5 bg-[#111111] border border-[#2a2a2a] col-span-2 sm:col-span-2 relative overflow-hidden group hover:border-[#ccff00]/30 transition-colors">
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <p
                    className="text-[#888888] text-xs font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Total Value Locked (TVL)
                  </p>
                  <p
                    className="text-white text-4xl font-bold leading-tight mt-1"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    {formatCurrency(protocol.tvl, 1)}
                  </p>
                </div>
                {/* Mini TVL chart - removed hardcoded SVG path */}
                {/* This could be generated from recent TVL history if needed */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About & Risk */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* About Protocol */}
            <div className="bg-[#111111] rounded p-6 border border-[#2a2a2a]">
              <h3
                className="text-white text-sm font-bold uppercase tracking-widest mb-4 border-l-2 border-[#ccff00] pl-3"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                About Protocol
              </h3>
              <p
                className="text-[#888888] text-sm leading-relaxed mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {protocol.description ||
                  `${protocol.name} is a protocol for automated token exchange. It provides a simple smart contract interface for swapping tokens and liquidity provisioning.`}
              </p>
              <div className="space-y-6">
                <div>
                  <h4
                    className="text-white text-xs font-bold uppercase mb-3"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Supported Chains
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {protocol.chains.map((chain) => (
                      <span
                        key={chain}
                        className="px-3 py-1.5 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#888888] hover:text-white hover:border-[#ccff00] transition-colors text-xs font-medium flex items-center gap-2 cursor-default"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              chainColors[chain] || "#ccff00",
                          }}
                        ></span>
                        {chain}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Core Use Cases - Removed hardcoded list as DeFiLlama doesn't provide this data */}
                {/* This would need to be fetched from protocol-specific APIs or removed */}
              </div>
            </div>

            {/* Risk & Security */}
            {riskData && (
              <div className="bg-[#111111] rounded p-6 border border-[#2a2a2a]">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-white text-sm font-bold uppercase tracking-widest border-l-2 border-[#ccff00] pl-3"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Risk & Security
                  </h3>
                  <button
                    className="text-[10px] text-[#ccff00] font-bold uppercase tracking-wider hover:text-white transition-colors border border-[#ccff00] px-2 py-1 rounded hover:bg-[#ccff00] hover:text-black"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Full Report
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-[#050505] border border-[#2a2a2a] rounded flex items-center justify-between">
                    <div className="flex flex-col">
                      <span
                        className="text-[#888888] text-[10px] uppercase tracking-widest font-bold mb-1"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        Security Score
                      </span>
                      <span
                        className="text-white text-3xl font-bold"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        {riskData.securityScore}
                        <span className="text-[#888888] text-base font-normal">
                          /100
                        </span>
                      </span>
                    </div>
                    <div className="h-12 w-12 rounded-full border-2 border-[#ccff00] bg-[#ccff00]/10 flex items-center justify-center relative shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                      <Icon icon="material-symbols:shield" className="text-[#ccff00]" width={24} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between py-2 border-b border-dashed border-[#2a2a2a]">
                      <span
                        className="text-[#888888] text-xs uppercase font-medium"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Audit Status
                      </span>
                      <span
                        className="text-[#ccff00] text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        <Icon icon="material-symbols:check-circle" width={14} />
                        {riskData.auditStatus === "audited"
                          ? "Audited"
                          : riskData.auditStatus === "partial"
                          ? "Partial"
                          : "Unaudited"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-dashed border-[#2a2a2a]">
                      <span
                        className="text-[#888888] text-xs uppercase font-medium"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Smart Contract Risk
                      </span>
                      <span
                        className="text-[#ccff00] text-xs font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        {riskData.smartContractRisk === "low"
                          ? "Low"
                          : riskData.smartContractRisk === "medium"
                          ? "Medium"
                          : "High"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-dashed border-[#2a2a2a]">
                      <span
                        className="text-[#888888] text-xs uppercase font-medium"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Impermanent Loss
                      </span>
                      <span
                        className="text-orange-500 text-xs font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        {riskData.impermanentLossRisk === "low"
                          ? "Low"
                          : riskData.impermanentLossRisk === "medium"
                          ? "Medium"
                          : "High"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span
                        className="text-[#888888] text-xs uppercase font-medium"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Protocol Maturity
                      </span>
                      <span
                        className="text-white text-xs font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        {riskData.protocolMaturity === "new"
                          ? "New"
                          : riskData.protocolMaturity === "established"
                          ? "Established"
                          : "Mature"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Charts & Data */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* TVL Over Time Chart */}
            <div className="bg-[#111111] rounded p-6 border border-[#2a2a2a] h-[400px] flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 z-10 relative">
                <div>
                  <h3
                    className="text-white text-sm font-bold uppercase tracking-widest border-l-2 border-[#ccff00] pl-3"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    TVL Over Time
                  </h3>
                  <p
                    className="text-[#888888] text-xs mt-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Total Value Locked across all chains
                  </p>
                </div>
                <div className="flex p-0.5 bg-[#050505] border border-[#2a2a2a] rounded">
                  {(["1W", "1M", "1Y", "ALL"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter)}
                      className={`px-3 py-1 rounded-[2px] text-[10px] font-bold uppercase transition-colors ${
                        timeFilter === filter
                          ? "bg-[#ccff00] text-black shadow-sm"
                          : "text-[#888888] hover:text-white"
                      }`}
                      style={{ fontFamily: 'Syncopate, sans-serif' }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full relative group cursor-crosshair z-10">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-t border-dashed border-[#888888] w-full h-0"
                    ></div>
                  ))}
                </div>
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 800 300"
                >
                  <defs>
                    <linearGradient
                      id="tvlGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ccff00"
                        stopOpacity="0.2"
                      />
                      <stop
                        offset="100%"
                        stopColor="#ccff00"
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur
                        result="coloredBlur"
                        stdDeviation="2.5"
                      />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {chartData.path ? (
                    <>
                      <path
                        d={chartData.path}
                        fill="none"
                        filter="url(#glow)"
                        stroke="#ccff00"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <path
                        d={chartData.areaPath}
                        fill="url(#tvlGradient)"
                        stroke="none"
                      />
                    </>
                  ) : (
                    <text
                      x="400"
                      y="150"
                      textAnchor="middle"
                      fill="#888888"
                      fontSize="14"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      No data available
                    </text>
                  )}
                </svg>
              </div>
              <div
                className="flex justify-between mt-4 text-[#888888] text-[10px] font-bold uppercase tracking-widest px-2 z-10"
                style={{ fontFamily: 'Syncopate, sans-serif' }}
              >
                {(() => {
                  if (!chartData.points || chartData.points.length === 0) {
                    return (
                      <>
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>May</span>
                        <span>Jul</span>
                        <span>Sep</span>
                        <span>Nov</span>
                      </>
                    );
                  }

                  const pointCount = chartData.points.length;
                  const labelCount = 6;
                  const step = Math.max(1, Math.floor(pointCount / labelCount));
                  const labels: string[] = [];
                  
                  for (let i = 0; i < pointCount; i += step) {
                    const point = chartData.points[i];
                    if (point) {
                      const date = new Date(point.date);
                      const month = date.toLocaleDateString('en-US', { month: 'short' });
                      if (!labels.includes(month)) {
                        labels.push(month);
                      }
                    }
                  }
                  
                  // Always show the last date
                  if (chartData.points.length > 0) {
                    const lastPoint = chartData.points[chartData.points.length - 1];
                    const lastDate = new Date(lastPoint.date);
                    const lastMonth = lastDate.toLocaleDateString('en-US', { month: 'short' });
                    if (!labels.includes(lastMonth)) {
                      labels.push(lastMonth);
                    }
                  }
                  
                  return labels.map((month, idx) => (
                    <span key={idx}>{month}</span>
                  ));
                })()}
              </div>
            </div>

            {/* Volume & Fees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Volume 24h */}
              <div className="bg-[#111111] rounded p-6 border border-[#2a2a2a] group hover:border-[#2a2a2a] transition-colors">
                <h3
                  className="text-white text-sm font-bold uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  Volume (24h)
                </h3>
                <div className="flex items-end gap-2 h-32 w-full mt-2">
                  {metrics && metrics.volumeHistory && metrics.volumeHistory.length > 0 ? (
                    // Use real volume history data if available
                    metrics.volumeHistory.slice(-7).map((point, i) => {
                      const maxVolume = Math.max(...metrics.volumeHistory.map(p => p.value));
                      const height = maxVolume > 0 ? (point.value / maxVolume) * 100 : 0;
                      const isLatest = i === metrics.volumeHistory.slice(-7).length - 1;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-[2px] transition-colors ${
                            isLatest
                              ? "bg-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                              : "bg-white/5 group-hover:bg-[#ccff00]/40"
                          }`}
                          style={{ height: `${height}%` }}
                        ></div>
                      );
                    })
                  ) : (
                    // Fallback: show placeholder bars if no volume history
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-[#888888] text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Volume history not available
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-end mt-4">
                  <p
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    {protocol.volume24h
                      ? formatCurrency(protocol.volume24h, 1)
                      : "N/A"}
                  </p>
                  {protocol.tvlChange24h !== undefined && (
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        protocol.tvlChange24h >= 0
                          ? "text-black bg-[#ccff00]"
                          : "text-white bg-red-500"
                      }`}
                      style={{ fontFamily: 'Syncopate, sans-serif' }}
                    >
                      {protocol.tvlChange24h >= 0 ? "+" : ""}
                      {protocol.tvlChange24h.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Fees Generated */}
              <div className="bg-[#111111] rounded p-6 border border-[#2a2a2a] group hover:border-[#2a2a2a] transition-colors">
                <h3
                  className="text-white text-sm font-bold uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  Fees Generated (24h)
                </h3>
                <div className="flex flex-col gap-5 mt-2 h-full justify-center">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span
                        className="text-[#888888] font-medium"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Liquidity Providers
                      </span>
                      <span
                        className="text-white font-bold"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        {protocol.fees24h
                          ? formatCurrency(protocol.fees24h * 0.85, 1)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="w-full bg-[#050505] border border-[#2a2a2a] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#ccff00] h-2 rounded-full shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span
                        className="text-[#888888] font-medium"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Protocol Revenue
                      </span>
                      <span
                        className="text-white font-bold"
                        style={{ fontFamily: 'Syncopate, sans-serif' }}
                      >
                        {protocol.fees24h
                          ? formatCurrency(protocol.fees24h * 0.15, 1)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="w-full bg-[#050505] border border-[#2a2a2a] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-white/20 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <p
                      className="text-[10px] text-[#888888] mt-2 italic"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      *Protocol fee switch is currently off
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Yield Pools */}
            {protocol.category === "DEX" && (
              <div className="bg-[#111111] rounded p-6 border border-[#2a2a2a]">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-white text-sm font-bold uppercase tracking-widest border-l-2 border-[#ccff00] pl-3"
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    Top Yield Pools
                  </h3>
                  {yieldPools.length > 0 && (
                    <button
                      className="text-[10px] text-[#ccff00] font-bold uppercase tracking-wider hover:text-white transition-colors border border-[#ccff00]/30 hover:border-[#ccff00] px-3 py-1 rounded"
                      style={{ fontFamily: 'Syncopate, sans-serif' }}
                    >
                      View All Pools
                    </button>
                  )}
                </div>
                {yieldPools.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#2a2a2a]">
                          <th
                            className="py-3 text-[10px] font-bold text-[#888888] uppercase tracking-widest"
                            style={{ fontFamily: 'Syncopate, sans-serif' }}
                          >
                            Pool
                          </th>
                          <th
                            className="py-3 text-[10px] font-bold text-[#888888] uppercase tracking-widest"
                            style={{ fontFamily: 'Syncopate, sans-serif' }}
                          >
                            TVL
                          </th>
                          <th
                            className="py-3 text-[10px] font-bold text-[#888888] uppercase tracking-widest"
                            style={{ fontFamily: 'Syncopate, sans-serif' }}
                          >
                            Volume 24h
                          </th>
                          <th
                            className="py-3 text-[10px] font-bold text-[#888888] uppercase tracking-widest text-right"
                            style={{ fontFamily: 'Syncopate, sans-serif' }}
                          >
                            APR
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        {yieldPools.map((pool, index) => (
                        <tr
                          key={index}
                          className="group hover:bg-white/5 transition-colors border-b border-[#2a2a2a]/50"
                        >
                          <td className="py-4 pl-1">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-slate-800 ring-2 ring-[#111111] bg-cover"></div>
                                <div className="w-6 h-6 rounded-full bg-slate-700 ring-2 ring-[#111111] bg-cover"></div>
                              </div>
                              <span
                                className="font-bold text-sm"
                                style={{ fontFamily: 'Syncopate, sans-serif' }}
                              >
                                {pool.pair}{" "}
                                <span
                                  className="text-[#888888] font-normal text-xs ml-1"
                                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                  {pool.fee}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td
                            className="py-4 text-sm font-medium"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            {formatCurrency(pool.tvl, 1)}
                          </td>
                          <td
                            className="py-4 text-sm font-medium"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            {formatCurrency(pool.volume24h, 1)}
                          </td>
                          <td
                            className="py-4 text-sm font-bold text-[#ccff00] text-right group-hover:text-white transition-colors"
                            style={{ fontFamily: 'Syncopate, sans-serif' }}
                          >
                            {pool.apr}%
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p
                      className="text-[#888888] text-sm"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Pool data not available from DeFiLlama API
                    </p>
                    <p
                      className="text-[#888888] text-xs mt-2"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Pool-level data requires protocol-specific APIs
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
