/**
 * Type definitions for DeFi Hub data structures
 */

export interface Blockchain {
  id: string;
  name: string;
  symbol: string;
  logo?: string;
  chainId?: number;
  totalTvl: number;
  protocolCount: number;
  status: "operational" | "offline" | "degraded";
  gasFee?: number;
  explorerUrl?: string;
  docsUrl?: string;
  tvlChange7d?: number;
  tvlChange30d?: number;
  // Native token price from CoinGecko
  nativeTokenPrice?: number;
  nativeTokenPriceChange24h?: number;
}

export interface Protocol {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  category: ProtocolCategory;
  chains: string[];
  tvl: number;
  tvlChange24h?: number;
  apy?: number;
  apyRange?: {
    min: number;
    max: number;
  };
  volume24h?: number;
  fees24h?: number;
  marketCap?: number;
  riskLevel: RiskLevel;
  description?: string;
  website?: string;
  docsUrl?: string;
  twitter?: string;
  github?: string;
  symbol?: string;
  // CoinGecko data
  tokenPrice?: number;
  tokenPriceChange24h?: number;
  coingeckoId?: string;
}

export type ProtocolCategory =
  | "DEX"
  | "Lending"
  | "Yield"
  | "Perpetuals"
  | "Stablecoins"
  | "Bridge"
  | "Derivatives"
  | "Options"
  | "Insurance"
  | "RWA"
  | "Yield Aggregator"
  | "Liquid Staking"
  | "CDP"
  | "Synthetics"
  | "Other";

export type RiskLevel = "low" | "medium" | "high" | "very-high";

export interface ProtocolMetrics {
  tvl: number;
  tvlHistory: TVLDataPoint[];
  volume24h: number;
  volumeHistory: VolumeDataPoint[];
  fees24h: number;
  feesHistory: FeesDataPoint[];
  apy?: number;
  apyHistory?: APYDataPoint[];
}

export interface TVLDataPoint {
  date: string;
  value: number;
}

export interface VolumeDataPoint {
  date: string;
  value: number;
}

export interface FeesDataPoint {
  date: string;
  value: number;
}

export interface APYDataPoint {
  date: string;
  value: number;
}

export interface RiskData {
  securityScore: number;
  auditStatus: "audited" | "unaudited" | "partial";
  smartContractRisk: RiskLevel;
  impermanentLossRisk?: RiskLevel;
  protocolMaturity: "new" | "established" | "mature";
  auditReports?: Array<{
    auditor: string;
    date: string;
    url?: string;
  }>;
}

export interface YieldPool {
  id: string;
  name: string;
  apy: number;
  tvl: number;
  token: string;
  chain: string;
}

export interface FilterOptions {
  category?: ProtocolCategory;
  chain?: string;
  minTvl?: number;
  maxTvl?: number;
  minApy?: number;
  maxApy?: number;
  riskLevel?: RiskLevel;
  searchQuery?: string;
}

export type SortOption =
  | "tvl-desc"
  | "tvl-asc"
  | "apy-desc"
  | "apy-asc"
  | "volume-desc"
  | "volume-asc"
  | "name-asc"
  | "name-desc";

