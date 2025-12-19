/**
 * Utility functions for DeFi Hub
 */

import type { Protocol, SortOption } from "../types/defi";

/**
 * Format large numbers with appropriate suffixes (K, M, B)
 * Matches the design format (e.g., $250M, $45B)
 */
export const formatCurrency = (value: number, decimals = 0): string => {
  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000;
    // Show decimals only if needed (e.g., 2.8B, not 2.80B)
    if (billions % 1 === 0) {
      return `$${billions.toFixed(0)}B`;
    }
    return `$${billions.toFixed(decimals)}B`;
  }
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    if (millions % 1 === 0) {
      return `$${millions.toFixed(0)}M`;
    }
    return `$${millions.toFixed(decimals)}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    if (thousands % 1 === 0) {
      return `$${thousands.toFixed(0)}K`;
    }
    return `$${thousands.toFixed(decimals)}K`;
  }
  return `$${value.toFixed(decimals)}`;
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number, decimals = 2): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
};

/**
 * Format APY values
 */
export const formatAPY = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

/**
 * Get risk level color
 */
export const getRiskColor = (
  riskLevel: "low" | "medium" | "high" | "very-high"
): string => {
  switch (riskLevel) {
    case "low":
      return "#A9EF2E"; // Primary green
    case "medium":
      return "#FFA500"; // Orange
    case "high":
      return "#FF6B6B"; // Red
    case "very-high":
      return "#DC2626"; // Dark red
    default:
      return "#6B7280"; // Gray
  }
};

/**
 * Get category color
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    DEX: "#A9EF2E",
    Lending: "#3B82F6",
    Yield: "#10B981",
    Perpetuals: "#8B5CF6",
    Stablecoins: "#F59E0B",
    Bridge: "#EC4899",
    Derivatives: "#06B6D4",
    Options: "#F97316",
    Insurance: "#84CC16",
    RWA: "#6366F1",
    "Yield Aggregator": "#14B8A6",
    "Liquid Staking": "#A855F7",
    CDP: "#EF4444",
    Synthetics: "#F43F5E",
    Other: "#6B7280",
  };
  return colors[category] || "#6B7280";
};

/**
 * Sort protocols based on sort option
 */
export const sortProtocols = (
  protocols: Protocol[],
  sortOption: SortOption
): Protocol[] => {
  const sorted = [...protocols];

  switch (sortOption) {
    case "tvl-desc":
      return sorted.sort((a, b) => b.tvl - a.tvl);
    case "tvl-asc":
      return sorted.sort((a, b) => a.tvl - b.tvl);
    case "apy-desc":
      return sorted.sort((a, b) => (b.apy || 0) - (a.apy || 0));
    case "apy-asc":
      return sorted.sort((a, b) => (a.apy || 0) - (b.apy || 0));
    case "volume-desc":
      return sorted.sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0));
    case "volume-asc":
      return sorted.sort((a, b) => (a.volume24h || 0) - (b.volume24h || 0));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

/**
 * Filter protocols based on filter options
 */
export const filterProtocols = (
  protocols: Protocol[],
  filters: {
    category?: string;
    chain?: string;
    minTvl?: number;
    maxTvl?: number;
    minApy?: number;
    maxApy?: number;
    riskLevel?: string;
    searchQuery?: string;
  }
): Protocol[] => {
  return protocols.filter((protocol) => {
    if (filters.category && protocol.category !== filters.category) {
      return false;
    }
    if (filters.chain && !protocol.chains.includes(filters.chain)) {
      return false;
    }
    if (filters.minTvl && protocol.tvl < filters.minTvl) {
      return false;
    }
    if (filters.maxTvl && protocol.tvl > filters.maxTvl) {
      return false;
    }
    if (filters.minApy && (protocol.apy || 0) < filters.minApy) {
      return false;
    }
    if (filters.maxApy && (protocol.apy || 0) > filters.maxApy) {
      return false;
    }
    if (filters.riskLevel && protocol.riskLevel !== filters.riskLevel) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = protocol.name.toLowerCase().includes(query);
      const matchesCategory = protocol.category.toLowerCase().includes(query);
      if (!matchesName && !matchesCategory) {
        return false;
      }
    }
    return true;
  });
};

